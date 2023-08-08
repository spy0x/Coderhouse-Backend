export const generateProductErrorInfo = (product) => {
    return `There are missing or invalid property fields in the product received:
  List of properties:
  * title: needs to be a string. Received       : ${product.title}
  * description: needs to be a string. Received : ${product.description}
  * price: needs to be a number. Received       : ${product.price}
  * stock: needs to be a number. Received       : ${product.stock}
  * thumbnail: needs to be a string. Received   : ${product.thumbnail}
  * code: needs to be a string. Received        : ${product.code}`;
};
export const generateProductAlreadyExistsErrorInfo = (product) => {
    return `The product with code ${product.code} already exists.`;
};
export const geneateCartOwnershipError = (userCartId, cartId) => {
    return `This user owns the cart ${userCartId}. And does not match with request cart with id ${cartId}`;
};
