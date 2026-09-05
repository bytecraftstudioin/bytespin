const express = require("express");
const path = require("path");
const fs = require("fs");
const axios = require("axios");

const { getPinterestImage } = require("../services/pinterestImage");
const { ytDlp } = require("../services/downloader");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const url = req.query.url;
    const formatId = req.query.formatId;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "URL required",
      });
    }

    const lower = url.toLowerCase();

    if (
    lower.includes("instagram.com") &&
    type === "image"
) {

    const {
        extractInstagramMetadata
    } = require("../services/instagram");

    const media =
      await extractInstagramMetadata(url);

    const axios = require("axios");

    const response = await axios.get(
        media.downloadUrl,
        {
            responseType: "stream",
        }
    );

    res.setHeader(
        "Content-Disposition",
        'attachment; filename="instagram-image.jpg"'
    );

    res.setHeader(
        "Content-Type",
        response.headers["content-type"]
    );

    return response.data.pipe(res);
}

    // Pinterest Image 
    if (
  lower.includes("pinterest.com") &&
  req.query.type === "image"
) {
      const image = await getPinterestImage(url);

      const response = await axios.get(image.downloadUrl, {
        responseType: "stream",
      });

      res.setHeader(
        "Content-Disposition",
        'attachment; filename="pinterest-image.jpg"'
      );

      res.setHeader(
        "Content-Type",
        response.headers["content-type"] || "image/jpeg"
      );

      return response.data.pipe(res);
    }

    const downloadsDir = path.join(__dirname, "../downloads");

    if (!fs.existsSync(downloadsDir)) {
      fs.mkdirSync(downloadsDir);
    }

    const outputPath = path.join(
      downloadsDir,
      Date.now() + ".%(ext)s"
    );

    const format = formatId
      ? `${formatId}+140/${formatId}+bestaudio/best`
      : "best";

    await ytDlp.execPromise([
      url,
      "-f",
      format,
      "--merge-output-format",
      "mp4",
      "-o",
      outputPath,
    ]);

    const files = fs
      .readdirSync(downloadsDir)
      .filter((f) => !f.endsWith(".part"))
      .sort(
        (a, b) =>
          fs.statSync(path.join(downloadsDir, b)).mtimeMs -
          fs.statSync(path.join(downloadsDir, a)).mtimeMs
      );

    if (files.length === 0) {
      throw new Error("Download not completed yet.");
    }

    return res.download(
      path.join(downloadsDir, files[0]),
      files[0]
    );

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;