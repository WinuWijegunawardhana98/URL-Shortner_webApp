import { nanoid } from "nanoid";
import Url from "../models/Url.js";  // Use .js extension

import express from "express";
const router = express.Router();

// POST /api/url/shorten
router.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const shortId = nanoid(7);
    const newUrl = new Url({ originalUrl, shortId });
    await newUrl.save();
    res.json({ shortUrl: `${process.env.BASE_URL}/${shortId}` });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET /:shortId
router.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;

  try {
    const urlEntry = await Url.findOne({ shortId });
    if (!urlEntry) return res.status(404).json({ error: "URL not found" });

    urlEntry.clicks += 1;
    await urlEntry.save();
    res.redirect(urlEntry.originalUrl);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
