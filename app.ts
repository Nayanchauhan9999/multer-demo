import express from "express";
import multer from "multer";
import fs from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 8080;
const __dirname = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "uploads")));
app.use(express.static(join(__dirname, "public")));

console.log(join(__dirname, "public"));

const storage = multer.diskStorage({
  destination: (req, res, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, res, callback) => {
    callback(null, `${Date.now()}-${res.originalname}`);
  },
});

const upload = multer({ storage });

app.get("/upload", (req, res) => {
  fs.readdir("./uploads/", (err, data) => {
    console.log(data);
    res.json({ imageUrl: join(__dirname, "uploads", data[0]) });
  });
});

app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.file, req.body);
  res.send("demo...");
});

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log("server running at http://localhost:" + PORT);
});
