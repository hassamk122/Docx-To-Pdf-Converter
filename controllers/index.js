
const docxtopdf = require('docx-pdf');
const path = require('path');
const fs = require('fs');


function serveMainPage(req, res) {
  const filePath = path.resolve(__dirname, '../views/index.html');
  res.sendFile(filePath);
}

function convertDocxtopdf(req, res) {
    const inputFilePath = path.resolve(req.file.path); // absolute path
    const outputFilePath = path.resolve(`${Date.now()}-output.pdf`);

    docxtopdf(inputFilePath, outputFilePath, (error) => {
        if (error) {
            console.error('Conversion error:', error);
            return res.status(500).json({ error: "Failed to convert file" });
        }

        fs.unlink(inputFilePath, () => {});

        res.download(outputFilePath, () => {
            fs.unlink(outputFilePath, () => {});
        });
    });
}

module.exports = {
    serveMainPage,
    convertDocxtopdf
}