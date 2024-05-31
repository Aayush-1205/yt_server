import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import useRoutes from "./routes/user.js";
import videoRoutes from "./routes/video.js";
import commentsRoutes from "./routes/comments.js";
import groupRoutes from './routes/group.js'

import path from "path";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "3000mb", extended: true }));
app.use(express.urlencoded({ limit: "3000mb", extended: true }));
app.use("/uploads", express.static(path.join("uploads")));

app.get("/", (req, res) => {
  res.send("hello");
});
app.use(bodyParser.json());

app.use("/user", useRoutes);
app.use("/video", videoRoutes);
app.use("/comment", commentsRoutes);
app.use("/api/groups", groupRoutes);


const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server Running on the PORT ${PORT}`);
});

const DB_URL = process.env.CONNECTION_URL;
mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB database connected");
  })
  .catch((error) => {
    console.log(error);
  });
