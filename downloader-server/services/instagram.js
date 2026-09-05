const {
  getInfo,
  getQualities,
  isVideo,
  getDirectUrl
} = require("./downloader");

async function getInstagramInfo(url) {

  try {

    const info = await getInfo(url);

    if (isVideo(info)) {

      return {
        success: true,
        source: "Instagram",
        type: "video",
        title: info.title,
        thumbnail: info.thumbnail,
        duration: info.duration || 0,
        uploader: info.uploader || "",
        originalUrl: url,
        qualities: getQualities(info)
      };

    }

  } catch (err) {

    // ✅ Image post fallback
    if (err.message.includes("Image post detected")) {

      const imageUrl = await getDirectUrl(url);

      return {

        success: true,

        source: "Instagram",

        type: "image",

        title: "Instagram Image",

        thumbnail: imageUrl,

        downloadUrl: imageUrl,

        originalUrl: url,

        qualities: []

      };

    }

    throw err;

  }

}

module.exports = {
  getInstagramInfo
};