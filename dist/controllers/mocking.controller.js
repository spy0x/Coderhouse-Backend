import mockingService from "../services/mocking.services.js";
class MockingController {
    async addMockingProducts(req, res) {
        const result = await mockingService.createMockingProducts();
        return res.status(result.code).json(result.result);
    }
}
const mockingController = new MockingController();
export default mockingController;
