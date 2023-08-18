import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";

export default function LogOutButton() {
  const [loading, setLoading] = useState(false);
  
  const handleLogout = async () => {
    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_URL;
      const response = await fetch(`${apiUrl}/api/sessions/logout`);
      const data = await response.json();
      console.log(data);
      setLoading(false);
      if (response.status == 200) {
        Swal.fire({
          icon: "success",
          title: "Redirecting to login page...",
          timer: 2500,
          allowOutsideClick: false,
          timerProgressBar: true,
          text: "You have been logged out!",
          customClass: {
            popup: "swal-background", // Apply your custom class here
          },
          didOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            // Redirect to Login Page
            window.location.href = "/?login=true";
          },
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          customClass: {
            popup: "swal-background", // Apply your custom class here
          },
        });
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        customClass: {
          popup: "swal-background", // Apply your custom class here
        },
      });
    }
  };
  return (
    <Box>
      <Button onClick={handleLogout}>Logout</Button>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}
