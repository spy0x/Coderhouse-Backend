const logoutBtn = document.querySelector("#logout-btn");

SetCartID();

async function SetCartID() {
  try {
    const result = await fetch("/api/sessions/cart");
    const data = await result.json();
    const cartID = data.payload;
    setProductButtons(cartID);
  } catch (error) {
    console.log("Couldn't get cart ID");
  }
}

function setProductButtons(cartID) {
  const products = document.querySelectorAll("li a");
  products.forEach((product) => {
    product.addEventListener("click", (event) => {
      event.preventDefault();
      if (!cartID) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You must be logged in to add products to cart!",
          cancelButtonText: "Close",
        });
        return;
      }
      const loadingAlert = Swal.fire({
        title: "Loading...",
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const productID = product.getAttribute("id");
      fetch(`/api/carts/${cartID}/product/${productID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
        .then((result) => {
          loadingAlert.close();
          Swal.fire({
            icon: result.status == 202 ? "success" : "error",
            title: result.status == 202 ? "Success!" : "Oops...",
            text: result.status == 202 ? "Product added to cart!" : "Something went wrong!",
            showCancelButton: true,
            confirmButtonText: result.status == 202 ? "View Cart" : null,
            cancelButtonText: "Close",
          }).then((result) => {
            if (result.isConfirmed) {
              // Redirect to the cart URL
              window.location.href = `/carts/${cartID}`;
            }
          });
        })
        .catch((error) => {
          loadingAlert.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        });
    });
  });
}

if (logoutBtn) {
  logoutBtn.onclick = async () => {
    try {
      const loadingAlert = Swal.fire({
        title: "Loading...",
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      await fetch("/api/sessions/logout");
      loadingAlert.close();
      Swal.fire({
        icon: "success",
        title: "Redirecting to login page...",
        timer: 2500,
        allowOutsideClick: false,
        timerProgressBar: true,
        text: "You have been logged out!",
        didOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          // Redirect to Login Page
          window.location.href = "/?login=true";
        },
      });
    } catch (error) {
      loadingAlert.close();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };
}
