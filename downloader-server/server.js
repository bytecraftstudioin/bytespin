const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const downloadRoute = require("./routes/download");
const fileRoute = require("./routes/file");
const YTDlpWrap = require("yt-dlp-wrap").default;

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

const binDir = path.join(__dirname, "bin");

if (!fs.existsSync(binDir)) {
  fs.mkdirSync(binDir);
}

const ytDlpPath = path.join(binDir, "yt-dlp.exe");

async function initYtDlp() {
  if (!fs.existsSync(ytDlpPath)) {
    console.log("⬇ Downloading yt-dlp...");
    await YTDlpWrap.downloadFromGithub(ytDlpPath);
    console.log("✅ yt-dlp downloaded.");
  } else {
    console.log("✅ yt-dlp already exists.");
  }
}

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ByteSpin Downloader Server Running 🚀",
  });
});

app.use("/download", downloadRoute);
app.use("/file", fileRoute);

initYtDlp().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});