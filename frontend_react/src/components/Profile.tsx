import { Container, Stack, Typography, Box, Paper } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "./Contexts";
import LogOutButton from "./LogOutButton";

export default function Profile() {
  const user = useContext(UserContext) as User;
  return (
    <Container>
      <Typography align="center" variant="h1">
        Profile
      </Typography>
      <Stack justifyContent="center" alignItems="center">
        <Paper sx={{ p: 5, maxWidth: 550, width: '100%', borderRadius: 4 }}>
          <Box>
            <Typography variant="h6">Email: { user ? user.email : ""}</Typography>
            <Typography variant="h6">Fullname: {user ? user.first_name : ""} {user ? user.last_name : ""}</Typography>
            <Typography variant="h6">Age: {user? user.age : ""}</Typography>
            <Typography variant="h6">Role: {user? user.role : ""} </Typography>
          </Box>
          <LogOutButton />
        </Paper>
      </Stack>
    </Container>
  );
}
