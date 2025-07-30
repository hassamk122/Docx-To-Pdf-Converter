const express = require('express');
const app = express();
const router = require("./routes");



app.use(express.static('uploads'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use("/",router);

const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log("listening at PORT 4000")
});
