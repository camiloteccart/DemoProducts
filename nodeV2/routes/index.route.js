import { Router } from "express";

import productRouter from "./product.route.js";

const indexRouter = Router();

const prefix = "/api";

indexRouter.use(`${prefix}`, productRouter);

export default indexRouter;
