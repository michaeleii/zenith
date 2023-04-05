import express from "express";
import {
	getAllProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
	displayCreateProductForm,
	displayUpdateProductForm,
} from "../controllers/product.controller";

import { ensureAuthenticated } from "../middlewares/auth.middlewares";

const product = express.Router();

product.get("/", ensureAuthenticated, getAllProducts);

product.get("/create", ensureAuthenticated, displayCreateProductForm);
product.post("/create", ensureAuthenticated, createProduct);

product.get("/:id", ensureAuthenticated, getProductById);
product.get("/:id/update", ensureAuthenticated, displayUpdateProductForm);
product.post("/:id/update", ensureAuthenticated, updateProduct);
product.post("/:id/delete", ensureAuthenticated, deleteProduct);

export default product;
