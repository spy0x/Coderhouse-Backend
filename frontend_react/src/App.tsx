import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: "Roboto,sans-serif",
    },
    palette: {
      mode: "dark",
      background: {
        default: "#121212",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
