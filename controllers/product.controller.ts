import { Request, Response } from "express";
import prisma from "../src/client";

const displayCreateProductForm = (req: Request, res: Response) => {
	res.render("productCreate");
};

const getAllProducts = async (req: Request, res: Response) => {
	try {
		const products = await prisma.product.findMany();
		res.render("products", { heading: "All Products", products });
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
		if (!product) {
			throw new Error("Product not found");
		}

		const category = await prisma.category.findUnique({
			where: { id: product.categoryId },
		});

		res.render("product", { product, category });
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
		if (!productCategory) {
			throw new Error("Product Category not found");
		}

		const product = await prisma.product.create({
			data: {
				name,
				description,
				price: parseFloat(price),
				stock: parseInt(stock),
				categoryId: productCategory.id,
			},
		});
		res.redirect(`/product/${product.id}`);
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
		if (!product) {
			throw new Error("Product not found");
		}
		const category = await prisma.category.findUnique({
			where: { id: product.categoryId },
		});
		res.render("productUpdate", { product, category });
	} catch (error) {
		console.log(error);
	}
};

const updateProduct = async (req: Request, res: Response) => {
	try {
		const id = +req.params.id;
		const { name, description, price, stock, category } = req.body;
		const productCategory = await prisma.category.findFirst({
			where: { name: category },
		});
		if (productCategory) {
			const product = await prisma.product.update({
				where: { id },
				data: {
					name,
					description,
					price: parseFloat(price),
					stock: parseInt(stock),
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
