// services/linkService.js
const { v4: uuidv4 } = require("uuid");
const aiService = require("./aiService");
const logger = require("../utils/logger");
const { ServerError, NotFoundError } = require("../utils/errors");

// Simple in-memory database
let links = [];

/**
 * Get all saved links
 * @returns {Array} Array of links
 */
async function getAllLinks() {
  logger.debug("Fetching all links", { count: links.length });
  return links;
}

/**
 * Get link by ID
 * @param {string} id Link ID
 * @returns {Object|null} Link object or null if not found
 */
async function getLinkById(id) {
  logger.debug("Fetching link by ID", { id });
  return links.find((link) => link.id === id) || null;
}

/**
 * Create a new link
 * @param {Object} linkData Link data (url, title)
 * @returns {Object} Created link
 */
async function createLink(linkData) {
  const { url, title } = linkData;
  logger.info(`Creating new link: ${url}`);

  // Create link with basic data
  const newLink = {
    id: uuidv4(),
    url,
    title: title || url,
    status: "unread",
    createdAt: new Date().toISOString(),
  };

  // Add to database
  links.push(newLink);
  logger.debug("Link created", { id: newLink.id });

  // Process content in background
  processLinkContent(newLink.id, url);

  return newLink;
}

/**
 * Process link content with AI
 * @param {string} id Link ID
 * @param {string} url Link URL
 */
async function processLinkContent(id, url) {
  try {
    logger.info(`Processing content for link: ${id}`);

    // Get page content
    const pageContent = await aiService.fetchPageContent(url);

    // Process with AI
    const { summary, keywords, tags } = await aiService.analyzeContent(
      pageContent
    );

    // Update link with AI results
    const linkIndex = links.findIndex((link) => link.id === id);
    if (linkIndex !== -1) {
      links[linkIndex] = {
        ...links[linkIndex],
        summary,
        keywords,
        tags,
      };
      logger.info(`Link ${id} processed successfully`);
      logger.debug("Link processing results", {
        id,
        tags,
        keywordCount: keywords.length,
      });
    } else {
      logger.warn(`Link ${id} not found during content processing`);
    }
  } catch (error) {
    logger.error(`Error processing link ${id}`, error);
  }
}

/**
 * Update link
 * @param {string} id Link ID
 * @param {Object} updateData Data to update
 * @returns {Object|null} Updated link or null if not found
 */
async function updateLink(id, updateData) {
  logger.debug(`Updating link: ${id}`, updateData);

  const linkIndex = links.findIndex((link) => link.id === id);
  if (linkIndex === -1) {
    logger.warn(`Link not found for update: ${id}`);
    return null;
  }

  // Update only allowed fields
  const allowedFields = ["status", "tags"];
  const filteredData = Object.keys(updateData)
    .filter((key) => allowedFields.includes(key))
    .reduce((obj, key) => {
      obj[key] = updateData[key];
      return obj;
    }, {});

  // Update link
  links[linkIndex] = {
    ...links[linkIndex],
    ...filteredData,
  };

  logger.info(`Link ${id} updated`);
  return links[linkIndex];
}

/**
 * Delete link
 * @param {string} id Link ID
 * @returns {boolean} Success status
 */
async function deleteLink(id) {
  logger.info(`Deleting link: ${id}`);

  const initialLength = links.length;
  links = links.filter((link) => link.id !== id);
  const success = links.length < initialLength;

  if (success) {
    logger.info(`Link ${id} deleted`);
  } else {
    logger.warn(`Link ${id} not found for deletion`);
  }

  return success;
}

/**
 * Search links
 * @param {Object} searchParams Search parameters
 * @returns {Array} Matching links
 */
async function searchLinks(searchParams) {
  const { query, status, tags } = searchParams;
  logger.debug("Searching links", searchParams);

  const results = links.filter((link) => {
    // Match by search query
    const matchesQuery =
      !query ||
      link.title.toLowerCase().includes(query.toLowerCase()) ||
      link.url.toLowerCase().includes(query.toLowerCase()) ||
      (link.summary &&
        link.summary.toLowerCase().includes(query.toLowerCase())) ||
      (link.keywords &&
        link.keywords.some((kw) =>
          kw.toLowerCase().includes(query.toLowerCase())
        ));

    // Match by status
    const matchesStatus = !status || link.status === status;

    // Match by tags
    const matchesTags =
      !tags ||
      (link.tags &&
        tags
          .split(",")
          .every((tag) =>
            link.tags.some((t) => t.toLowerCase() === tag.trim().toLowerCase())
          ));

    return matchesQuery && matchesStatus && matchesTags;
  });

  logger.debug(`Search returned ${results.length} results`);
  return results;
}

module.exports = {
  getAllLinks,
  getLinkById,
  createLink,
  updateLink,
  deleteLink,
  searchLinks,
};
