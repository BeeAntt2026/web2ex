// triệu gọi thư viện api express
const express = require("express")
// khởi tạo ứng dụng express
const app = express()
// cấu hình cổng kết nối
const port = 3000
const morgan=require("morgan")
app.use(morgan("combined"))
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const cors = require("cors")
app.use(cors()) 
const bodyParser=require("body-parser")
app.use(bodyParser.json())
//tạo default api (home)
//req là viết tắt của request nhận thông tin từ client
//res là viết tắt của response trả về thông tin cho client
//ví dụ: nhập tên với pass là req, trả về thông tin đăng nhập thành công là res
app.get("/", (req,res) => {
    res.send("<h1>Welcome to K234111E Server</h1><p>Visit <a href='/about'>/about</a> for more info</p>")
})

app.get("/about", (req,res) => {
    tbl="<table border='1'>"
    tbl+="<tr>"
    tbl+="<td>MSSV</td>"
    tbl+="<td>K234111384</td>"
    tbl+="</tr>"
    tbl+="<tr>"
    tbl+="<td>Họ và tên</td>"
    tbl+="<td>Trinh Thanh An</td>"
    tbl+="</tr>"
    tbl+="<tr>"
    tbl+="<td colspan='2'><img src ='images/Trịnh Thanh An.JPG'></td>"
    tbl+="</tr>"
    tbl+="</table>"
    res.send(tbl)
})

let database=[
  {
    "BookId": "b1",
    "Tensach": "Giáo trình Tin học cơ bản",
    "Giaban": 26000.00,
    "Mota": "Nội dung của cuốn: Tin Học Cơ Bản Windows XP gồm có 7 chương. Chương 1: Một số vấn đề cơ bản. Chương 2: Sử dụng nhanh thành công cư và thanh thực đơn trong My Computer và Windows Explorer. Chương 3: Các thủ thuật với Windows XP. Chương 4: Các thiết lập trong Windows XP. Chương 5: Bảo trì máy tính. Chương 6: Các phím tắt. Chương 7: Hỏi và đáp các thắc mắc. Xin trân trọng giới thiệu cuốn sách cùng bạn.",
    "Anhbia": "b1.png",
    "Ngaycapnhat": "25/10/2014",
    "Soluongton": 120,
    "MaCD": 7,
    "MaNXB": 1
  },
  {
    "BookId": "b2",
    "Tensach": "Giáo trình Cơ Sở Dữ Liệu Với Visual Basic 2005 Và ADO.NET 2.0",
    "Giaban": 12000.00,
    "Mota": "Cuốn sách này gồm 3 phần sau: Phần 1: Xử lý văn bản trong Microsoft. Thiểu các cải tiến sâu. Chương 1: Căn bản về cơ sở dữ liệu. Chương 2: Các bộ kết nối và tương tác dữ liệu. Chương 3: Bộ chứa dữ liệu DataSet. Chương 4: Bộ điều hợp dữ liệu DataAdapter. Chương 5: Sử dụng các điều khiến răng buộc dữ liệu. Chương 6: Tạo báo cáo với Crystal Report. Chương 7: ADO.NET và XML. Xin trân trọng giới thiệu cùng các bạn.",
    "Anhbia": "b2.png",
    "Ngaycapnhat": "23/10/2013",
    "Soluongton": 25,
    "MaCD": 3,
    "MaNXB": 2
  },
  {
    "BookId": "b3",
    "Tensach": "Visual Basic 2005 Tập 3, Quyển 2: Lập Trình Web Với Cơ Sở Dữ Liệu",
    "Giaban": 20000.00,
    "Mota": "Visual Basic 2005 Tập 3, Quyển 2: Lập Trình Web Với Cơ Sở Dữ Liệu sẽ cung cấp kỹ thuật và hướng dẫn bạn. Tự học xây dựng ứng dụng Web quản lý CSDL toàn diện với ADO.NET 2.0 và ASP.NET. Khai thác các đối tượng và nguồn dữ liệu dành cho WebForm. Sử dụng các điều khiển dữ liệu để lập thủ dành riêng cho ASP.NET và Web. Làm quen với những khái niệm xử lý dữ liệu hoàn toàn mới. Ràng buộc dữ liệu với các thành phần giao diện Web Forms. Thiết kế ứng dụng Web 'Quản lý CD Shop' thực tế. Cung cấp một kiến thức hoàn chỉnh và Web cho các bạn với sở thích ngôn ngữ Visual Basic và .NET Framework. Sách có kèm theo CD-ROM bài tập.",
    "Anhbia": "b3.png",
    "Ngaycapnhat": "15/09/2014",
    "Soluongton": 240,
    "MaCD": 8,
    "MaNXB": 4
  },
  {
    "BookId": "b4",
    "Tensach": "Máy học nâng cao",
    "Giaban": 300.00,
    "Mota": "Sách về Machine Learning nâng cao",
    "Anhbia": "b4.png",
    "Ngaycapnhat": "01/01/2024",
    "Soluongton": 50,
    "MaCD": 5,
    "MaNXB": 2
  },
  {
    "BookId": "b5",
    "Tensach": "Lập trình Robot cơ bản",
    "Giaban": 250.00,
    "Mota": "Sách về lập trình Robot cho người mới bắt đầu",
    "Anhbia": "b5.png",
    "Ngaycapnhat": "15/06/2023",
    "Soluongton": 80,
    "MaCD": 6,
    "MaNXB": 3
  }
]
app.get("/books",(req,res)=>{
res.send(database)
})
app.get("/books/:id",cors(),(req,res)=>{
id=req.params["id"]
let p=database.find(x=>x.BookId==id)
res.send(p)
})
app.post("/books",cors(),(req,res)=>{
//put json book into database
database.push(req.body);
//send message to client(send all database to client)
res.send(database)
})

// Upload file configuration
const fileUpload = require('express-fileupload');
app.use(
  fileUpload({
    limits: { fileSize: 10000000 },
    abortOnLimit: true,
  })
);

// Upload endpoint
app.post('/upload', cors(), (req, res) => {
  if (!req.files || !req.files.image) {
    return res.status(400).send({ error: 'No image uploaded' });
  }
  const { image } = req.files;
  const uploadPath = __dirname + '/public/images/' + image.name;
  
  image.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    res.send({ 
      success: true, 
      fileName: image.name,
      filePath: 'images/' + image.name 
    });
  });
});

// Get uploaded image
app.get('/image/:id', cors(), (req, res) => {
  const id = req.params['id'];
  res.sendFile(__dirname + '/public/images/' + id);
});
// PUT - Cập nhật sách
app.put("/books/:id", cors(), (req, res) => {
  let id = req.params.id;
  let index = database.findIndex(x => x.BookId == id);
  if (index !== -1) {
    database[index] = { ...database[index], ...req.body };
    res.send(database[index]);
  } else {
    res.status(404).send({ error: "Không tìm thấy sách" });
  }
});

// DELETE - Xóa sách
app.delete("/books/:id", cors(), (req, res) => {
  let id = req.params.id;
  let index = database.findIndex(x => x.BookId == id);
  if (index !== -1) {
    database.splice(index, 1);
    res.send({ message: "Xóa thành công" });
  } else {
    res.status(404).send({ error: "Không tìm thấy sách" });
  }
});

// Khởi động server
app.listen(port, () => {
    console.log(`K234111E Server is running at ${port}`)
})