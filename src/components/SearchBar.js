import React from "react";
import { alpha, styled, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const StyledInputBase2 = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "50ch",
    },
  },
}));

export default function SearchBar() {
  const [searchq, setSearchq] = React.useState("");
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchq);
    navigate(`/search?q=${searchq}`);
    setSearchq(""); // Clear the input field after submission

  }

  return (
    <div id="search-bar">
      <form onSubmit={handleSubmit}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search across all APIs"
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => setSearchq(e.target.value)}
            value={searchq}
          />
        </Search>
      </form>
    </div>
  );
}


export function BiggerSearchBar() {
  const [searchq, setSearchq] = React.useState("");
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchq);
    setSearchq(""); // Clear the input field after submission
    navigate(`/search?q=${searchq}`);
  }

  return (
    <div id="search-bar">
      <form onSubmit={handleSubmit}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase2
            placeholder="Search across all APIs"
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => setSearchq(e.target.value)}
          />
        </Search>
      </form>
    </div>
  );
}
