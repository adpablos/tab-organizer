// routes/links.js
const express = require("express");
const router = express.Router();
const linkService = require("../services/linkService");
const logger = require("../utils/logger");
const { asyncHandler } = require("../middleware/errorHandler");
const { NotFoundError, ValidationError } = require("../utils/errors");

// GET all links
router.get(
  "/",
  asyncHandler(async (req, res) => {
    logger.info("GET /api/links - Fetching all links");
    const links = await linkService.getAllLinks();
    res.json(links);
  })
);

// GET search links
router.get(
  "/search",
  asyncHandler(async (req, res) => {
    logger.info("GET /api/links/search - Searching links");
    logger.debug("Search params", req.query);
    const links = await linkService.searchLinks(req.query);
    res.json(links);
  })
);

// GET single link
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    logger.info(`GET /api/links/${id} - Fetching link by ID`);

    const link = await linkService.getLinkById(id);
    if (!link) {
      throw new NotFoundError(`Link with ID ${id} not found`);
    }

    res.json(link);
  })
);

// POST new link
router.post(
  "/",
  asyncHandler(async (req, res) => {
    logger.info("POST /api/links - Creating new link");
    const { url, title } = req.body;

    if (!url) {
      throw new ValidationError("URL is required");
    }

    const newLink = await linkService.createLink({ url, title });
    res.status(201).json(newLink);
  })
);

// PUT update link
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    logger.info(`PUT /api/links/${id} - Updating link`);

    const link = await linkService.updateLink(id, req.body);
    if (!link) {
      throw new NotFoundError(`Link with ID ${id} not found`);
    }

    res.json(link);
  })
);

// DELETE link
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    logger.info(`DELETE /api/links/${id} - Deleting link`);

    const success = await linkService.deleteLink(id);
    if (!success) {
      throw new NotFoundError(`Link with ID ${id} not found`);
    }

    res.status(204).send();
  })
);

module.exports = router;
