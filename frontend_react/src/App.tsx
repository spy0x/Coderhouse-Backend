import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import UserProvider from "./components/UserContext";
import "./fonts.css";
import Cart from "./pages/Cart";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Recovery from "./pages/Recovery";

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
            <Route path="/recovery" element={<Recovery />} />
            <Route path="*" element={<Error error={{status: "ERROR 404", message: "Page Not found"}}/>} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
