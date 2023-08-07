import { Router } from "express";
import mockingController from "../controllers/mocking.controller.js";

const mockingRouter = Router();
export default mockingRouter;

mockingRouter.get("/mockingproducts", mockingController.addMockingProducts);