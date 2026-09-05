const { getInfo, download, getDirectUrl } = require("./downloader");

async function getYouTubeInfo(url) {
  const data = await getInfo(url);

  const isLive =
    data.live_status === "is_live" ||
    data.is_live === true;

  const isShort =
    url.includes("/shorts/");

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

    source: "YouTube",

    type: "video",

    isLive,

    isShort,

    title: data.title,

    thumbnail: data.thumbnail,

    duration: data.duration,

    uploader: data.uploader,

    channel: data.channel,

    viewCount: data.view_count,

    uploadDate: data.upload_date,

    originalUrl: url,

    qualities,
  };
}

module.exports = {
  getYouTubeInfo,
  download,
  getDirectUrl,
};