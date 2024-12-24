import express from "express";
import checkAuth from "../utils/checkAuth.js";
import {
    getUserOrder,
    createOrder,
    updateOrder,
    deleteOrder,
} from "../controllers/OrderController.js";

const router = express.Router();

router.get("/", checkAuth, getUserOrder);

router.post("/", checkAuth, createOrder);

router.put("/:id", checkAuth, updateOrder);

router.delete("/:id", checkAuth, deleteOrder);

export default router;
