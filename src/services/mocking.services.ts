import { generateProduct } from "../utils/faker.js";

class MockingService {
  async createMockingProducts() {
    //create 100 products with faker
    try {
      const products = [];
      for (let i = 0; i < 100; i++) {
        //create product
        const generatedProduct = generateProduct();
        products.push(generatedProduct);
      }
      return { code: 201, result: { status: "success", message: "Products added successfully", payload: products } };
    }
    catch (error) {
      return { code: 400, result: { status: "error", message: "Error adding products" } };
    }
  }
}
const mockingService = new MockingService();
export default mockingService;