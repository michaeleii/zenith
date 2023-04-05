import express from "express";

import {
	displayCreateCategoryForm,
	createCategory,
	getAllCategories,
	getProductsByCategory,
} from "../controllers/categories.controller";
import { ensureAuthenticated } from "../middlewares/auth.middlewares";

const category = express.Router();

category.get("/all", ensureAuthenticated, getAllCategories);
category
	.route("/create")
	.all(ensureAuthenticated)
	.get(displayCreateCategoryForm)
	.post(createCategory);

category.get("/:id", ensureAuthenticated, getProductsByCategory);

export default category;
