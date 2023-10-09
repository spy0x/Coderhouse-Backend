import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { UserContext } from "./UserContext";
import Loading from "./Loading";
import { Box, Button } from "@mui/material";

export default function LogOutButton() {
  const { setCurrentUser } = useContext(UserContext) as UserContextType;
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_URL;
      const response = await fetch(`${apiUrl}/api/users/logout`);
      setLoading(false);
      setCurrentUser(undefined);
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
      <Button variant='contained' onClick={handleLogout}>Logout</Button>
      <Loading loading={loading} />
    </Box>
  );
}
