import { __dirname } from "../utils.js";
import swaggerJsDoc from "swagger-jsdoc";
const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "LTP Market Documentation",
            description: "LTP Market API Documentation",
            version: "1.0.0",
        },
    },
    apis: [`${__dirname}/docs/**/*.yaml`],
};
const specs = swaggerJsDoc(swaggerOptions);
export default specs;
