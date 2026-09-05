const YTDlpWrap = require("yt-dlp-wrap").default;
const path = require("path");

const ytDlp = new YTDlpWrap(
  path.join(__dirname, "../bin/yt-dlp.exe")
);

/**
 * Execute yt-dlp safely
 */
async function exec(args) {
  try {
    return await ytDlp.execPromise(args);
  } catch (err) {
    throw new Error(parseError(err));
  }
}

/**
 * Convert yt-dlp errors into friendly messages
 */
function parseError(err) {
  const text =
    err.stderr ||
    err.message ||
    String(err);

  if (text.includes("Private video"))
    return "This content is private.";

  if (text.includes("Login required"))
    return "Login required.";

  if (text.includes("Unsupported URL"))
    return "Unsupported URL.";

  if (text.includes("Video unavailable"))
    return "Media unavailable.";

  // ⭐ IMPORTANT
  // Don't convert "There is no video" into "Image post detected"
  // Let Instagram/Pinterest service decide what to do.
  return text;
}

/**
 * Fetch metadata
 */
async function getInfo(url) {

  const output = await exec([
    url,
    "--dump-single-json",
    "--no-playlist",
    "--no-warnings"
  ]);

  return JSON.parse(output);
}

/**
 * Download media
 */
async function download(
  url,
  format,
  output
) {

  const args = [
    url,
    "-f",
    format || "best",
    "--merge-output-format",
    "mp4",
    "--no-warnings",
    "-o",
    output
  ];

  return exec(args);

}

/**
 * Direct media URL
 */
async function getDirectUrl(
  url,
  format = "best"
) {

  const result = await exec([
    url,
    "-f",
    format,
    "-g",
    "--no-warnings"
  ]);

  return result.trim();

}

/**
 * Check if media is video
 */
function isVideo(info) {

  return (
    Array.isArray(info.formats) &&
    info.formats.some(
      f =>
        f.vcodec &&
        f.vcodec !== "none"
    )
  );

}

/**
 * Check if media is image
 */
function isImage(info) {

  return !isVideo(info);

}

/**
 * Build quality list
 */
function getQualities(info) {

  const seen = new Set();

  return (info.formats || [])
    .filter(
      f =>
        f.height &&
        f.vcodec &&
        f.vcodec !== "none"
    )
    .filter(f => {

      const key =
        `${f.height}-${f.ext}`;

      if (seen.has(key))
        return false;

      seen.add(key);

      return true;

    })
    .map(f => ({

      quality:
        `${f.height}p`,

      height:
        f.height,

      ext:
        (f.ext || "")
          .toUpperCase(),

      formatId:
        f.format_id

    }))
    .sort(
      (a, b) =>
        b.height - a.height
    );

}

module.exports = {

  ytDlp,

  exec,

  getInfo,

  download,

  getDirectUrl,

  getQualities,

  isVideo,

  isImage

};