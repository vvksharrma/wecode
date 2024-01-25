const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
require("dotenv").config();
//Importing models
const User = require("./models/user");
const Post = require("./models/post");

//Initializing
const port = process.env.PORT || 4400;
const app = express();
const uploadMiddleware = multer({ dest: "uploads/" });

app.use(express.json()); //to parse reqest response to json
app.use(
  cors({
    credentials: true,
    origin: "https://wecodeblog.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    headers: ["Content-Type", "Authorization"],
  })
);
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "OPTIONS, GET, POST, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// });
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

//connnecting to moongoDB using mongoose
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

//secret for JWT
const secret = "asdfghjkl";

app.get("/", (req, res) => {
  res.json("running");
});

app.post("/register", async (req, res) => {
  const { userName, password } = req.body;
  var salt = bcrypt.genSaltSync(10);
  try {
    const userDoc = await User.create({
      userName,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  const userDoc = await User.findOne({ userName });
  const pass = bcrypt.compareSync(password, userDoc.password);
  if (pass) {
    jwt.sign({ userDoc }, secret, {}, (err, token) => {
      if (err) {
        throw err;
      }
      res.cookie("token", token).json({
        id: userDoc._id,
        username: userDoc.userName,
      });
    });
  } else {
    res.status(400).json("wrong credentials");
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("Logged out");
});

app.get("/profile", (req, res) => {
  // const { token } = req.cookies;
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/createpost", uploadMiddleware.single("files"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const newPath = path + "." + parts[parts.length - 1];
  fs.renameSync(path, newPath);

  // const { token } = req.cookies;
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const postDoc = await Post.create({
      ...req.body,
      cover: newPath,
      author: info.userDoc.userName,
      authorId: info.userDoc._id,
    });
    res.json(postDoc);
    // res.json(info)
  });
});

app.get("/post", async (req, res) => {
  const posts = await Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(posts);
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author");
  res.json(postDoc);
});

app.put("/editpost/:id", uploadMiddleware.single("files"), async (req, res) => {
  const { id } = req.params;
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const newPath = path + "." + parts[parts.length - 1];
  fs.renameSync(path, newPath);
  try {
    const postDoc = await Post.findByIdAndUpdate(
      id,
      {
        ...req.body,
        cover: newPath,
      },
      { new: true }
    );
    if (!postDoc) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(postDoc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.listen(port, console.log("server started on port 4400"));
