import express from "express";
import {
	displayLoginForm,
	displayRegisterForm,
	loginUser,
	logoutUser,
	registerUser,
} from "../controllers/auth.controller";
import {
	ensureAuthenticated,
	forwardAuthenticated,
} from "../middlewares/auth.middlewares";

const auth = express.Router();

auth
	.route("/login")
	.all(forwardAuthenticated)
	.get(displayLoginForm)
	.post(loginUser);

auth
	.route("/register")
	.all(forwardAuthenticated)
	.get(displayRegisterForm)
	.post(registerUser);

auth.post("/logout", ensureAuthenticated, logoutUser);

export default auth;
