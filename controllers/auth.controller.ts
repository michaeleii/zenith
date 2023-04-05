import { Request, Response } from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import prisma from "../src/client";

const displayLoginForm = (req: Request, res: Response) => {
	res.render("login");
};
const displayRegisterForm = (req: Request, res: Response) => {
	res.render("register");
};

const loginUser = passport.authenticate("local", {
	successRedirect: "/",
	failureRedirect: "/auth/login",
	failureMessage: true,
});

const registerUser = async (req: Request, res: Response) => {
	try {
		const { firstName, lastName, email, password, password2 } = req.body;
		if (password !== password2) res.redirect("/auth/register");
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await prisma.user.create({
			data: {
				firstName,
				lastName,
				email,
				password: hashedPassword,
			},
		});
		if (user) {
			res.redirect("/auth/login");
		} else {
			res.redirect("/auth/register");
		}
	} catch (error) {
		console.log(error);
	}
};

const logoutUser = (req: Request, res: Response) => {
	req.logout((err) => console.log(err));
	res.redirect("/");
};

export {
	displayLoginForm,
	displayRegisterForm,
	loginUser,
	registerUser,
	logoutUser,
};
