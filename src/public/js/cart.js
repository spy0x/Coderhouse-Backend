const buyButton = document.querySelector("#buy-button");
SetCartID();

async function SetCartID() {
  try {
    if (!buyButton) return;
    const result = await fetch("/api/sessions/cart");
    const data = await result.json();
    if (!data.payload) return;
    const cartID = data.payload;
    setButton(cartID);
  } catch (error) {
    console.log("Couldn't get cart ID");
  }
}

function setButton(cartID) {
  buyButton.onclick = (e) => {
    const loadingAlert = Swal.fire({
      title: "Loading...",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    fetch(`/api/carts/${cartID}/purchase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "nostock" || result.status === "empty") {
          loadingAlert.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: result.message,
          });
        } else if (result.status === "success") {
          loadingAlert.close();
          Swal.fire({
            icon: "success",
            timer: 2500,
            title: "Redirecting to Products Page...",
            text: "Purchase successful!",
            allowOutsideClick: false,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
            },
            willClose: () => {
              // Redirect to another URL after the specified time
              window.location.href = "/products";
            },
          });
        } else {
          loadingAlert.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Couldn't purchase items. Try again later!",
          });
        }
      })
      .catch((error) => {
        loadingAlert.close();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };
}
