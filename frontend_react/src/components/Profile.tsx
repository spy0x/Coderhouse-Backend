import { Container, Stack, Typography, Box, Paper } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import LogOutButton from "./LogOutButton";
import TitlePage from "./TitlePage";

export default function Profile() {
  const { currentUser: user } = useContext(UserContext) as UserContextType;
  return (
    <Container sx={{ p: 5 }}>
      <TitlePage title="Profile" />
      <Paper sx={{ p: 5, maxWidth: 550, width: "100%", borderRadius: 4, mx: "auto", border: "solid 1px rgba(255, 165, 0, 0.2)", mt: 3 }}>
        <Box>
          <Typography variant="h6">Email: {user ? user.email : ""}</Typography>
          <Typography variant="h6">
            Fullname: {user ? user.first_name : ""} {user ? user.last_name : ""}
          </Typography>
          <Typography variant="h6">Age: {user ? user.age : ""}</Typography>
          <Typography variant="h6">Role: {user ? user.role : ""} </Typography>
        </Box>
        <Stack justifyContent="center" alignItems="end">
          <LogOutButton />
        </Stack>
      </Paper>
    </Container>
  );
}
