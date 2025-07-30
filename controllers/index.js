
const mammoth = require('mammoth');
const html_to_pdf = require('html-pdf-node');
const path = require('path');
const fs = require('fs');


async function convertDocxtopdf(req, res) {
  try {

    const result = await mammoth.extractRawText({ path: req.file.path });
    const html = `<html><body><pre>${result.value}</pre></body></html>`;


    const file = { content: html };
    const pdfBuffer = await html_to_pdf.generatePdf(file, { format: 'A4' });


    fs.unlink(req.file.path, () => {});

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${Date.now()}-output.pdf"`,
    });
    res.send(pdfBuffer);

  } catch (error) {
    console.error('Conversion failed:', error);
    res.status(500).json({ error: 'Failed to convert file' });
  }
}

module.exports = {
    serveMainPage,
    convertDocxtopdf
}