import React, { useState, useEffect } from "react";
import MarsRover from "../components/MarsRover";
import "../styles/Mars.css";
import {
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Slider,
  Button,
} from "@mui/material";

function getCuriositySol() {
  const landingDate = new Date("2012-08-06T00:00:00Z"); // UTC landing date
  const msPerSol = 1.027491 * 86400000; // Martian sol in milliseconds
  return Math.floor((Date.now() - landingDate.getTime()) / msPerSol);
}

export default function MarsRoverPage() {
  const cameraList = {
    curiosity: ["FHAZ", "RHAZ", "MAST", "CHEMCAM", "MAHLI", "MARDI", "NAVCAM"],
    opportunity: ["FHAZ", "RHAZ", "PANCAM", "MINITES", "NAVCAM"],
    spirit: ["FHAZ", "RHAZ", "PANCAM", "MINITES", "NAVCAM"],
  };
  const solList = {
    curiosity: getCuriositySol(),
    opportunity: 5111,
    spirit: 2208,
  };
  const [rover, setRover] = useState("curiosity");
  const [cameras, setCameras] = useState(cameraList["curiosity"]);
  const [camera, setCamera] = useState("FHAZ");
  const [sol, setSol] = useState(0);
  const [tempSol, setTempSol] = useState(sol);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  return (
    <Box id="mars">
      <Box id="bigger-header">
        <Box component={Button} onClick={() => setPage(page-1)} disabled={page === 1} sx={{color:"white"}}>{page===1 || 'Prev'}</Box>
        <Box id="header">
          <Box id="filters">
            <FormControl
              variant="filled"
              label="Rover" 
              className="form"
              sx={{ minWidth: { xs: "150px", sm: "200px", md: "250px" } }}
            >
              <InputLabel>Rover</InputLabel>
              <Select
                value={rover}
                onChange={(e) => {
                  setRover(e.target.value);
                  setCameras(cameraList[e.target.value]);
                  setCamera(cameraList[e.target.value][0]);
                  setPage(1);
                  setTempSol(0);
                  setSol(0);
                }}
              >
                <MenuItem value="curiosity">Curiosity</MenuItem>
                <MenuItem value="opportunity">Opportunity</MenuItem>
                <MenuItem value="spirit">Spirit</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              variant="filled"
              label="Camera"
              className="form"
              sx={{ minWidth: { xs: "150px", sm: "200px", md: "250px" } }}
            >
              <InputLabel id="label1">Camera</InputLabel>
              <Select
                labelId="label1"
                value={camera}
                onChange={(e) => {
                  setCamera(e.target.value)
                  setPage(1)
                }}
              >
                {cameras.map((camera) => (
                  <MenuItem key={camera} value={camera}>
                    {camera}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box id="sol">
            <Typography variant="h5" color="white">
              Solar days: {tempSol}
            </Typography>
            <Slider
              defaultValue={0}
              value={tempSol}
              max={solList[rover]}
              onChange={(e) => setTempSol(e.target.value)}
              onChangeCommitted={(e, nv) => setSol(tempSol)}
              sx={{ minWidth: { xs: "200px", sm: "300px", md: "450px" }, color:'rgb(180, 200, 220)'} }
            />
          </Box>
        </Box>
        <Box component={Button} onClick={() => setPage(page+1)} disabled={!hasNextPage} sx={{color:"white"}}>{hasNextPage && 'Next'}</Box>
      </Box>
      <MarsRover
        rover={rover}
        camera={camera}
        sol={sol}
        page={page}
        setHasNextPage={setHasNextPage}
      />
    </Box>
  );
}
