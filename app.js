import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import playlistRouter from "./routes/playlist.js";
import myplaylistRouter from "./routes/myplaylist.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/auth", authRouter);
app.use("/playlist", playlistRouter);
app.use("/myplaylist", myplaylistRouter);

// 500 Error Handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Something went wrong" });
});

app.listen(8000, () => {
  console.log("**----------------------------------**");
  console.log("====      Server is On...!!!      ====");
  console.log("**----------------------------------**");
});
