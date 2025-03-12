import React from "react";
import { Link } from "react-router-dom";
import {AppBar,  Toolbar,  Typography,  Box,  Button} from "@mui/material";
import nasalogo from "../assets/nasa-seeklogo.png";
import {Star} from 'lucide-react'
import '../styles/Star.css'
import '../styles/NavBar.css'
import SearchBar from "./SearchBar";

export default function NavBar() {
    
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <AppBar position="static" id='appBar'>
          <Toolbar id='toolbar'>
            <img src={nasalogo} alt="NASA logo" style={{ height: 35}} />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { sm: "none",  md: "block" } }}
            >
              API Explorer
            </Typography>
            
            <Button className="navb" color="inherit" component={Link} to="/home">
              Home
            </Button>
            <Button className="navb" color="inherit" component={Link} to="/apod">
              Apod
            </Button>
            <Button className="navb" color="inherit" component={Link} to="/epic">
              EPIC
            </Button>
            <Button className="navb" color="inherit" component={Link} to="/neo">
              NEO
            </Button>
            <Button className="navb" color="inherit" component={Link} to="/marsrover">
              Mars Rover
            </Button>
            <SearchBar />
            <Link to='favourites' className="star">
              <Star />
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
