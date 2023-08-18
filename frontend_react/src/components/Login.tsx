import { Container, Stack, Typography, TextField, Button, Backdrop, CircularProgress } from "@mui/material";
import { FormEvent, useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import Swal from "sweetalert2";



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_URL;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = { email, password };
    setLoading(true);
    fetch(`${apiUrl}/api/sessions/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.status == "success") {
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
            customClass: {
              popup: "swal-background", // Apply your custom class here
            },
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid username or password",
            customClass: {
              popup: "swal-background", // Apply your custom class here
            },
          });
        }
      })
      .catch(() => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          customClass: {
            popup: "swal-background", // Apply your custom class here
          },
        });
      });
  };
  const handleGithubLogin = () => {
    setLoading(true);
    window.location.href = `${apiUrl}/api/sessions/github`;
  };
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Stack justifyContent="center" alignItems="center" p={3} spacing={3}>
          <Typography align="center" variant="h1">
            Login
          </Typography>
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
          <Button type="submit" variant="contained">
            Login
          </Button>
          <Button startIcon={<GitHubIcon />} color="error" variant="contained" onClick={handleGithubLogin}>
            Login with GitHub
          </Button>
        </Stack>
      </form>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}
