
const docxtopdf = require('docx-pdf');
const path = require('path');
const fs = require('fs');


function serveMainPage(req, res) {
  const filePath = path.resolve(__dirname, '../views/index.html');
  res.sendFile(filePath);
}

function convertDocxtopdf(request,response){

    const outputFilePath = `${Date.now()}-output.pdf`;

    docxtopdf(request.file.path,outputFilePath,(error)=>{

        if(error){
            console.log('error',err);
            return response.status(500).json({error:"Failed to Covert file"});
        }

        fs.unlink(request.file.path, () => {});

        response.download(outputFilePath,()=>{
            fs.unlink(outputFilePath,()=>{})
        })
    });
}

module.exports = {
    serveMainPage,
    convertDocxtopdf
}