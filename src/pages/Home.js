import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import { FaMeteor } from "react-icons/fa";
import { Star } from "lucide-react";
import {
  SatelliteAlt,
  Info,
  RocketLaunch,
  PrecisionManufacturing
} from "@mui/icons-material";

function HomeCard({ title, icon, desc, buttonText, link}) {
  const navigate = useNavigate();

  return (
    <Box className="card-box">
      {title && <Typography variant="h5">{title}</Typography>}
      <Box>{icon}</Box>
      <Typography variant="body2">{desc}</Typography>
      {buttonText && <Button className="card-button" onClick={() => navigate(link)}>{buttonText}</Button>}
    </Box>
  );
}

export default function Home() {
  return (
    <Box id="home">
      <Box className="big-grid">
        <Box className="row">
          <HomeCard
            title="Astronomy Picture of the Day"
            icon={<RocketLaunch />}
            desc="Discover the cosmos!"
            buttonText="View today's Picture"
            link="/apod"
          />
          <HomeCard
            title="Near-Earth Objects"
            icon={<FaMeteor />}
            desc="Track asteroids and comets near our planet."
            buttonText="Track NEOs"
            link="/neo"
          />
          <HomeCard
            title="Mars Rover"
            icon={<PrecisionManufacturing />}
            desc="Explore Mars through rover-captured images."
            buttonText="View Mars Data"
            link="/marsrover"
          />
        </Box>
        <Box className="row">
          <HomeCard
            title="EPIC - Earth"
            icon={<SatelliteAlt />}
            desc="Color images of the entire sunlit face of Earth."
            buttonText="See Earth Now"
            link="/epic"
          />
          <HomeCard
            title="🔭 About This Project"
            icon={<Info />}
            desc={
              <>
                Discover space with real NASA data! 🌌 Explore APOD, asteroids, Mars rover images, and more. Stay curious! 🚀
              </>
            }
          />
          <HomeCard
            title="Favourites"
            icon={<Star />}
            desc="Save and revisit your favourite space discoveries."
            buttonText="Go to Favourites"
            link="/favourites"
          />
        </Box>
      </Box>
    </Box>
  );
}
