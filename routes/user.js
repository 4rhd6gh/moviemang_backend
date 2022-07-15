import express from "express";
import * as userController from "../controller/user.js";

const router = express.Router();

router.put("/nickname", userController.updateNickname);
router.put("/like", userController.updateLike);

export default router;
