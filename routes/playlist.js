import express from "express";
import * as playlistController from "../controller/playlist.js";
import * as util from "../util/util.js";
const router = express.Router();

router.get("/likeOrder", playlistController.likeOrder);
router.get("/popularTag", playlistController.getPopularTag);

//token 유효성 검사
router.use((req, res, next) => {
  util.authenticateToken(req, res, next);
});

router.post("/like", playlistController.likePlaylist);
router.delete("/like", playlistController.unlikePlaylist);

export default router;
