import { Request, Response } from "express";
import prisma from "../src/client";

const getAllCategories = async (req: Request, res: Response) => {
	try {
		const categories = await prisma.category.findMany();
		res.render("categories", { categories });
	} catch (error) {
		console.log(error);
	}
};

const getProductsByCategory = async (req: Request, res: Response) => {
	try {
		const id = +req.params.id;
		const category = await prisma.category.findUnique({ where: { id } });
		if (category) {
			const products = await prisma.product.findMany({
				where: { categoryId: id },
			});
			res.render("products", { heading: category.name, products });
		}
	} catch (error) {
		console.log(error);
	}
};
const displayCreateCategoryForm = (req: Request, res: Response) => {
	res.render("categoryCreate");
};

const createCategory = async (req: Request, res: Response) => {
	try {
		const { name } = req.body;
		await prisma.category.create({
			data: { name },
		});
		res.redirect(`/category/all`);
	} catch (error) {
		console.log(error);
	}
};

export {
	displayCreateCategoryForm,
	getAllCategories,
	getProductsByCategory,
	createCategory,
};
