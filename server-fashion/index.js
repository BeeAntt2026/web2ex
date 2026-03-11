const express = require('express');
const app = express();
const port = 4000;

// Morgan: log các request vào terminal để dễ debug
const morgan = require("morgan");
app.use(morgan("combined"));

// Body-parser: đọc được dữ liệu JSON gửi lên từ client
// Giới hạn 10mb vì ảnh Base64 có thể nặng (trang 107)
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb' }));

// CORS: cho phép Angular gọi API từ domain khác
const cors = require("cors");
app.use(cors());

// Khởi động server ở port 4000
app.listen(port, () => {
  console.log(`server-fashion listening on port ${port}`);
});

// API mặc định để test server còn sống không
app.get("/", (req, res) => {
  res.send("Server Fashion is running!");
});
// Kết nối tới MongoDB
const { MongoClient, ObjectId } = require('mongodb');
const client = new MongoClient("mongodb://127.0.0.1:27017");
client.connect();

// Trỏ vào database FashionData và collection Fashion
const database = client.db("FashionData");
const fashionCollection = database.collection("Fashionex58");
// =============================================
// API 1: GET tất cả Fashion, sort ngày tạo MỚI NHẤT lên đầu
// =============================================
app.get("/fashions", cors(), async (req, res) => {
  const result = await fashionCollection
    .find({})
    .sort({ created_date: -1 })
    .toArray();
  res.json(result);
});

// =============================================
// API 2: GET Fashion theo Style (filter)
// Ví dụ: GET /fashions/style/STREET STYLE
// =============================================
app.get("/fashions/style/:style", cors(), async (req, res) => {
  const style = req.params["style"];
  const result = await fashionCollection
    .find({ style: style })
    .sort({ created_date: -1 })
    .toArray();
  res.json(result);
});

// =============================================
// API 3: GET 1 Fashion theo ObjectId
// Ví dụ: GET /fashions/640c56d4ccb492017c31c184
// =============================================
app.get("/fashions/:id", cors(), async (req, res) => {
  const o_id = new ObjectId(req.params["id"]);
  const result = await fashionCollection.find({ _id: o_id }).toArray();
  res.json(result[0]);
});

// =============================================
// API 4: POST thêm mới 1 Fashion
// =============================================
app.post("/fashions", cors(), async (req, res) => {
  req.body.created_date = new Date(); // Tự động gán ngày tạo
  await fashionCollection.insertOne(req.body);
  res.json(req.body);
});

// =============================================
// API 5: PUT cập nhật 1 Fashion
// =============================================
app.put("/fashions", cors(), async (req, res) => {
  await fashionCollection.updateOne(
    { _id: new ObjectId(req.body._id) },   // điều kiện: tìm theo _id
    {
      $set: {                               // chỉ cập nhật các field này
        fashion_title: req.body.fashion_title,
        fashion_detail: req.body.fashion_detail,
        thumbnail: req.body.thumbnail,
        style: req.body.style,
        created_date: req.body.created_date
      }
    }
  );
  // Trả về Fashion vừa cập nhật
  const o_id = new ObjectId(req.body._id);
  const result = await fashionCollection.find({ _id: o_id }).toArray();
  res.json(result[0]);
});

// =============================================
// API 6: DELETE xóa 1 Fashion theo id
// Ví dụ: DELETE /fashions/640c56d4ccb492017c31c184
// =============================================
app.delete("/fashions/:id", cors(), async (req, res) => {
  const o_id = new ObjectId(req.params["id"]);
  // Lấy data trước khi xóa để trả về cho client
  const result = await fashionCollection.find({ _id: o_id }).toArray();
  await fashionCollection.deleteOne({ _id: o_id });
  res.json(result[0]);
});