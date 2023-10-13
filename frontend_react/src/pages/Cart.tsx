import ViewInArIcon from "@mui/icons-material/ViewInAr";
import {
  Alert,
  Avatar,
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useContext, useLayoutEffect, useState } from "react";
import Loading from "../components/Loading";
import PurchaseButton from "../components/PurchaseButton";
import TitlePage from "../components/TitlePage";
import { UserContext } from "../components/UserContext";
import ClearCartButton from "../components/ClearCartButton";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

export default function Cart() {
  const { updateCurrentUser, currentUser, isLoading } = useContext(UserContext) as UserContextType;
  const [loadingPurchase, setLoadingPurchase] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  useLayoutEffect(() => {
    updateCurrentUser();
    document.title = "Cart | Los Tres Primos";
  }, []);
  if (isLoading)
    return (
      <Stack height="50vh" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );

  const handleSnackClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };
  const handleDeleteBtn = async (productId: Product) => {
    setLoadingPurchase(true);
    const response = await fetch(`${import.meta.env.VITE_URL}/api/carts/${currentUser?.cartId._id}/product/${productId._id}`, {
      method: "DELETE",
    });
    setLoadingPurchase(false);
    if (response.ok) {
      setSnackMessage("Product deleted successfully");
      setSnackOpen(true);
      updateCurrentUser();
    }
  };
  return (
    <Container maxWidth="lg" sx={{ p: 5 }}>
      <TitlePage title="Cart" />
      <Stack justifyContent="center" alignItems="center" p={3} spacing={3}>
        <Paper sx={{ p: 3 }}>
          {currentUser?.cartId.productos.length === 0 ? (
            <Typography align="center" variant="h6">
              Your cart is empty.
            </Typography>
          ) : (
            <>
              <List>
                {currentUser?.cartId.productos.map((product) => (
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteBtn(product.idProduct)}>
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <ViewInArIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={product.idProduct.title} secondary={product.idProduct.category} />
                    <Typography variant="body2" fontWeight="bold" paddingLeft={15} paddingRight={5} align="right">
                      ${product.idProduct.price}
                    </Typography>
                  </ListItem>
                ))}
              </List>
              <Typography variant="h5" fontWeight="bold" display="block" marginLeft="5" align="right">
                Total: ${currentUser?.cartId.productos.reduce((acc, value) => acc + value.idProduct.price, 0).toFixed(2)}
                <Typography ml={1} color="whitesmoke" variant="caption" fontWeight="bold" component="span">
                  USD
                </Typography>
              </Typography>
            </>
          )}
        </Paper>
        <PurchaseButton currentUser={currentUser as User} setLoading={setLoadingPurchase} />
        <ClearCartButton
          currentUser={currentUser as User}
          setLoading={setLoadingPurchase}
          setSnackOpen={setSnackOpen}
          setSnackMessage={setSnackMessage}
        />
      </Stack>
      <Loading loading={loadingPurchase} />
      <Snackbar
        open={snackOpen}
        autoHideDuration={5000}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleSnackClose} severity="success" sx={{ width: "100%" }}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
