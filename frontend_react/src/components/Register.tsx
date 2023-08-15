import { Backdrop, Button, CircularProgress, Container, Stack, TextField, Typography } from "@mui/material";
import React, { FormEvent, useRef, useState } from "react";
import Swal from "sweetalert2";

export default function Register() {
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [age, setAge] = useState(18);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      if (password !== confirmPassword) return;
      const formData: UserForm = { first_name, last_name, age, email, password };
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/sessions/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setLoading(false);
      if (data.status == "success") {
        formRef.current?.reset();
        Swal.fire({
          icon: "success",
          timer: 2500,
          title: "Redirecting to Login Page...",
          text: "User created!",
          allowOutsideClick: false,
          timerProgressBar: true,
          customClass: {
            popup: "swal-background", // Apply your custom class here
          },
          didOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            // Redirect to Login Page.
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
    } catch {
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
    <Container>
      <form ref={formRef} onSubmit={handleSubmit}>
        <Stack justifyContent="center" alignItems="center" p={3} spacing={3}>
          <Typography align="center" variant="h1">
            Register
          </Typography>
          <TextField
            value={first_name}
            onChange={(event) => setFirstName(event.target.value)}
            required
            id="first_name-field"
            label="Firstname"
            variant="outlined"
          />
          <TextField
            value={last_name}
            onChange={(event) => setLastName(event.target.value)}
            required
            id="last_name-field"
            label="Lastname"
            variant="outlined"
          />
          <TextField
            value={age}
            onChange={(event) => setAge(parseInt(event.target.value))}
            required
            id="age-field"
            label="Age"
            variant="outlined"
            type="number"
            inputProps={{
              min: 18, // Minimum value
              max: 100, // Maximum value
            }}
          />
          <TextField
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            id="user-field"
            label="Email"
            variant="outlined"
            type="email"
          />
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
          <Button type="submit" variant="outlined">
            Register
          </Button>
        </Stack>
      </form>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}
