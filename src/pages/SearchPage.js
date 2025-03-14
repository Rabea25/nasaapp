import React from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Search from "../components/Search";
import "../styles/Search.css";
import { useState, useEffect } from "react";
import { BiggerSearchBar } from "../components/SearchBar";

export default function SearchPage() {
  const query = new URLSearchParams(useLocation().search).get("q");

  return (
    <Box id="search-page">
      <Box id="bigger-header-search">
        <Box id="header-search">
          <BiggerSearchBar />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "5px",
        }}
      >
        {query && (
          <Typography
            variant="h5"
            sx={{ color: "rgb(180, 200, 220)", marginBottom: "5px" }}
            fontWeight="bold"
            textAlign={"center"}
          >
            {" "}
            Search Results for "{query}"{" "}
          </Typography>
        )}
      </Box>
      {query && <Search query={query}/>}
    </Box>
  );
}
