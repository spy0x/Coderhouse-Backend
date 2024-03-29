import { Container, Stack, TextField, Button, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import Swal from "sweetalert2";
import Loading from "./Loading";
import TitlePage from "./TitlePage";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_URL;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = { email, password };
    setLoading(true);
    fetch(`${apiUrl}/api/users/login`, {
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
    window.location.href = `${apiUrl}/api/users/github`;
  };
  return (
    <Container sx={{ p: 5 }}>
      <TitlePage title="Login" />
      <form onSubmit={handleSubmit}>
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
      <Typography mt={5} display='block' m='auto' fontSize={"1.5rem"} align="center" variant="caption">
        Did you forget your password?
        <span className="font-bold text-red-500 hover:text-orange-500">
          <Link to="/recovery"> Click here</Link>{" "}
        </span>
      </Typography>
      <Loading loading={loading} />
    </Container>
  );
}
