const socket = io();

//GET PRODUCTS FROM BACKEND
socket.on('getProducts', ({payload}) => {
    const productList = document.querySelector('#productList');
    productList.innerHTML = '';
    for(const product of payload){
        const {_id, title, price, stock} = product;
        const productItem = document.createElement('li');
        productItem.textContent = `id: ${_id} name: ${title} - price: $${price} - stock: ${stock} - category: ${product.category}`;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        // EVENT BUTTON: DELETE PRODUCT FROM BACKEND
        deleteBtn.onclick = () => {
            socket.emit('deleteProduct', _id);
        }
        productItem.appendChild(deleteBtn);
        productList.appendChild(productItem);
    }
});

// ADD PRODUCT TO BACKEND
const form = document.querySelector('#addProductForm');
form.onsubmit = (e) => {
    e.preventDefault();
    const title = document.querySelector('#productTitle').value;
    const price = document.querySelector('#productPrice').value;
    const stock = document.querySelector('#productStock').value;
    const code = document.querySelector('#productCode').value;
    const category = document.querySelector('#productCategory').value;
    const product = {
        title,
        price,
        stock,
        code,
        category,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    }
    socket.emit('addProduct', product);
    form.reset();
}