const loginForm = document.querySelector("form");
loginForm.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(loginForm);
  const formValues = Object.fromEntries(formData.entries());
  const loadingAlert = Swal.fire({
    title: "Loading...",
    allowOutsideClick: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
  fetch("/api/sessions/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValues),
  })
    .then((response) => response.json())
    .then((result) => {
      loadingAlert.close();
      loginForm.reset();
      if (result.status === "success") {
        Swal.fire({
          icon: "success",
          timer: 2500,
          title: "Redirecting to Products Page...",
          text: "Login successful!",
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
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid username or password",
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
