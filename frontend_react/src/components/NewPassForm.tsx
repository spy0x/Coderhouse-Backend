import { Button, Stack, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import Swal from "sweetalert2";

type NewPassFormProps = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  code: string;
};

export default function NewPassForm({ setLoading, code }: NewPassFormProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePass = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (password !== confirmPassword) return;
      setLoading(true);
      const apiUrl = import.meta.env.VITE_URL;
      const formData = { code, password };
      const response = await fetch(`${apiUrl}/api/sessions/recovery`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setLoading(false);
      if (response.status == 200) {
        Swal.fire({
          icon: "success",
          timer: 2500,
          title: "Redirecting to Login Page...",
          text: "Password changed succesfully!",
          allowOutsideClick: false,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            // Redirect to another URL after the specified time
            window.location.href = "/?login=true";
          },
          customClass: {
            popup: "swal-background", // Apply your custom class here
          },
        });
      } else if (response.status == 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You can't use the same previous password!",
          customClass: {
            popup: "swal-background", // Apply your custom class here
          },
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong.",
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
        text: "Something went wrong. Try again later.",
        customClass: {
          popup: "swal-background", // Apply your custom class here
        },
      });
    }
  };
  return (
    <form onSubmit={handleChangePass}>
      <Stack justifyContent="center" alignItems="center" p={3} spacing={3}>
        <TextField
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          id="password-field"
          label="Password"
          type="password"
        />
        <TextField
          error={password !== confirmPassword}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
          id="confirm-password-field"
          label="Confirm Password"
          type="password"
          helperText={password !== confirmPassword ? "Passwords do not match" : ""}
        />
        <Button type="submit" variant="contained">
          Change Password
        </Button>
      </Stack>
    </form>
  );
}
