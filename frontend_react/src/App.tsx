import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          input: {
            "&:-webkit-autofill": {
              "-webkit-box-shadow": "0 0 0 50px rgba(0,0,0,1) inset",
              "-webkit-text-fill-color": "primary",
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
        default: '#121212',
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
