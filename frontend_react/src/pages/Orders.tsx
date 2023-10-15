import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListAltIcon from "@mui/icons-material/ListAlt";
import {
  CardMedia,
  CircularProgress,
  Collapse,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import TitlePage from "../components/TitlePage";
import { UserContext } from "../components/UserContext";

type TicketsOpen = {
  [key: string]: boolean;
};

export default function Orders() {
  const { updateCurrentUser, currentUser, isLoading } = useContext(UserContext) as UserContextType;
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [ticketsOpen, setTicketsOpen] = useState<TicketsOpen>({});
  const [loadingTickets, setLoadingTickets] = useState(true);

  async function updateUserTickets() {
    if (!currentUser) return;
    const response = await fetch(`${import.meta.env.VITE_URL}/api/users/${currentUser?._id}/tickets`);
    const data = await response.json();
    setTickets(data.payload);
    tickets.forEach((ticket) => {
      ticketsOpen[ticket._id as string] = false;
    });
    setLoadingTickets(false);
  }

  useLayoutEffect(() => {
    updateCurrentUser();
    document.title = "Orders | Los Tres Primos";
  }, []);
  useEffect(() => {
    updateUserTickets();
  }, [currentUser]);

  const handleTicketsOpen = (ticketId: string) => {
    ticketsOpen[ticketId] = !ticketsOpen[ticketId];
    setTicketsOpen({ ...ticketsOpen });
  };

  if (isLoading || loadingTickets)
    return (
      <Stack height="50vh" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  return (
    <Container maxWidth="lg" sx={{ p: { xs: 2, sm: 3, md: 5 } }}>
      <TitlePage title="Orders" />
      <Stack justifyContent="center" alignItems="center" spacing={3}>
        <List
          sx={{ width: "100%", maxWidth: "90vw", bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              My Purchased Orders
            </ListSubheader>
          }
        >
          {tickets &&
            tickets.map((ticket) => {
              return (
                <>
                  <Tooltip title={ticket.purchase_datetime as string} followCursor>
                    <ListItemButton onClick={() => handleTicketsOpen(ticket._id as string)}>
                      <ListItemIcon>
                        <ListAltIcon />
                      </ListItemIcon>
                      <ListItemText primary={ticket._id as string} />
                      {ticketsOpen[ticket._id as string] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                  </Tooltip>
                  <Collapse in={ticketsOpen[ticket._id as string]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItem
                        secondaryAction={
                          <Typography variant="h6" fontWeight="bold" paddingRight={2}>
                            ${ticket.amount}
                            <Typography ml={1} color="whitesmoke" variant="caption" fontWeight="bold" component="span">
                              USD
                            </Typography>
                          </Typography>
                        }
                      >
                        <ListItemText primary="Total Paid:" />
                      </ListItem>
                      {ticket.products.map((product) => (
                        <ListItem key={product.idProduct._id}>
                          <ListItemIcon>
                            <CardMedia
                              component="img"
                              alt={product.idProduct.title}
                              sx={{ width: 50, height: 50 }}
                              image={
                                product.idProduct.thumbnail && product.idProduct.thumbnail.length > 0
                                  ? product.idProduct.thumbnail[0]
                                  : "/assets/img/product_sample.png"
                              }
                            />
                          </ListItemIcon>
                          <ListItemText primary={product.idProduct.title} sx={{ paddingLeft: 2 }} />
                        </ListItem>
                      ))}
                      <ListItem
                        secondaryAction={
                          <Typography variant="caption" paddingRight={2}>
                            {ticket.purchase_datetime as string}
                          </Typography>
                        }
                      >
                        <ListItemText primary="Purchase Date:" />
                      </ListItem>
                    </List>
                  </Collapse>
                </>
              );
            })}
        </List>
      </Stack>
    </Container>
  );
}
