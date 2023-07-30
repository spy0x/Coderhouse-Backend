const form = document.querySelector("form");

form.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData.entries());
  if (formValues.password !== formValues.password2) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Password does not match",
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
  fetch("/api/sessions/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValues),
  })
    .then(() => {
      loadingAlert.close();
      form.reset();
      Swal.fire({
        icon: "success",
        timer: 2500,
        title: "Redirecting to Login Page...",
        text: "User created!",
        allowOutsideClick: false,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          // Redirect to Login Page.
          window.location.href = "/?login=true";
        },
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
};
