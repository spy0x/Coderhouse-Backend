import { faker } from "@faker-js/faker";
export const generateProduct = () => {
    const product = {
        title: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        description: faker.commerce.productDescription(),
        thumbnail: [faker.image.url()],
        code: faker.string.uuid(),
        stock: faker.number.int({ min: 1, max: 100 }),
        category: faker.commerce.department(),
    };
    return product;
};
