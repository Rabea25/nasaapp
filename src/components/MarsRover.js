import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Box, Typography, IconButton, Grid} from '@mui/material';
import { Star } from "lucide-react";
import useLocalStorage from "./LocalStorage";

export default function MarsRover({rover, camera, sol, page, setHasNextPage}) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const apiKey = process.env.REACT_APP_NASA_API_KEY;
  
  const [open, setOpen] = useState(-1);

  const [favourites, setFavourites] = useLocalStorage("favourites", []);
  const [isFav, setIsFav] = useState([]);
  const handleFavourite = (index) => {
    const favObj = {
      img: photos[index].img_src,
      info: `From NASA's Mars Rover API, ${rover}, ${camera}, sol = ${sol}`,
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

  useEffect(() => {
    if (photos) {
      const newIsFav = photos.map((item) =>
        favourites.find((fav) => fav.img === item.img_src)
      );
      setIsFav(newIsFav);
    }
  }, [photos, favourites]);


  useEffect(() => {
    setLoading(true);
    setError("");
    setHasNextPage(false);
    const x = axios.get( `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?api_key=${apiKey}&camera=${camera}&sol=${sol}`)
      .then((res) => {
        console.log(res);
        setPhotos(res.data.photos);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [rover, camera, sol, setHasNextPage]);

  useEffect(() =>{
    setHasNextPage(photos.length > (page)*9);
  }, [page, photos])

  return (
    <div>
      <Box className="grid-container">
        {loading && <Typography variant="h4" color="white">Loading...</Typography>}
        {error && <Typography variant="h4" color="red">{error}</Typography>}
        {!loading && !error && photos.length === 0 && <Typography variant="h4" color="red">No photos found</Typography>}
        {!loading && !error && photos.length > 0 && (
          <Grid container spacing={2}>
            {photos.slice((page-1)*9, page*9>photos.length ? photos.length : page*9).map((photo, idx) => (
              <Grid item key={photo.id} xs={12} sm={6} md={4} lg={4} sx={{ position: "relative" }}>
                <img src={photo.img_src} alt={photo.id} className='mars-image' onClick={()=>setOpen(idx)}/>
                <IconButton
                  className={`fav-icon ${isFav[idx] ? "active" : ""}`}
                  onClick={() => handleFavourite(idx)}
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
            src={photos[open].img_src}
            alt={photos[open].id}
            className="enlarged-image"
          />
        </div>
      )}
      </Box>
    </div>
  );
}