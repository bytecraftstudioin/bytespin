/**
 * Detect which platform the URL belongs to.
 */

function detectPlatform(url) {
  if (!url) return null;

  const link = url.toLowerCase();

  if (
    link.includes("youtube.com") ||
    link.includes("youtu.be")
  ) {
    return "youtube";
  }

  if (link.includes("instagram.com")) {
    return "instagram";
  }

  if (link.includes("pinterest.com")) {
    return "pinterest";
  }

  if (
    link.includes("facebook.com") ||
    link.includes("fb.watch")
  ) {
    return "facebook";
  }

  if (link.includes("tiktok.com")) {
    return "tiktok";
  }

  if (
    link.includes("twitter.com") ||
    link.includes("x.com")
  ) {
    return "twitter";
  }

  if (link.includes("threads.net")) {
    return "threads";
  }

  return "unknown";
}

module.exports = {
  detectPlatform,
};