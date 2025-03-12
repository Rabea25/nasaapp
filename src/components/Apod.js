import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  Link,
  IconButton,
} from "@mui/material";
import "../styles/Apod.css";
import useLocalStorage from "./LocalStorage";
import { Star } from "lucide-react";

export default function Apod({ date }) {
  const key = process.env.REACT_APP_NASA_API_KEY;
  const [apod, setApod] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [err, setErr] = useState(null);
  const [open, setOpen] = useState(false);

  const [favourites, setFavourites] = useLocalStorage("favourites", []);
  const [isFav, setIsFav] = useState(false);
  const handleFavourite = () => {
    const favObj = {
      img: apod.url,
      info: `From NASA's Astronomy Picture of the Day API, ${apod.date}`,
    };
    if (isFav) {
      setFavourites(favourites.filter((fav) => fav.img !== favObj.img));
    } else {
      setFavourites([...favourites, favObj]);
    }
    setIsFav(!isFav);
  };

  const theme = useTheme();
  const isMdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

  useEffect(() => {
    console.log(date);
    setLoaded(false);
    setErr(null);
    axios
      .get(`https://api.nasa.gov/planetary/apod?api_key=${key}&date=${date}`)
      .then((response) => {
        setApod(response.data);
        setLoaded(true);
      })
      .catch((error) => {
        console.error(error);
        setErr(error);
      });
  }, [date]);

  useEffect(() => {
    if(apod) setIsFav(favourites.find((fav) => fav.img === apod.url));
  }, [apod, favourites]);

  const Media = () => {
    if (apod.media_type === "image") {
      return (
        <Box
          component="img"
          src={apod.url}
          alt={apod.title}
          sx={{
            width: { xs: "100%", md: "50%" },
            objectFit: "contain",
            borderRadius: "10px 0 0 10px",
            maxHeight: "40em",
            backgroundColor: "rgb(20, 30, 40)",
            cursor: "pointer",
          }}
          onClick={() => {
            setOpen(true);
          }}
        ></Box>
      );
    } else if (apod.url.endsWith(".html")) {
      return (
        <Box sx={{ width: { xs: "100%", md: "50%" }, textAlign: "center" }}>
          <Typography variant="h6">
            This APOD is interactive, please click the link below.
          </Typography>
          <Link href={apod.url} target="_blank" rel="noreferrer">
            Click here
          </Link>
        </Box>
      );
    } else {
      return (
        <Box
          component="iframe"
          src={apod.url}
          title={apod.title}
          sx={{
            width: { xs: "100%", md: "50%" },
            height: "auto",
            aspectRatio: "16/9",
          }}
          allowFullScreen
        />
      );
    }
  };

  return (
    <div className="apod">
      {loaded ? (
        <Card
          className="Card"
          sx={{ maxWidth: { xs: 400, sm: 500, md: 900, lg: 1200, xl: 1500 } }}
        >
          <Box className={isMdUp ? "box-md" : "box-xs"}>
            <IconButton
              className={`fav-icon ${isFav ? "active" : ""}`}
              onClick={() => handleFavourite()}
            >
              <Star />
            </IconButton>
            {Media()}
            <CardContent className={isMdUp ? "content-md" : "content-xs"}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                fontWeight="bold"
              >
                {apod.title}
              </Typography>

              <Typography variant="body1">{apod.explanation}</Typography>
              <Typography variant="body2" sx={{ marginTop: "auto" }}>
                {apod.date}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      ) : err ? (
        <Typography variant="h3" color="error">
          {err.status===404 ? "No APOD found for this date" : "Error fetching APOD"}
        </Typography>
      ) : (
        <Typography variant="h3">Loading...</Typography>
      )}
      {open && (
        <div className="image-modal" onClick={() => setOpen(false)}>
          <img
            src={apod.url}
            alt={apod.title}
            className="enlarged-image"
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </div>
      )}
    </div>
  );
}
