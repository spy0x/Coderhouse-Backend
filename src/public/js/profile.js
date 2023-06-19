const logoutBtn = document.getElementById("logout-btn");

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
      localStorage.removeItem("cartID");
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