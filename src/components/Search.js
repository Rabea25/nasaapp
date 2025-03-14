import React, { useEffect, useState} from "react";
import axios from "axios";
import { Box, Button, Typography, IconButton, Tooltip } from "@mui/material";
import UseLocalStorage from "./LocalStorage";
import "../styles/Search.css";
import { Star } from "lucide-react";

export default function Search({ query }) {
  const [searchResults, setSearchResults] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const [err, setErr] = useState(null);
  const [page, setPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [cur, setCur] = useState(-1);

  const [favourites, setFavourites] = UseLocalStorage("favourites", []);
  const [isFav, setIsFav] = useState([]);

  const handleFavourite = (index) => {
    const favObj = {
      img: searchResults[index + rangeBegin].links[0].href,
      info: `From NASA's search API, ${query}, page ${currentPage+1}`,
    };
    if (isFav[index + rangeBegin]) {
      setFavourites(favourites.filter((fav) => fav.img !== favObj.img));
    } else {
      setFavourites([...favourites, favObj]);
    }
    const newIsFav = [...isFav];
    newIsFav[index + rangeBegin] = !newIsFav[index + rangeBegin];
    setIsFav(newIsFav);
  };

  useEffect(() => {
    setCurrentPage(page * 5);
    setLoaded(false);
    setErr(null);
    setSearchResults([]);
    let url = `https://images-api.nasa.gov/search?q=${query}`;
    if (page) url += `&page=${page}`;
    axios
      .get(url)
      .then((response) => {
        setSearchResults(response.data.collection.items);
        setLoaded(true);
        console.log(response.data);
        setTotalPages(
          Math.ceil(response.data.collection.metadata.total_hits / 100.0)
        );
      })
      .catch((error) => {
        setErr(error);
        setLoaded(true);
      });
  }, [query, page]);

  useEffect(() => {
    if (currentPage % 5 === 0) setPage(Math.ceil(currentPage / 5));
  }, [currentPage]); //get 100 items, display 20 by 20 then move onto next request ya get me

  const rangeBegin = (currentPage % 5) * 20;
  const rangeEnd = rangeBegin + 20;
  const currentResults = searchResults.slice(rangeBegin, rangeEnd);

  useEffect(() => {
    if (searchResults.length > 0) {
      const newIsFav = searchResults.map((item) =>
        favourites.some((fav) => fav.img === item.links[0].href)
      );
      setIsFav(newIsFav);
    }
  }, [searchResults, favourites]);

  return (
    <Box className="results-container">
      {loaded ? (
        <>
          <Box className="search-grid">
            {currentResults.map((item, index) => (
              <Box
                key={index}
                className="search-item"
                onClick={() => setCur(index)}
              >
                <Tooltip title={item.data[0].description || ""} arrow placement="bottom"> 
                <Box
                  component="img"
                  src={item.links[0].href}
                  alt={item.data[0].title}
                  className="search-image"
                />
                </Tooltip>
                <IconButton
                  className={`fav-icon ${isFav[index] ? "active" : ""}`}
                  onClick={(e) => {handleFavourite(index); e.stopPropagation();}}
                >
                  <Star />
                </IconButton>
              </Box>
            ))}
          </Box>
          {totalPages > 1 && (
            <Box id="page-control">
              <Button
                variant="contained"
                onClick={() => {
                  setCurrentPage(currentPage - 1);
                  window.scrollTo(0, 0);
                }}
                disabled={currentPage === 0}
                hidden={currentPage === 0}
              >
                Prev
              </Button>
              <Typography sx={{ mx: 2, color: "white" }}>
                Page {currentPage + 1} of {totalPages}
              </Typography>
              <Button
                variant="contained"
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                  window.scrollTo(0, 0);
                }}
                disabled={currentPage === totalPages}
                hidden={currentPage === totalPages}
              >
                Next
              </Button>
            </Box>
          )}
          {cur !== -1 && (
            <Box className="image-modal" onClick={() => setCur(-1)}>
              <Box className="modal-content">
                <Box
                  component="img"
                  onClick={(e) => e.stopPropagation()}
                  src={currentResults[cur].links[0].href}
                  alt={currentResults[cur].data[0].title}
                  className="enlarged-image"
                />
                <Typography className="image-title">
                  {currentResults[cur]?.data[0]?.description ||
                    "No description available"}
                </Typography>
              </Box>
            </Box>
          )}
        </>
      ) : err ? (
        <Typography color="error">Error loading data</Typography>
      ) : (
        <Typography sx={{ color: "white" }}>Loading...</Typography>
      )}
    </Box>
  );
}
