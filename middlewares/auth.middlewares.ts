import { Request, Response, NextFunction } from "express";
const ensureAuthenticated = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/auth/login");
};

const forwardAuthenticated = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.isAuthenticated()) {
		return next();
	}
	res.redirect("/posts");
};

export { ensureAuthenticated, forwardAuthenticated };
