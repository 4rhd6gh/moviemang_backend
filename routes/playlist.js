import express from "express";
import * as playlistController from "../controller/playlist.js";

const router = express.Router();

router.get("/likeOrder", playlistController.likeOrder);

export default router;
