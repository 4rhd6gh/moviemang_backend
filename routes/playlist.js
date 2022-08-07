import express from "express";
import * as playlistController from "../controller/playlist.js";

const router = express.Router();

router.get("/likeOrder", playlistController.likeOrder);
router.post("/like", playlistController.likePlaylist);
router.delete("/like", playlistController.unlikePlaylist);
export default router;
