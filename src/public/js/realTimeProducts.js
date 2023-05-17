const socket = io();
// socket.emit('getProducts', 'Hello Server!');
socket.on('getProducts', ({payload}) => {
    const productList = document.querySelector('#productList');
    for(const product of payload){
        const {title, price, stock} = product;
        const productItem = document.createElement('li');
        productItem.textContent = `name: ${title} - price: $${price} - stock: ${stock}`;
        productList.appendChild(productItem);
    }
});