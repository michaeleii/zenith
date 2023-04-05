import { Request, Response } from "express";

const displayHomepage = (req: Request, res: Response) => {
	res.render("index");
};

export { displayHomepage };
