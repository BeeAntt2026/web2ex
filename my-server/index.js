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
app.listen(port, () => {
    console.log(`K234111E Server is running at ${port}`)
})
let database=[
{"BookId":"b1","BookName":"Kỹ thuật lập trình cơ bản",
"Price":70,"Image":"b1.png"},
{"BookId":"b2","BookName":"Kỹ thuật lập trình nâng cao",
"Price":100,"Image":"b2.png"},
{"BookId":"b3","BookName":"Máy học cơ bản","Price":200,"Image":"b3.png"},
{"BookId":"b4","BookName":"Máy học nâng cao","Price":300,"Image":"b4.png"},
{"BookId":"b5","BookName":"Lập trình Robot cơ bản","Price":250,"Image":"b5.png"},
]
app.get("/books",(req,res)=>{
res.send(database)
})