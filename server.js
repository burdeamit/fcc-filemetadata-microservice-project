var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();

const multer = require('multer');

let storage = multer.memoryStorage()
let upload = multer({ storage: storage }).single('upfile');

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', (req, res) => {
  upload(req, res, (err) => {
     if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
       res.send(err)
    } else if (err) {
      // An unknown error occurred when uploading.
       res.send(err)
     } else {
       console.log('file uploaded');
       res.json({
         name: req.file.originalname,
         type: req.file.mimetype,
         size: req.file.size
       })
    }
  })
  
})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
