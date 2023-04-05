import express from "express";
import intializeExpressMiddlewares from "./middlewares/express.middlewares";
import initializeRoutes from "./middlewares/route.middlewares";
import intializePassport from "./src/passport/passportConfig";

const app = express();

const port = process.env.PORT || 3000;

intializeExpressMiddlewares(app);

initializeRoutes(app);

intializePassport();

app.listen(port, () => console.log(`Listening on port ${port}...`));
