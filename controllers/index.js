
const mammoth = require('mammoth');
const html_to_pdf = require('html-pdf-node');
const path = require('path');
const fs = require('fs');


function serveMainPage(req, res) {
  const filePath = path.resolve(__dirname, '../views/index.html');
  res.sendFile(filePath);
}

async function convertDocxtopdf(req, res) {
  try {
    console.log('Starting conversion for file:', req.file.path);

    // Convert DOCX to HTML
    const result = await mammoth.extractRawText({ path: req.file.path });
    console.log('Extracted text length:', result.value.length);

    const html = `<html><body><pre>${result.value}</pre></body></html>`;

    // Convert HTML to PDF
    const file = { content: html };
    const pdfBuffer = await html_to_pdf.generatePdf(file, { format: 'A4' });
    console.log('PDF buffer length:', pdfBuffer.length);

    // Clean up uploaded DOCX
    fs.unlink(req.file.path, () => {
      console.log('Deleted uploaded DOCX');
    });

    // Send PDF back
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${Date.now()}-output.pdf"`,
    });
    res.send(pdfBuffer);

  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).json({ error: 'Failed to convert file', details: error.message });
  }
}

module.exports = {
    serveMainPage,
    convertDocxtopdf
}