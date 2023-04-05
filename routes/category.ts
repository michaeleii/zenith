import express from "express";

import {
	getAllCategories,
	getProductsByCategory,
} from "../controllers/categories.controller";
import { ensureAuthenticated } from "../middlewares/auth.middlewares";

const category = express.Router();

category.get("/", ensureAuthenticated, getAllCategories);

category.get("/:id", ensureAuthenticated, getProductsByCategory);

export default category;
