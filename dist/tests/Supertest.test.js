import chai from "chai";
import supertest from "supertest";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
import { generateProduct } from "../utils/faker.js";
dotenv.config();
const expect = chai.expect;
const requester = supertest(`http://localhost:${process.env.PORT}`);
describe("Testing LTP Market", () => {
    let cart;
    let cookie;
    let product;
    let user;
    describe("Testing Sessions", () => {
        it("Login as admin", async () => {
            const admin = { email: process.env.ADMIN_MAIL, password: process.env.ADMIN_PASS };
            const response = await requester.post("/api/sessions/login").type("form").send(admin);
            user = response.body.payload;
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property("status").be.equal("success");
            const cookieResult = response.header["set-cookie"][0];
            cookie = {
                name: cookieResult.split("=")[0],
                value: cookieResult.split("=")[1],
            };
            expect(cookie.name).to.be.ok.and.equal("connect.sid");
            expect(cookie.value).to.be.ok;
        });
        it("Create a new user", async () => {
            const newUser = {
                first_name: faker.person.firstName(),
                password: "test",
                email: faker.internet.email(),
            };
            const response = await requester.post("/api/sessions/register").send(newUser);
            expect(response.status).to.equal(201);
            expect(response.body).to.have.property("status").be.equal("success");
        });
        it("Get current user", async () => {
            const response = await requester.get("/api/sessions/current").set("Cookie", [`${cookie.name}=${cookie.value}`]);
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property("status").be.equal("success");
        });
    });
    describe("Testing Carts", () => {
        it("Create a new cart", async () => {
            const response = await requester.post("/api/carts");
            cart = response.body.payload;
            expect(response.status).to.equal(201);
            expect(response.body).to.have.property("status").be.equal("success");
        });
        it("Get products from cart. Should return 404 because of empty cart!", async () => {
            const response = await requester.get(`/api/carts/${user.cartId}`).set("Cookie", [`${cookie.name}=${cookie.value}`]);
            expect(response.status).to.equal(404);
            expect(response.body).to.have.property("status").be.equal("error");
        });
        it('Clear products from cart', async () => {
            const response = await requester.delete(`/api/carts/${user.cartId}`).set("Cookie", [`${cookie.name}=${cookie.value}`]);
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property("status").be.equal("success");
            expect(response.body.payload.productos).to.be.empty;
        });
    });
    describe("Testing Products", () => {
        it("Create a new product", async () => {
            const newProduct = generateProduct();
            const response = await requester
                .post("/api/products")
                .set("Cookie", [`${cookie.name}=${cookie.value}`])
                .send(newProduct);
            product = response.body.payload;
            expect(response.status).to.equal(201);
            expect(response.body).to.have.property("status").be.equal("success");
        });
        it("Get a product by id", async () => {
            const response = await requester.get(`/api/products/${product._id}`);
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property("status").be.equal("success");
        });
        it("Delete a product", async () => {
            const response = await requester.delete(`/api/products/${product._id}`).set("Cookie", [`${cookie.name}=${cookie.value}`]);
            expect(response.status).to.equal(204);
        });
    });
});
