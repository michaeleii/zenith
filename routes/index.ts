import express from "express";
import { displayHomepage } from "../controllers/index.controller";

const index = express.Router();

index.get("/", displayHomepage);

export default index;
