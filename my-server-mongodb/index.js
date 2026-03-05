const express = require('express');
const app = express();
const port = 3002;
const morgan=require("morgan")
app.use(morgan("combined"))
const bodyParser=require("body-parser")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const cors=require("cors");
app.use(cors())
app.listen(port,()=>{
console.log(`My Server listening on port ${port}`)
})
app.get("/",(req,res)=>{
res.send("This Web server is processed for MongoDB")
})
const { MongoClient, ObjectId } = require('mongodb');
const client = new MongoClient("mongodb://127.0.0.1:27017");
let fashionCollection;

async function connectDB() {
  await client.connect();
  const database = client.db("FashionData");
  fashionCollection = database.collection("Fashion");
  console.log("Connected to MongoDB");
}
connectDB();

app.get("/fashions", cors(), async (req, res) => {
  try {
    const result = await fashionCollection.find({}).toArray();
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.get("/fashions/:id", cors(), async (req, res) => {
  try {
    const result = await fashionCollection.findOne({ _id: new ObjectId(req.params.id) });
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});