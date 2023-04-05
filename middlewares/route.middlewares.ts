import { Application } from "express";
import index from "../routes/index";
import auth from "../routes/auth";
import product from "../routes/product";
import category from "../routes/category";

const initializeRoutes = (app: Application) => {
	app.use("/", index);
	app.use("/auth", auth);
	app.use("/product", product);
	app.use("/category", category);
};

export default initializeRoutes;
