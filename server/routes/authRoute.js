import express from "express";
import  {storeUser}  from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/user",storeUser);

export default router;
