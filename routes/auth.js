import express from "express";
import * as authController from "../controller/auth.js";

const router = express.Router();
console.log("router");
router.post("/login", authController.login);
router.post("/user", authController.join);

export default router;
