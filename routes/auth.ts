import express from "express";
import {
	displayLoginForm,
	displayRegisterForm,
	loginUser,
	logoutUser,
	registerUser,
} from "../controllers/auth.controller";

const auth = express.Router();

auth.route("/login").get(displayLoginForm).post(loginUser);

auth.route("/register").get(displayRegisterForm).post(registerUser);

auth.post("/logout", logoutUser);

export default auth;
