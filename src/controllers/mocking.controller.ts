import { Request, Response } from "express";
import mockingService from "../services/mocking.services.js";

class MockingController {
  async addMockingProducts(req: Request, res: Response) {
    const result: ResResult = await mockingService.createMockingProducts();
    return res.status(result.code).json(result.result);
  }
}

const mockingController = new MockingController();
export default mockingController;