import { useContext, useLayoutEffect, useState } from "react";
import { UserContext } from "../components/UserContext";
import {
  Avatar,
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import PurchaseButton from "../components/PurchaseButton";
import Loading from "../components/Loading";
import TitlePage from "../components/TitlePage";

export default function Cart() {
  const { updateCurrentUser, currentUser, isLoading } = useContext(UserContext) as UserContextType;
  const [loadingPurchase, setLoadingPurchase] = useState(false);
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
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <InventoryIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={product.idProduct.title} secondary={product.idProduct.category} />
                    <Typography mx={4}>x{product.quantity}</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      ${product.idProduct.price * product.quantity}
                    </Typography>
                  </ListItem>
                ))}
              </List>
              <Typography variant="overline" fontWeight="bold" display="block" marginLeft="auto" align="right">
                Total: ${currentUser?.cartId.productos.reduce((acc, value) => acc + value.quantity * value.idProduct.price, 0)}
              </Typography>
            </>
          )}
        </Paper>
        <PurchaseButton currentUser={currentUser as User} setLoading={setLoadingPurchase} />
      </Stack>
      <Loading loading={loadingPurchase} />
    </Container>
  );
}