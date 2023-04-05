import express, { Application, NextFunction } from "express";
import logger from "morgan";
import session from "express-session";
import passport from "passport";

const updateCurrentUser = (req: any, res: any, next: NextFunction) => {
	res.locals.currentUser = req.user;
	next();
};

const intializeExpressMiddlewares = (app: Application) => {
	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());
	app.set("view engine", "ejs");
	app.set("views", "views");
	app.use(express.static("public"));
	app.use(logger("dev"));
	app.use(
		session({
			secret: "keyboard cat",
			resave: false,
			saveUninitialized: true,
		})
	);
	app.use(passport.initialize());
	app.use(passport.session());

	app.use(updateCurrentUser);
};

export default intializeExpressMiddlewares;
