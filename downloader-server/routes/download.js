const express = require("express");
const { getInstagramImage } = require("../services/instagram");
const { getPinterestImage } = require("../services/pinterestImage");
const { getVideoInfo } = require("../services/downloader");
const {
  extractInstagramMetadata
} = require("../services/instagram");

const router = express.Router();

router.post("/", async (req, res) => {

    try {

        const { url } = req.body;
       if (!url) {
  return res.status(400).json({
    success: false,
    message: "URL required",
  });
}

const lower = url.toLowerCase();

if (lower.includes("instagram.com")) {

    const media =
      await extractInstagramMetadata(url);

    if (media.success) {
        return res.json(media);
    }
}
// Pinterest Image Detection
if (lower.includes("pinterest.com")) {
  try {
    // First try yt-dlp
    const media = await getVideoInfo(url);

    const isVideo =
      media.formats &&
      media.formats.some(
        (f) => f.vcodec && f.vcodec !== "none"
      );

    if (!isVideo) {
      throw new Error("Image");
    }

    // Video na continue pannum
  } catch (err) {
    // Image na scrape pannu
    const image = await getPinterestImage(url);

    return res.json({
      success: true,
      type: "image",
      title: image.title,
      thumbnail: image.thumbnail,
      downloadUrl: image.downloadUrl,
      duration: 0,
      qualities: [],
    });
  }
}
        const video = await getVideoInfo(url);
        console.log("========== DEBUG ==========");
console.log("Title:", video.title);
console.log("Ext:", video.ext);
console.log("URL:", video.url);
console.log("Thumbnail:", video.thumbnail);
console.log("Original URL:", video.original_url);
console.log("===========================");
        console.table(
  video.formats.map(f => ({
    id: f.format_id,
    ext: f.ext,
    height: f.height,
    vcodec: f.vcodec,
    acodec: f.acodec
  }))
);

   const isVideo =
  video.formats &&
  video.formats.some(
    (f) => f.vcodec && f.vcodec !== "none"
  );

if (!isVideo) {
  return res.json({
    success: true,
    type: "image",
    title: video.title,
    thumbnail: video.thumbnail,
    downloadUrl:
      video.url ||
      video.original_url ||
      video.thumbnail,
    duration: 0,
    qualities: [],
  });
}

const seen = new Set();

const qualities = video.formats
  .filter(
    (f) =>
      f.format_id &&
      f.height &&
      f.vcodec !== "none"
  )
  .filter((f) => {
    const key = `${f.height}-${f.ext}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  })
  .map((f) => ({
    quality: `${f.height}p`,
    ext: (f.ext || "").toUpperCase(),
    formatId: f.format_id,
    height: f.height,
  }))
  .sort((a, b) => b.height - a.height);

res.json({
  success: true,
  type: "video",
  title: video.title,
  thumbnail: video.thumbnail,
  duration: video.duration,
  qualities,
});

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

module.exports = router;