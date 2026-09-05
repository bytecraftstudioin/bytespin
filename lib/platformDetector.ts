export type Platform =
  | "instagram"
  | "youtube"
  | "facebook"
  | "tiktok"
  | "twitter"
  | "pinterest"
  | "threads"
  | "unknown";

export function detectPlatform(url: string): Platform {
  const lower = url.toLowerCase();

  if (lower.includes("instagram.com")) return "instagram";

  if (
    lower.includes("youtube.com") ||
    lower.includes("youtu.be")
  )
    return "youtube";

  if (
    lower.includes("facebook.com") ||
    lower.includes("fb.watch")
  )
    return "facebook";

  if (lower.includes("tiktok.com")) return "tiktok";

  if (
    lower.includes("twitter.com") ||
    lower.includes("x.com")
  )
    return "twitter";

  if (lower.includes("pinterest.com")) return "pinterest";

  if (lower.includes("threads.net")) return "threads";

  return "unknown";
}