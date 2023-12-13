const express = require("express");
// var cors = require('cors')
const app = express();
const path = require("path")
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer")
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users")
const postRoute = require("./routes/posts")
const categoryRoute = require("./routes/categories")
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
dotenv.config();

// ************************************************************************************************
// Add headers 
// Fix lỗi Cors
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
// ************************************************************************************************


mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify:true,
    // useCreateIndex: true,
    // useFindAndModify:true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(console.log(), err));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images")
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name)
  }
})
const upload = multer({ storage: storage })

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("file has been uploaded")
})



app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/categories", categoryRoute)

// app.use(express.static(path.join(__dirname, "/Client/build")));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/Client/build', 'index.html'));
// });

app.listen(process.env.PORT || 5000, () => {
  console.log(`Backend is running on port ${process.env.PORT || 5000}`)
})