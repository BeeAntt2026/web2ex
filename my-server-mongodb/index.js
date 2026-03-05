const express = require('express');
const app = express();
const port = 3002;
const morgan=require("morgan")
app.use(morgan("combined"))
const bodyParser=require("body-parser")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const cors=require("cors");
// ← Cho phép credentials để Session hoạt động với Angular
app.use(cors({
  origin: function(origin, callback) {
    // Cho phép localhost với bất kỳ port nào
    if (!origin || origin.startsWith('http://localhost')) {
      callback(null, origin);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var session = require('express-session');
app.use(session({
  secret: "Shh, its a secret!",
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));
app.listen(port,()=>{
console.log(`My Server listening on port ${port}`)
})
app.get("/",(req,res)=>{
res.send("This Web server is processed for MongoDB")
})

app.get("/create-cookie",cors(),(req,res)=>{
  res.cookie("username","trinhthanhan")
  res.cookie("password","123456")
  account={"username":"trinhthanhan","password":"123456"}
  res.cookie("account",account)
  //Expires after 360000 ms from the time it is set.
  res.cookie("infor_limit1", 'I am limited Cookie - way 1', {expire: 360000 + Date.now()});
  res.cookie("infor_limit2", 'I am limited Cookie - way 2', {maxAge: 360000});
  res.send("cookies are created")
})

app.get("/read-cookie",cors(),(req,res)=>{
  //cookie is stored in client, so we use req
  username=req.cookies.username
  password=req.cookies.password
  account=req.cookies.account
  infor="username = "+username+"<br/>"
  infor+="password = "+password+"<br/>"
  if(account!=null)
  {
    infor+="account.username = "+account.username+"<br/>"
    infor+="account.password = "+account.password+"<br/>"
  }
  res.send(infor)
})

app.get("/clear-cookie",cors(),(req,res)=>{
  res.clearCookie("account")
  res.send("[account] Cookie is removed")
})

app.get("/contact",cors(),(req,res)=>{
  if(req.session.visited!=null)
  {
    req.session.visited++
    res.send("You visited this page "+req.session.visited+" times")
  }
  else
  {
    req.session.visited=1
    res.send("Welcome to this page for the first time!")
  }
})

const { MongoClient, ObjectId } = require('mongodb');
const client = new MongoClient("mongodb://127.0.0.1:27017");
let fashionCollection;
let userCollection;
let productCollection;

async function connectDB() {
  await client.connect();
  const database = client.db("FashionData");
  fashionCollection = database.collection("Fashion");
  userCollection = database.collection("User");
  productCollection = database.collection("Product");
  console.log("Connected to MongoDB");
}
connectDB();

app.post("/login", cors(), async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userCollection.findOne({ username: username, password: password });
    if (user) {
      res.cookie("login_username", username);
      res.cookie("login_password", password);
      res.send({ success: true, message: "Login successful!" });
    } else {
      res.send({ success: false, message: "Invalid username or password!" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.get("/read-login-cookie", cors(), (req, res) => {
  const username = req.cookies.login_username || "";
  const password = req.cookies.login_password || "";
  res.send({ username: username, password: password });
});

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

// ================== SHOPPING CART SESSION APIs ==================

// Add product to cart (stored in session)
app.post("/add-to-cart", cors(), async (req, res) => {
  try {
    const { productId, name, price, image, quantity } = req.body;
    if (!req.session.cart) {
      req.session.cart = [];
    }
    // Check if product already exists in cart
    const existingIndex = req.session.cart.findIndex(item => item.productId === productId);
    if (existingIndex >= 0) {
      req.session.cart[existingIndex].quantity += quantity || 1;
    } else {
      req.session.cart.push({
        productId: productId,
        name: name,
        price: price,
        image: image,
        quantity: quantity || 1
      });
    }
    res.send({ success: true, message: "Product added to cart!", cart: req.session.cart });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Get cart items from session
app.get("/cart", cors(), (req, res) => {
  const cart = req.session.cart || [];
  res.send(cart);
});

// Update cart (update quantities or remove items)
app.post("/update-cart", cors(), (req, res) => {
  try {
    const { cart } = req.body; // Array of { productId, quantity }
    if (!req.session.cart) {
      req.session.cart = [];
    }
    // Filter out items with quantity 0 or marked for removal
    req.session.cart = cart.filter(item => item.quantity > 0);
    res.send({ success: true, message: "Cart updated!", cart: req.session.cart });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Remove specific item from cart
app.delete("/remove-from-cart/:productId", cors(), (req, res) => {
  try {
    const productId = req.params.productId;
    if (req.session.cart) {
      req.session.cart = req.session.cart.filter(item => item.productId !== productId);
    }
    res.send({ success: true, message: "Product removed from cart!", cart: req.session.cart || [] });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Clear entire cart
app.delete("/clear-cart", cors(), (req, res) => {
  req.session.cart = [];
  res.send({ success: true, message: "Cart cleared!" });
});

// ================== PRODUCT APIs ==================

// GET tất cả sản phẩm
app.get("/products", async (req, res) => {
  try {
    const result = await productCollection.find({}).toArray();
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// GET một sản phẩm theo id
app.get("/products/:id", async (req, res) => {
  try {
    const result = await productCollection.findOne({ _id: new ObjectId(req.params.id) });
    if (!result) return res.status(404).send({ message: "Không tìm thấy sản phẩm" });
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// POST seed dữ liệu mẫu (chỉ gọi 1 lần)
app.post("/products/seed", async (req, res) => {
  try {
    await productCollection.deleteMany({});
    await productCollection.insertMany([
      { name: "Diamond Promise Ring 1/6 ct tw Round-cut 10K White Gold",    price: 399.99, sku: "SKU001", image: "https://cdn.pnj.io/images/thumbnails/485/485/detailed/180/sp-GNDD00C000074-nhan-cuoi-nam-kim-cuong-vang-18k-pnj-chung-doi-1.png" },
      { name: "Diamond Promise Ring 1/4 ct tw Round/Baguette 10K White Gold", price: 529.00, sku: "SKU002", image: "https://cdn.pnj.io/images/thumbnails/485/485/detailed/191/sp-cap-nhan-cuoi-vang-trang-10k-dinh-da-ecz-pnj-vang-son-00146-00106-1.png" },
      { name: "Diamond Promise Ring 1/6 ct tw Black/White Sterling Silver",  price: 159.00, sku: "SKU003", image: "https://cdn.pnj.io/images/thumbnails/485/485/detailed/177/sp-gn00ddw062103-vo-nhan-nam-kim-cuong-vang-trang-18k-pnj-1.png" },
      { name: "Diamond Promise Ring 1/5 ct tw Round-cut Sterling Silver",    price: 289.00, sku: "SKU004", image: "https://cdn.pnj.io/images/thumbnails/485/485/detailed/215/sp-gnxmxmy001798-nhan-nam-vang-18k-dinh-da-ecz-pnj-1.png" },
      { name: "Diamond Promise Ring 1/5 ct tw Round-cut Sterling Silver",    price: 289.00, sku: "SKU005", image: "https://cdn.pnj.io/images/thumbnails/485/485/detailed/142/gnddddw009144-nhan-nam-kim-cuong-vang-trang-14k-pnj.png" },
      { name: "Diamond Promise Ring 1/8 ct tw Round-cut Sterling Silver Ring", price: 229.00, sku: "SKU006", image: "https://cdn.pnj.io/images/thumbnails/485/485/detailed/199/sp-gnddddc001708-nhan-nam-kim-cuong-vang-14k-pnj-1.png" },
    ]);
    res.send({ success: true, message: "✅ Seed 6 sản phẩm thành công!" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});