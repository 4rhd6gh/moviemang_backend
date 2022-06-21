import express from "express";
import * as myplaylistController from "../controller/myplaylist.js";

const router = express.Router();

//token 유효성 검사
router.use((req, res, next) => {
  util.authenticateToken(req, res, next);
});

router.post("/playlist", myplaylistController.createPlayList);

export default router;
