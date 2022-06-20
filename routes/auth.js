import express from "express";
import * as authController from "../controller/auth.js";

const router = express.Router();

router.post("/login", authController.login);
router.post("/user", authController.join);
router.delete("/logout", authController.logout);

export default router;
