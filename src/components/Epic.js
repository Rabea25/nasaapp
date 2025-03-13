import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, IconButton, Button, Typography, Box } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import "../styles/Epic.css";
import { Star } from "lucide-react";
import "../styles/Star.css";
import useLocalStorage from "./LocalStorage";
const key = process.env.REACT_APP_NASA_API_KEY;

export async function FetchDate({ type }) {
  return await axios.get(
    `https://api.nasa.gov/EPIC/api/${type}/available?api_key=${key}`
  );
}

export default function Epic({ date, type, gridView, animatedView }) {
  const [epic, setEpic] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [err, setErr] = useState(null);
  const [idx, setIdx] = useState(0);
  const [favourites, setFavourites] = useLocalStorage("favourites", []);
  const [isFav, setIsFav] = useState([]);
  const [open, setOpen] = useState(-1);

  const handleFavourite = (index) => {
    const favObj = {
      img: `https://epic.gsfc.nasa.gov/archive/${type}/${date
        .split("-")
        .join("/")}/png/${epic[index].image}.png`,
      info: `From NASA's EPIC API, ${type}, ${date}`,
    };
    if (isFav[index]) {
      setFavourites(favourites.filter((fav) => fav.img !== favObj.img));
    } else {
      setFavourites([...favourites, favObj]);
    }
    const newIsFav = [...isFav];
    newIsFav[index] = !newIsFav[index];
    setIsFav(newIsFav);
  };

  // Fetching data from the API
  useEffect(() => {
    setLoaded(false);
    setErr(null);
    setIdx(0);
    axios
      .get(`https://epic.gsfc.nasa.gov/api/${type}/date/${date}?api_key=${key}`)
      .then((response) => {
        setEpic(response.data);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setErr(error);
        setLoaded(false);
      });
  }, [date, type]);

  useEffect(() => {
    if (epic) {
      const newIsFav = epic.map((item) =>
        favourites.find(
          (fav) =>
            fav.img ===
            `https://epic.gsfc.nasa.gov/archive/${type}/${date
              .split("-")
              .join("/")}/png/${item.image}.png`
        )
      );
      setIsFav(newIsFav);
    }
  }, [epic, favourites, date, type]);

  // animation timer
  useEffect(() => {
    if (animatedView && epic?.length) {
      const interval = setInterval(() => {
        setIdx((prevIdx) => (prevIdx + 1) % epic.length);
      }, 150);

      return () => clearInterval(interval);
    }
  }, [animatedView, epic]);

  if (err) {
    return (
      <Typography variant="h4" color="white" align="center">
        {`Error fetching data`}
      </Typography>
    );
  } else if (!loaded) {
    return (
      <Typography variant="h4" color="white" align="center">
        Loading...
      </Typography>
    );
  } else if (!epic || epic.length === 0) {
    return (
      <Typography variant="h5" color="white" align="center">
        Loading images...
      </Typography>
    );
  }

  return (
    <Box className="grid-container">
      {!gridView && !animatedView && (
        <Box className="carousel" sx={{ position: "relative" }}>
          <Button
            className="nav-button"
            disableRipple
            disableElevation
            onClick={() => setIdx((idx - 1 + epic.length) % epic.length)}
          >
            <NavigateBeforeIcon sx={{ fontSize: 50 }} />
          </Button>
          <Box
            component="img"
            src={`https://epic.gsfc.nasa.gov/archive/${type}/${date
              .split("-")
              .join("/")}/png/${epic[idx].image}.png`}
            alt={epic[idx].caption}
            id="epic-image-2"
            onClick={() => {
              setOpen(idx);
            }}
          />
          <IconButton
            className={`fav-icon2 ${isFav[idx] ? "active" : ""}`}
            onClick={() => handleFavourite(idx)}
          >
            <Star />
          </IconButton>
          <Button
            className="nav-button"
            disableRipple
            disableElevation
            onClick={() => setIdx((idx + 1) % epic.length)}
          >
            <NavigateNextIcon sx={{ fontSize: 50 }} />
          </Button>
        </Box>
      )}
      {!gridView && animatedView && (
        <Box
          className="carousel"
          component="img"
          src={`https://epic.gsfc.nasa.gov/archive/${type}/${date
            .split("-")
            .join("/")}/png/${epic[idx].image}.png`}
          alt={epic[idx].caption}
          id="epic-image-2"
        />
      )}
      {gridView && (
        <Grid container spacing={2}>
          {epic.map((item, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              sx={{ position: "relative" }}
            >
              <Box
                component="img"
                src={`https://epic.gsfc.nasa.gov/archive/${type}/${date
                  .split("-")
                  .join("/")}/png/${item.image}.png`}
                alt={item.caption}
                id="epic-image"
                onClick={() => {
                  setOpen(idx);
                }}
              />
              <IconButton
                className={`fav-icon ${isFav[index] ? "active" : ""}`}
                onClick={() => handleFavourite(index)}
              >
                <Star />
              </IconButton>
            </Grid>
          ))}
        </Grid>
      )}
      {open !== -1 && (
        <div className="image-modal" onClick={() => setOpen(-1)}>
          <img
            src={`https://epic.gsfc.nasa.gov/archive/${type}/${date
              .split("-")
              .join("/")}/png/${epic[open].image}.png`}
            alt={epic[open].caption}
            className="enlarged-image"
          />
        </div>
      )}
    </Box>
  );
}
