import express from "express";
import * as myplaylistController from "../controller/myplaylist.js";
import * as util from "../util/util.js";

const router = express.Router();

//token 유효성 검사
router.use((req, res, next) => {
  util.authenticateToken(req, res, next);
});

router.post("/playlist", myplaylistController.createPlayList);
router.post("/movie", myplaylistController.createPlMovie);
router.get("playlist", myplaylistController.getPlayList);

export default router;
