import { Application } from "express";
import index from "../routes/index";
import auth from "../routes/auth";

const initializeRoutes = (app: Application) => {
	app.use("/", index);
	app.use("/auth", auth);
};

export default initializeRoutes;
