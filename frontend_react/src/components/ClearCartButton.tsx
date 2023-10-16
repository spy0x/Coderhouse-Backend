import { Button } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../components/UserContext";

type ClearCartButtonPropsType = {
  currentUser: User;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSnackOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSnackMessage: React.Dispatch<React.SetStateAction<string>>;
};

export default function ClearCartButton({ currentUser, setLoading, setSnackOpen, setSnackMessage }: ClearCartButtonPropsType) {
  const { updateCurrentUser } = useContext(UserContext) as UserContextType;

  const handleClear = () => {
    if (currentUser.cartId.productos.length === 0) return;
    setLoading(true);
    fetch(`${import.meta.env.VITE_URL}/api/carts/${currentUser.cartId._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        if (result.status === "success") {
          updateCurrentUser();
          setSnackMessage("Cart cleared successfully");
          setSnackOpen(true);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <Button size="small" variant="outlined" color="warning" onClick={handleClear}>
      Clear Cart
    </Button>
  );
}
