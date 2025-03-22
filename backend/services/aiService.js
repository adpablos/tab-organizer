// services/aiService.js
const axios = require("axios");
const { JSDOM } = require("jsdom");
const OpenAI = require("openai");
const logger = require("../utils/logger");

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Fetch page content from URL
 * @param {string} url Page URL
 * @returns {string} Page content
 */
async function fetchPageContent(url) {
  try {
    logger.info(`Fetching content from: ${url}`);
    const response = await axios.get(url);
    const dom = new JSDOM(response.data);

    // Extract main content
    const bodyText = dom.window.document.body.textContent.trim();

    // Get metadata
    const title = dom.window.document.querySelector("title")?.textContent || "";
    const description =
      dom.window.document.querySelector('meta[name="description"]')?.content ||
      "";

    // Combine relevant text
    const content = `Title: ${title}\nDescription: ${description}\n\nContent:\n${bodyText.substring(
      0,
      5000
    )}`;

    logger.debug(`Content fetched: ${url}`, {
      contentLength: content.length,
      hasTitle: !!title,
      hasDescription: !!description,
    });
    return content;
  } catch (error) {
    logger.error(`Error fetching page content from ${url}`, error);
    return "";
  }
}

/**
 * Analyze content with AI
 * @param {string} content Page content
 * @returns {Object} Analysis results
 */
async function analyzeContent(content) {
  try {
    logger.info("Analyzing content with AI");

    // Skip processing if content is empty
    if (!content) {
      logger.warn("Empty content provided for analysis");
      return {
        summary: "Could not extract content",
        keywords: [],
        tags: [],
      };
    }

    // Process with OpenAI
    const contentLength = content.length;
    logger.debug(`Sending content to OpenAI API`, { contentLength });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an assistant that analyzes web content and extracts key information. Provide a brief summary, keywords, and suggested tags.",
        },
        {
          role: "user",
          content: `Analyze this content and provide:
          1. A brief summary (max 100 words)
          2. 5-10 keywords
          3. 3-5 tags for categorization
          
          Content:
          ${content.substring(0, 4000)}`,
        },
      ],
    });

    const response = completion.choices[0].message.content;
    logger.debug("Received AI response", { responseLength: response.length });

    // Parse response
    const summaryMatch = response.match(
      /summary:?(.*?)(?=keywords:|tags:|$)/is
    );
    const keywordsMatch = response.match(/keywords:?(.*?)(?=tags:|$)/is);
    const tagsMatch = response.match(/tags:?(.*?)(?=$)/is);

    const summary = summaryMatch ? summaryMatch[1].trim() : "";
    const keywords = keywordsMatch
      ? keywordsMatch[1]
          .trim()
          .split(/,|\n/)
          .map((k) => k.trim())
          .filter(Boolean)
      : [];
    const tags = tagsMatch
      ? tagsMatch[1]
          .trim()
          .split(/,|\n/)
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    logger.info("Content analysis completed successfully");
    logger.debug("Analysis results", {
      summaryLength: summary.length,
      keywordsCount: keywords.length,
      tagsCount: tags.length,
    });

    return { summary, keywords, tags };
  } catch (error) {
    logger.error("Error analyzing content with AI", error);
    return {
      summary: "AI analysis failed",
      keywords: [],
      tags: [],
    };
  }
}

module.exports = {
  fetchPageContent,
  analyzeContent,
};
