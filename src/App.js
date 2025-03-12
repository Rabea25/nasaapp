import ApodPage from "./pages/ApodPage.js";
import NeoPage from "./pages/NeoPage.js";
import EpicPage from "./pages/EpicPage.js";
import Home from "./pages/Home.js";
import MarsRoverPage from "./pages/MarsRoverPage.js";
import NavBar from "./components/NavBar.js";
import SearchPage from "./pages/SearchPage.js";
import FavouritesPage from './pages/FavouritesPage.js'
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css"

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="app">
      <Router>
        <NavBar />
        <div className="content">
        <Routes>
          <Route path="/" element={<Navigate to='/home' />} />
          <Route path="/home" element={<Home />} />
          <Route path="/apod" element={<ApodPage />} />
          <Route path="/neo" element={<NeoPage />} />
          <Route path="/epic" element={<EpicPage />} />
          <Route path="/marsrover" element={<MarsRoverPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="favourites" element={<FavouritesPage/>} />
        </Routes>
        </div>
      </Router>
    </div>
    </ThemeProvider>
  );
}

export default App;
