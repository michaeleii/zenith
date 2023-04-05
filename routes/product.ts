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

product.get("/all", ensureAuthenticated, getAllProducts);

product
	.route("/create")
	.all(ensureAuthenticated)
	.get(displayCreateProductForm)
	.post(createProduct);

product
	.route("/:id/update")
	.all(ensureAuthenticated)
	.get(displayUpdateProductForm)
	.post(updateProduct);

product.post("/:id/delete", ensureAuthenticated, deleteProduct);

product.get("/:id", ensureAuthenticated, getProductById);

export default product;
