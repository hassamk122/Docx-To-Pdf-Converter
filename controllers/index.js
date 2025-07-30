
const convertToPdf = require("docx-pdf-converter");
const path = require('path');
const fs = require('fs');


function serveMainPage(req, res) {
  const filePath = path.resolve(__dirname, '../views/index.html');
  res.sendFile(filePath);
}

function convertDocxtopdf(req, res) {
  const outputFilePath = `${Date.now()}-output.pdf`;

  convertToPdf(req.file.path, outputFilePath)
    .then(() => {
      res.download(outputFilePath, () => {
        fs.unlink(req.file.path, () => {});
        fs.unlink(outputFilePath, () => {});
      });
    })
    .catch(err => {
      console.error("Conversion failed:", err);
      res.status(500).json({ error: "Failed to convert file" });
    });
}

module.exports = {
    serveMainPage,
    convertDocxtopdf
}