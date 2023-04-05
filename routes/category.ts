import express from "express";

import {
	getAllCategories,
	getProductByCategory,
} from "../controllers/categories.controller";
import { ensureAuthenticated } from "../middlewares/auth.middlewares";

const category = express.Router();

category.get("/", ensureAuthenticated, getAllCategories);

category.get("/:id", ensureAuthenticated, getProductByCategory);

export default category;
