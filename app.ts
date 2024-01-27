import express from "express";

const app = express();
const PORT = process.env.PORT || 8080;

app.use("/", (req, res) => {
  res.json({ message: "file upload demo using multer" });
});

app.listen(PORT, () => {
  console.log("server running at http://localhost:" + PORT);
});
