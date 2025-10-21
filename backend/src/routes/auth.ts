import express from "express";
import "dotenv/config";;
import { login } from "../controllers/authControllers";


const router = express.Router();

router.post("/login", login);

export default router;
