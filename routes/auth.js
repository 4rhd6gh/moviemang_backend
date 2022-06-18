import express from "express";
import * as authController from "../controller/auth.js";

const router = express.Router();
console.log("router");
router.post("/login", authController.login);

export default router;
