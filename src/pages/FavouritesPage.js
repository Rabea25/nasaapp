import React, { useState, useEffect } from "react";
import useLocalStorage from "../components/LocalStorage";
import "../styles/Favourites.css";
import { Box, Typography, Card, CardMedia, Grid } from "@mui/material";
import { Close, Info } from "@mui/icons-material";

export default function FavouritesPage() {
  const [favourites, setFavourites] = useLocalStorage("favourites", []);
  const [curImg, setCurImg] = useState(null);
  const [curInfo, setCurInfo] = useState(null);
  const removeFromFavourites = (idxx) => {
    setFavourites(favourites.filter((fav, idx) => idx !== idxx));
  };
  return (
    <Box className="favourites">
      {favourites.length > 0 ? (
        <Grid container spacing={2} className="grid-container">
          {favourites.map((img, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card className="image-card">
                <CardMedia
                  component="img"
                  image={img.img}
                  className="grid-image"
                  onClick={() => setCurImg(img.img)}
                />
                <Box className="card-footer">
                  <Info className="info" onClick={() => setCurInfo(img.info)} />
                  <Close
                    className="close"
                    onClick={() => {
                      removeFromFavourites(index);
                    }}
                  />
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h3" className="msg">
          No favorites yet! ⭐ Start adding some to see them here.
        </Typography>
      )}

      {curImg && (
        <div className="image-modal" onClick={() => setCurImg(null)}>
          <img
            src={curImg}
            className="enlarged-image"
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </div>
      )}

      {curInfo && (
        <div className="info-modal" onClick={() => setCurInfo(null)}>
          <Typography variant="h4" className="info-text">
            {curInfo}
          </Typography>
        </div>
      )}
      <button
        onClick={() =>
          setFavourites([
            ...favourites,
            {
              img: "https://apod.nasa.gov/apod/image/2503/QuadMoon_Minato_960.jpg",
              info: "AAAAAAAAAAAAAAA",
            },
          ])
        }
      >
        eesf
      </button>
    </Box>
  );
}
