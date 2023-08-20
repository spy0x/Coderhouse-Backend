import { Container, Typography, Stack, Box, CircularProgress } from "@mui/material";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import Profile from "../components/Profile";
import { UserContext } from "../components/UserContext";

export default function Home() {
  const { currentUser, isLoading } = useContext(UserContext) as UserContextType;
  const urlParams = new URLSearchParams(useLocation().search);
  const login = urlParams.get("login");
  const register = urlParams.get("register");

  if (isLoading)
    return (
      <Stack height="50vh" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  if (currentUser) {
    document.title = "Profile | Los Tres Primos";
    return <Profile />;
  }
  if (login && !currentUser) {
    document.title = "Login | Los Tres Primos";
    return <Login />;
  }
  if (register && !currentUser) {
    document.title = "Register | Los Tres Primos";
    return <Register />;
  }
  document.title = "Los Tres Primos 3D Market";
  return (
    <Container>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Box>
          <Typography align="center" variant="h1">
            Welcome, Guest!
          </Typography>
          <Typography align="center" variant="h6">
            <span className="font-bold text-red-500">
              <Link to="/?login=true">Sign in</Link>{" "}
            </span>
            or Register{" "}
            <Link to="/?register=true" className="font-bold text-red-500">
              here
            </Link>
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
}
