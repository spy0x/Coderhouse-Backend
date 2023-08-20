import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import UserProvider from "./components/UserContext";
import Cart from "./pages/Cart";
import Products from "./pages/Products";
import Error from "./pages/Error";

function App() {
  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          input: {
            "&:-webkit-autofill": {
              "WebkitBoxShadow": "0 0 0 50px rgba(0,0,0,1) inset",
              "WebkitTextFillColor": "primary",
            },
          },
        },
      },
    },
    typography: {
      fontFamily: "Roboto,sans-serif",
    },
    palette: {
      mode: "dark",
      primary: {
        main: "#ffa500",
      },
      background: {
        default: "#121212",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/carts/:cid" element={<Cart />} />
            <Route path="/products" element={<Products />} />
            <Route path="*" element={<Error error={{status: "ERROR 404", message: "Page Not found"}}/>} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
