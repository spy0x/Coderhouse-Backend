import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import {
  Alert,
  Avatar,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar
} from "@mui/material";
import { useLayoutEffect, useState } from "react";
import Loading from "../components/Loading";
import TitlePage from "../components/TitlePage";

export default function Users() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  useLayoutEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    setLoading(true);
    const apiUrl = import.meta.env.VITE_URL;
    const response = await fetch(`${apiUrl}/api/users`);
    setLoading(false);
    const data = await response.json();
    setUsers(data.payload);
  };

  const handleChange = async (event: SelectChangeEvent, userId: string) => {
    await fetch(`${import.meta.env.VITE_URL}/api/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: event.target.value }),
    });
    getAllUsers();
    setSnackMessage("User Role updated successfully");
    setSnackOpen(true);
  };

  const handleSnackClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  const handleDeleteBtn = async (userId: string) => {
    await fetch(`${import.meta.env.VITE_URL}/api/users/${userId}`, {
      method: "DELETE",
    });
    getAllUsers();
    setSnackMessage("User deleted successfully");
    setSnackOpen(true);
  }

  return (
    <Container sx={{ p: 5 }}>
      <TitlePage title="Users Manager" />
      <List>
        {users.map((user) => (
          <ListItem
            key={user._id}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteBtn(user._id as string)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.email} secondary={`${user.first_name} ${user.last_name}`} />
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="role">Role</InputLabel>
              <Select
                labelId="role"
                id="demo-select-small"
                value={user.role}
                label="Role"
                onChange={(event: SelectChangeEvent) => handleChange(event, user._id as string)}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="premium">Premium</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
        ))}
      </List>
      <Snackbar open={snackOpen} autoHideDuration={5000} onClose={handleSnackClose} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
        <Alert onClose={handleSnackClose} severity="success" sx={{ width: "100%" }}>
          {snackMessage}
        </Alert>
      </Snackbar>
      <Loading loading={loading} />
    </Container>
  );
}
