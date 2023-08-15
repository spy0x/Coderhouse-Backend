import { Container, Typography, Stack, Box } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import Profile from "../components/Profile";
import { UserContext } from "../components/Contexts";

export default function Home() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const urlParams = new URLSearchParams(useLocation().search);
  const login = urlParams.get("login");
  const register = urlParams.get("register");

  const getCurrentUser = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/sessions/current");
      const data = await response.json();
      if (response.status == 200) setCurrentUser(data.payload);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  useLayoutEffect(() => {
    getCurrentUser();
  }, []);
  if (currentUser) {
    document.title = "Profile | Los Tres Primos";
    return (
      <UserContext.Provider value={currentUser}>
        <Profile />
      </UserContext.Provider>
    );
  }
  if (login && !currentUser) {
    document.title = "Login | Los Tres Primos";
    return <Login />;
  }
  if (register && !currentUser) {
    document.title = "Register | Los Tres Primos";
    return <Register />;
  }
  return (
    <Container>
      <Stack direction="row" justifyContent="center" alignItems="center">
        {currentUser ? (
          <>Logged!</>
        ) : (
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
        )}
      </Stack>
    </Container>
  );
}
