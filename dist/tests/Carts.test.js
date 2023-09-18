import chai from "chai";
import supertest from "supertest";
import Assert from "assert";
import dotenv from "dotenv";
dotenv.config();
const expect = chai.expect;
const requester = supertest(`http://localhost:${process.env.PORT}`);
const assert = Assert.strict;
describe("Testing LTP Market", () => {
    let cart;
    describe("Testing Carts", () => {
        it("Create a new cart", async () => {
            const response = await requester.post("/api/carts");
            cart = response;
            expect(response.status).to.equal(201);
            expect(response.body).to.have.property("status").be.equal("success");
        });
    });
});
