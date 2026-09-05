export interface InstagramMedia {
  type: "image" | "video" | "carousel";
  url: string; // Direct download source content node CDN links
  thumbnail?: string;
}

export interface DownloaderResponse {
  success: boolean;
  media: InstagramMedia[];
  title?: string;
  error?: string;
}