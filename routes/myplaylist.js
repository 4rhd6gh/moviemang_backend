import express from "express";
import * as myplaylistController from "../controller/myplaylist.js";
import * as util from "../util/util.js";
import { body } from "express-validator";

const router = express.Router();

const validateCreatePlaylist = [
  body("playlistTitle")
    .notEmpty()
    .withMessage("플레이리스트 제목을 입력해야합니다."),
  body("playlistDesc")
    .notEmpty()
    .withMessage("플레이리스트에 대한 설명이 필요합니다."),
  body("tags")
    .isArray()
    .notEmpty()
    .withMessage("하나 이상의 태그를 선택해야 합니다."),
];

//token 유효성 검사
router.use((req, res, next) => {
  util.authenticateToken(req, res, next);
});

router.post(
  "/playlist",
  validateCreatePlaylist,
  myplaylistController.createPlayList
);
router.post("/movie", myplaylistController.createPlMovie);
router.delete("/movie", myplaylistController.deletePlMovie);
router.get("/playlist", myplaylistController.getPlayList);
router.get("/playlist/:playlistId", myplaylistController.getPlayListById);
router.get("/playlistForCreate", myplaylistController.getPlayListForCreate);
router.get("/tag", myplaylistController.getTags);

export default router;
