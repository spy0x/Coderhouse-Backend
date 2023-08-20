import { Container, Stack, Typography, Box, Paper } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import LogOutButton from "./LogOutButton";

export default function Profile() {
  const {currentUser: user} = useContext(UserContext) as UserContextType;
  return (
    <Container>
      <Typography align="center" variant="h1">
        Profile
      </Typography>
        <Paper sx={{ p: 5, maxWidth: 550, width: '100%', borderRadius: 4, mx: 'auto' }}>
          <Box>
            <Typography variant="h6">Email: { user ? user.email : ""}</Typography>
            <Typography variant="h6">Fullname: {user ? user.first_name : ""} {user ? user.last_name : ""}</Typography>
            <Typography variant="h6">Age: {user? user.age : ""}</Typography>
            <Typography variant="h6">Role: {user? user.role : ""} </Typography>
          </Box>
          <Stack justifyContent='center' alignItems='end'>
          <LogOutButton />
          </Stack>
        </Paper>

    </Container>
  );
}
