const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const port = 3001;
const morgan=require("morgan")
app.use(morgan("combined"))

// CORS phải đặt TRƯỚC các middleware khác
const cors=require("cors")
app.use(cors())

const bodyParser=require("body-parser")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(
fileUpload({
limits: {
fileSize: 10000000,
},
abortOnLimit: true,
})
);
// Add this line to serve our index.html page
app.use(express.static('public'));
app.get('/', (req, res) => {
res.sendFile('index.html');
});

app.get("/image/:id",(req,res)=>{
id=req.params["id"]
console.log('upload/'+id)
res.sendFile(__dirname+'/upload/'+id);
})
app.post('/upload', (req, res) => {
// Check if files exist
if (!req.files || !req.files.image) {
  console.log('No file uploaded');
  return res.status(400).send('No image uploaded');
}
// Get the file that was set to our field named "image"
const { image } = req.files;
// Move the uploaded image to our upload folder
image.mv(__dirname + '/upload/' + image.name, (err) => {
  if (err) {
    console.log('Error moving file:', err);
    return res.status(500).send(err);
  }
  console.log('File uploaded:', image.name);
  res.sendStatus(200);
});
});
app.listen(port, () => {
console.log(`Example app listening on port ${port}`);
});