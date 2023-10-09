import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogOutButton from "./LogOutButton";
import { Badge } from "@mui/material";
import { motion } from "framer-motion";

const pages: Page[] = [
  { name: "Home", url: "/" },
  { name: "Products", url: "/products" },
];

export default function Navbar() {
  const { currentUser } = useContext(UserContext) as UserContextType;
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <motion.div style={{ display: "flex" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <ViewInArIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Link to="/" style={{ textDecoration: "none" }}>
                LTP Market
              </Link>
            </Typography>
          </motion.div>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link to={page.url}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
              {currentUser?.role == "admin" && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link to={"/users"}>
                    <Typography textAlign="center">Users Manager</Typography>
                  </Link>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <ViewInArIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          </motion.div>
          <motion.div
            style={{ flexGrow: 1 }}
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontSize: { xs: 14, sm: 20 },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Link to="/" style={{ textDecoration: "none" }}>
                LTP Market
              </Link>
            </Typography>
          </motion.div>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <motion.div key={page.name} whileHover={{ scale: 1.2 }}>
                <Link to={page.url}>
                  <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
                    {page.name}
                  </Button>
                </Link>
              </motion.div>
            ))}
            {currentUser?.role == "admin" && (
              <motion.div whileHover={{ scale: 1.2 }}>
                <Link to={"/users"}>
                  <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
                    Users Manager
                  </Button>
                </Link>
              </motion.div>
            )}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {currentUser && (
              <Tooltip title="View Cart">
                <Link to={`/carts/${currentUser.cartId._id}`}>
                  <Badge badgeContent={currentUser.cartId.productos.length} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </Link>
              </Tooltip>
            )}
            <Tooltip title="User Settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 2 }}>
                <Avatar
                  alt={currentUser ? currentUser.first_name : "User Settings"}
                  src={currentUser ? "/static/images/avatar/2.jpg" : ""}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {currentUser
                ? [
                    <Link key="profile" to="/">
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">Profile</Typography>
                      </MenuItem>
                    </Link>,
                    <Box px={2} py={1}>
                      <LogOutButton key="logout" />
                    </Box>,
                  ]
                : [
                    <Link key="login" to="/?login=true">
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">Login</Typography>
                      </MenuItem>
                    </Link>,
                    <Link key="register" to="/?register=true">
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">Register</Typography>
                      </MenuItem>
                    </Link>,
                  ]}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
