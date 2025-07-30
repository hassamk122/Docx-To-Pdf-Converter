const express = require("express");
const router = express.Router();
const upload = require('../multer');
const {serveMainPage,convertDocxtopdf} = require('../controllers');



router
.route('/')
.get(serveMainPage);


router
.route("/docxtopdf")
.post(upload.single('file'),convertDocxtopdf);

module.exports = router;