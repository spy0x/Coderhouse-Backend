import { Button, Stack, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import Swal from "sweetalert2";

type RecoveryFormProps = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function RecoveryForm({ setLoading }: RecoveryFormProps) {
  const [email, setEmail] = useState("");
  const handleSendRecovery = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      const apiUrl = import.meta.env.VITE_URL;
      const formData = { email };
      const response = await fetch(`${apiUrl}/api/sessions/recovery`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setLoading(false);
      if (response.status == 201) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Check your email to reset your password",
          customClass: {
            popup: "swal-background", // Apply your custom class here
          },
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong. Are you sure this is your email user?",
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
    <form onSubmit={handleSendRecovery}>
      <Stack justifyContent="center" alignItems="center" p={3} spacing={3}>
        <TextField
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          id="user-field"
          label="Email"
          variant="outlined"
          type="email"
        />
        <Button type="submit" variant="contained">
          Recover
        </Button>
      </Stack>
    </form>
  );
}
