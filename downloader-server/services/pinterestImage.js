const { getInfo, download, getDirectUrl } = require("./downloader");
const { getPinterestImage } = require("./pinterestImage"); // We'll create this next

async function getPinterestInfo(url) {
  try {
    const data = await getInfo(url);

    const isVideo =
      data.formats &&
      data.formats.some(
        (f) => f.vcodec && f.vcodec !== "none"
      );

    // Image Pin
    if (!isVideo) {
      throw new Error("Image Pin");
    }

    const seen = new Set();

    const qualities = (data.formats || [])
      .filter(
        (f) =>
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
        height: f.height,
        ext: (f.ext || "").toUpperCase(),
        formatId: f.format_id,
      }))
      .sort((a, b) => b.height - a.height);

    return {
      success: true,
      source: "Pinterest",
      type: "video",
      title: data.title,
      thumbnail: data.thumbnail,
      duration: data.duration,
      originalUrl: url,
      qualities,
    };

  } catch (err) {

    // Image fallback
    const image = await getPinterestImage(url);

    return {
      success: true,
      source: "Pinterest",
      type: "image",
      title: image.title,
      thumbnail: image.thumbnail,
      downloadUrl: image.downloadUrl,
      originalUrl: url,
      qualities: [],
    };
  }
}

module.exports = {
  getPinterestInfo,
  download,
  getDirectUrl,
};