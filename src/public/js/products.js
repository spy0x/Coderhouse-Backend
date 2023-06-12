const cartText = document.querySelector("#cart-id");
const cartID = localStorage.getItem("cartID");
if (!cartID) {
  createCart();
} else {
  setCart(cartID);
}

function setCart(id) {
  cartText.innerHTML = id;
  cartText.setAttribute("href", `/carts/${id}`)
}
function createCart() {
  fetch("/api/carts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })
    .then((response) => response.json())
    .then((result) => {
      localStorage.setItem("cartID", result.payload._id);
      setCart(result.payload._id);
    });
}

const products = document.querySelectorAll("li a");
products.forEach((product) => {
  product.addEventListener("click", (event) => {
    event.preventDefault();
    const loadingAlert = Swal.fire({
      title: 'Loading...',
      allowOutsideClick: false,
      showConfirmButton: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });
    const cartID = localStorage.getItem("cartID");
    const productID = product.getAttribute("id");
    fetch(`/api/carts/${cartID}/product/${productID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((result) => {
        loadingAlert.close();
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Product added to cart!',
          showCancelButton: true,
          confirmButtonText: 'View Cart',
          cancelButtonText: 'Close',
        }).then(result => {
          if (result.isConfirmed) {
            // Redirect to the cart URL
            window.location.href = `/carts/${cartID}`;
          }
        });
        console.log(result); // TODO delete this line in production
      })
      .catch((error) => {
        loadingAlert.close();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        console.log(error); // TODO delete this line in production
      });
  });
});
