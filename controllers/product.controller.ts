import { Request, Response } from "express";
import prisma from "../src/client";

const displayCreateProductForm = (req: Request, res: Response) => {
	res.render("product.create");
};

const getAllProducts = async (req: Request, res: Response) => {
	try {
		const products = await prisma.product.findMany();
		res.render("products", { products });
	} catch (error) {
		console.log(error);
	}
};

const getProductById = async (req: Request, res: Response) => {
	try {
		const id = +req.params.id;
		const product = await prisma.product.findUnique({
			where: { id },
		});
		res.render("product", { product });
	} catch (error) {
		console.log(error);
	}
};

const createProduct = async (req: Request, res: Response) => {
	try {
		const { name, description, price, stock, category } = req.body;
		const productCategory = await prisma.category.findUnique({
			where: { name: category },
		});
		if (productCategory) {
			const product = await prisma.product.create({
				data: {
					name,
					description,
					price,
					stock,
					categoryId: productCategory.id,
				},
			});
			res.redirect(`/product/${product.id}`);
		}
	} catch (error) {
		console.log(error);
	}
};

const displayUpdateProductForm = async (req: Request, res: Response) => {
	try {
		const id = +req.params.id;
		const product = await prisma.product.findUnique({
			where: { id },
		});
		res.render("product.update", { product });
	} catch (error) {
		console.log(error);
	}
};

const updateProduct = async (req: Request, res: Response) => {
	try {
		const id = +req.params.id;
		const { name, description, price, stock, category } = req.body;
		const productCategory = await prisma.category.findUnique({
			where: { name: category },
		});
		if (productCategory) {
			const product = await prisma.product.update({
				where: { id },
				data: {
					name,
					description,
					price,
					stock,
					categoryId: productCategory.id,
				},
			});
			res.redirect(`/product/${product.id}`);
		} else {
			throw new Error("Category not found");
		}
	} catch (error) {
		console.log(error);
	}
};

const deleteProduct = async (req: Request, res: Response) => {
	try {
		const id = +req.params.id;
		await prisma.product.delete({ where: { id } });
		res.redirect("/product/all");
	} catch (error) {
		console.log(error);
	}
};

export {
	displayCreateProductForm,
	displayUpdateProductForm,
	getAllProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
};
