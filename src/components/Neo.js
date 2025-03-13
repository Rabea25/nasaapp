import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Button, Link } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";

const key = process.env.REACT_APP_NASA_API_KEY;

export default function Neo({startDate, endDate}) {
  const [neo, setNeo] = useState([]);
  const [page, setPage] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [err, setErr] = useState(null);
  const itemsPerPage = 20; // 4x5 grid
  const [cur, setCur] = useState(-1);

  const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${key}`;

  useEffect(() => {
    setLoaded(false);
    setErr(null);
    setPage(1);
    if(dayjs(endDate).isBefore(dayjs(startDate)) || dayjs(endDate).isAfter(dayjs(startDate).add(7, 'day'))) endDate = startDate;
    axios
      .get(url)
      .then((response) => {
        const data = response.data.near_earth_objects;
        const flattenedNeo = Object.values(data).flat(); 
        setNeo(flattenedNeo);
        console.log(flattenedNeo);
        setLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setErr(error);
      });
  }, [startDate, endDate]);

  const totalPages = Math.ceil(neo.length / itemsPerPage);
  const paginatedNeo = neo.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box className="neo-container">
      {loaded ? (
        <>
          <Box className="neo-grid">
            {paginatedNeo.map((asteroid, idx) => (
              <Card
                key={asteroid.id}
                className="neo-card"
                onClick={() => setCur(idx)}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ marginBottom: "10px", textAlign: "center" }}
                  >
                    {asteroid.name}
                  </Typography>
                  <Typography variant="body2">
                    Diameter:{" "}
                    {
                      asteroid.estimated_diameter.kilometers
                        .estimated_diameter_max
                    }{" "}
                    km
                  </Typography>
                  <Typography variant="body2">
                    Speed:{" "}
                    {
                      asteroid.close_approach_data[0]?.relative_velocity
                        .kilometers_per_second
                    }{" "}
                    km/s
                  </Typography>
                  <Typography variant="body2">
                    Distance:{" "}
                    {asteroid.close_approach_data[0]?.miss_distance.kilometers}{" "}
                    km
                  </Typography>
                  <Typography variant="body2">
                    Hazardous:{" "}
                    {asteroid.is_potentially_hazardous_asteroid ? "Yes" : "No"}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
          {totalPages > 1 && (
            <Box id="page-control">
              <Button
                variant="contained"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                hidden={page === 1}
              >
                Prev
              </Button>
              <Typography sx={{ mx: 2, color: "white" }}>
                Page {page} of {totalPages}
              </Typography>
              <Button
                variant="contained"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                hidden={page === totalPages}
              >
                Next
              </Button>
            </Box>
          )}
          {cur !== -1 && (
            <Box
              className="info-modal"
              onClick={() => setCur(-1)}
              sx={{ cursor: "pointer" }}
            >
              <Box
                className="info-content"
                onClick={(e) => e.stopPropagation()}
              >
                <Typography variant="h3" fontWeight="bold">
                  {paginatedNeo[cur].name}
                </Typography>
                <Box className="info-details">
                  <Typography variant="body1">
                    Estimated Diameter:{" "}
                    {
                      paginatedNeo[cur].estimated_diameter.kilometers
                        .estimated_diameter_min
                    }{" - "}{
                      paginatedNeo[cur].estimated_diameter.kilometers
                        .estimated_diameter_max
                    }
                    km
                  </Typography>
                  <Typography variant="body1">
                    Speed:{" "}
                    {
                      paginatedNeo[cur].close_approach_data[0]
                        ?.relative_velocity.kilometers_per_second
                    }{" "}
                    km/s
                  </Typography>
                  <Typography variant="body1">
                    Distance:{" "}
                    {
                      paginatedNeo[cur].close_approach_data[0]?.miss_distance
                        .kilometers
                    }{" "}
                    km
                  </Typography>
                  <Typography variant="body1">
                    Hazardous:{" "}
                    {paginatedNeo[cur].is_potentially_hazardous_asteroid
                      ? "Yes"
                      : "No"}
                  </Typography>
                  <Typography variant="body1">
                    Close Approach Date:{" "}
                    {paginatedNeo[cur].close_approach_data[0]?.close_approach_date}
                  </Typography>
                  <Link variant="body1" target="_blank" href={paginatedNeo[cur].nasa_jpl_url}>
                    Click here to learn more.
                  </Link>
                </Box>
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



export function Neo3(){
  const [neo, setNeo] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [err, setErr] = useState(null);
  const [page, setPage] = useState(0);
  const [cur, setCur] = useState(-1);
  const itemsPerPage = 20; // 4x5 grid
  const url = `https://api.nasa.gov/neo/rest/v1/neo/browse?page=${page}&api_key=${key}`;
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    setLoaded(false);
    setErr(null);
    axios
      .get(url)
      .then((response) => {
        const data = response.data.near_earth_objects;
        const flattenedNeo = Object.values(data).flat();
        setTotalPages(response.data.page.total_pages); 
        setNeo(flattenedNeo);
        console.log(response.data.page.total_pages);
        setLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setErr(error);
      });
  }, [page]);

  useEffect(() => console.log(totalPages), [totalPages]);
    return (
    <Box className="neo-container">
      {loaded ? (
        <>
          <Box className="neo-grid">
            {neo.map((asteroid, idx) => (
              <Card
                key={asteroid.id}
                className="neo-card"
                onClick={() => setCur(idx)}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ marginBottom: "10px", textAlign: "center" }}
                  >
                    {asteroid.name}
                  </Typography>
                  <Typography variant="body2">
                    Diameter:{" "}
                    {
                      asteroid.estimated_diameter.kilometers
                        .estimated_diameter_max
                    }{" "}
                    km
                  </Typography>
                  <Typography variant="body2">
                    Speed:{" "}
                    {
                      asteroid.close_approach_data[0]?.relative_velocity
                        .kilometers_per_second
                    }{" "}
                    km/s
                  </Typography>
                  <Typography variant="body2">
                    Distance:{" "}
                    {asteroid.close_approach_data[0]?.miss_distance.kilometers}{" "}
                    km
                  </Typography>
                  <Typography variant="body2">
                    Hazardous:{" "}
                    {asteroid.is_potentially_hazardous_asteroid ? "Yes" : "No"}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
          {totalPages > 1 && (
            <Box id="page-control">
              <Button
                variant="contained"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                hidden={page === 1}
              >
                Prev
              </Button>
              <Typography sx={{ mx: 2, color: "white" }}>
                Page {page+1} of {totalPages}
              </Typography>
              <Button
                variant="contained"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                hidden={page === totalPages}
              >
                Next
              </Button>
            </Box>
          )}
          {cur !== -1 && (
            <Box
              className="info-modal"
              onClick={() => setCur(-1)}
              sx={{ cursor: "pointer" }}
            >
              <Box
                className="info-content"
                onClick={(e) => e.stopPropagation()}
              >
                <Typography variant="h3" fontWeight="bold">
                  {neo[cur].name}
                </Typography>
                <Box className="info-details">
                  <Typography variant="body1">
                    Estimated Diameter:{" "}
                    {
                      neo[cur].estimated_diameter.kilometers
                        .estimated_diameter_min
                    }{" - "}{
                      neo[cur].estimated_diameter.kilometers
                        .estimated_diameter_max
                    }
                    km
                  </Typography>
                  <Typography variant="body1">
                    Speed:{" "}
                    {
                      neo[cur].close_approach_data[0]
                        ?.relative_velocity.kilometers_per_second
                    }{" "}
                    km/s
                  </Typography>
                  <Typography variant="body1">
                    Distance:{" "}
                    {
                      neo[cur].close_approach_data[0]?.miss_distance
                        .kilometers
                    }{" "}
                    km
                  </Typography>
                  <Typography variant="body1">
                    Hazardous:{" "}
                    {neo[cur].is_potentially_hazardous_asteroid
                      ? "Yes"
                      : "No"}
                  </Typography>
                  <Typography variant="body1">
                    Close Approach Date:{" "}
                    {neo[cur].close_approach_data[0]?.close_approach_date}
                  </Typography>
                  <Link variant="body1" target="_blank" href={neo[cur].nasa_jpl_url}>
                    Click here to learn more.
                  </Link>
                </Box>
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


export function Neo2({id}){
  const [neo, setNeo] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [err, setErr] = useState(null);
  const url = `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${key}`;

  useEffect(() =>{
    setLoaded(false);
    setErr(null);
    axios
      .get(url)
      .then((response) => {
        const data = response.data;
        setNeo(data);
        console.log(data);
        setLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setErr(error);
      });
  }, [id])

  return (
    <Box className="neo-container">
      {loaded ? (
        <Box className="neo-grid" sx={{ display: "flex", justifyContent: "center" }}>
          <Card className="neo-card-2" sx={{ padding: "20px", maxWidth: "700px" }}>
            <CardContent>
              <Typography 
                variant="h3" 
                fontWeight="bold" 
                align="center" 
                sx={{ marginBottom: "20px" }}
              >
                {neo.name}
              </Typography>
  
              <Box className="neo-section" sx={{ marginBottom: "20px" }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  General Information
                </Typography>
                <Typography variant="h6">Estimated Diameter: {neo.estimated_diameter.kilometers.estimated_diameter_min} - {neo.estimated_diameter.kilometers.estimated_diameter_max} km</Typography>
                <Typography variant="h6">Absolute Magnitude: {neo.absolute_magnitude_h}</Typography>
                <Typography variant="h6">Potentially Hazardous? {neo.is_potentially_hazardous_asteroid ? "Yes" : "No"}</Typography>
                <Typography variant="h6">Close Approach Date: {neo.close_approach_data[0]?.close_approach_date_full}</Typography>
                <Typography variant="h6">Velocity: {neo.close_approach_data[0]?.relative_velocity.kilometers_per_second} km/s</Typography>
                <Typography variant="h6">Miss Distance: {neo.close_approach_data[0]?.miss_distance.kilometers} km</Typography>
                <Link href={neo.nasa_jpl_url} target="_blank" sx={{ display: "block", marginTop: "10px" }}>
                  More Info
                </Link>
              </Box>
  
              <Box className="neo-section">
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Orbital Information
                </Typography>
                <Typography variant="h6">Orbit ID: {neo.orbital_data.orbit_id}</Typography>
                <Typography variant="h6">Eccentricity: {neo.orbital_data.eccentricity}</Typography>
                <Typography variant="h6">Perihelion Distance: {neo.orbital_data.perihelion_distance} AU</Typography>
                <Typography variant="h6">Aphelion Distance: {neo.orbital_data.aphelion_distance} AU</Typography>
                <Typography variant="h6">Inclination: {neo.orbital_data.inclination}°</Typography>
                <Typography variant="h6">Mean Motion: {neo.orbital_data.mean_motion}°/day</Typography>
                <Typography variant="h6">Orbital Period: {neo.orbital_data.orbital_period} days</Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      ) : err ? (
        <Typography color="error">Error loading data</Typography>
      ) : (
        <Typography sx={{ color: "white" }}>Loading...</Typography>
      )}
    </Box>
  );
}
