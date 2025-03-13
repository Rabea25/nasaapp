import React, { useState, useEffect } from "react";
import MarsRover from "../components/MarsRover";
import CustomSelect from "../components/CustomSelect";

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
    "":[]
  };
  const solList = {
    curiosity: getCuriositySol(),
    opportunity: 5111,
    spirit: 2208,
  };
  const [rover, setRover] = useState("");
  const [cameras, setCameras] = useState([]);
  const [camera, setCamera] = useState("");
  const [sol, setSol] = useState(0);
  const [tempSol, setTempSol] = useState(sol);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);


  return (
    <Box id="mars">
      <Box id="bigger-header">
        <Box
          component={Button}
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          sx={{ color: "white" }}
        >
          {page === 1 || "Prev"}
        </Box>
        <Box id="header">
          <Box id="filters">
            <FormControl
              label="Rover"
              className="form"
              sx={{ minWidth: { xs: "150px", sm: "200px", md: "250px" } }}
            >
              <CustomSelect
                rv="Select a rover"
                value={rover}
                children={[
                  { value: "curiosity", label: "Curiosity" },
                  { value: "opportunity", label: "Opportunity" },
                  { value: "spirit", label: "Spirit" },
                ]}
                onChange={(e) => {
                  setRover(e.target.value);
                  setCameras(cameraList[e.target.value]);
                  setPage(1);
                  setTempSol(0);
                  setSol(0);
                }}
              />
            </FormControl>
            <FormControl
              label="Camera"
              className="form"
              sx={{ minWidth: { xs: "150px", sm: "200px", md: "250px" } }}
            >
              <CustomSelect
                rv="Select a camera"
                value={camera}
                onChange={(e) => {
                  setCamera(e.target.value);
                  setPage(1);
                }}
                children={cameras.map((camera) => ({
                  value: camera,
                  label: camera,
                }))}
              />
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
              sx={{
                minWidth: { xs: "200px", sm: "300px", md: "450px" },
                color: "rgb(180, 200, 220)",
              }}
            />
          </Box>
        </Box>
        <Box
          component={Button}
          onClick={() => setPage(page + 1)}
          disabled={!hasNextPage}
          sx={{ color: "white" }}
        >
          {hasNextPage && "Next"}
        </Box>
      </Box>
      {(rover && camera) && <MarsRover
        rover={rover}
        camera={camera}
        sol={sol}
        page={page}
        setHasNextPage={setHasNextPage}
      />}
    </Box>
  );
}
