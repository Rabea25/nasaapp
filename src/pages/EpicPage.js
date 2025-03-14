import React, { useState, useEffect } from "react";
import Epic, {
  FetchDate,
} from "../components/Epic";
import PickADate from "../components/DatePicker";
import CustomSelect from "../components/CustomSelect";
import dayjs from "dayjs";
import { Box, FormControl, Switch, Typography, InputLabel} from "@mui/material";
import "../styles/Epic.css";

export default function EpicPage() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [type, setType] = useState("");
  const [dateList, setDateList] = useState([]);
  const [gridView, setGridView] = useState(true);
  const [animatedView, setAnimatedView] = useState(false);

  const [naturalDateList, setNaturalDateList] = useState([]);
  const [cloudDateList, setCloudDateList] = useState([]);
  const [aerosolDateList, setAerosolDateList] = useState([]);
  const [enhancedDateList, setEnhancedDateList] = useState([]);

  useEffect(() => {
    FetchDate({type : 'natural'}).then((data) => {
      const sortedDates = data.data.sort((a, b) => new Date(b) - new Date(a));
      setNaturalDateList(sortedDates);
      setDateList(sortedDates);
    });
    FetchDate({type : 'aerosol'}).then((data) => {
      const sortedDates = data.data.sort((a, b) => new Date(b) - new Date(a));
      setAerosolDateList(sortedDates);
    });
    FetchDate({type : 'cloud'}).then((data) => {
      const sortedDates = data.data.sort((a, b) => new Date(b) - new Date(a));
      setCloudDateList(sortedDates);
    });
    FetchDate({type : 'enhanced'}).then((data) => {
      const sortedDates = data.data.sort((a, b) => new Date(b) - new Date(a));
      setEnhancedDateList(sortedDates);
    });
  }, []);
  //what happens here is i take all the available dates, and I will pass the available dates list to the datepicker according to which filter is selected
  useEffect(() => {
    switch (type) {
      case "cloud":
        setDateList(cloudDateList);
        break;
      case "aerosol":
        setDateList(aerosolDateList);
        break;
      case "enhanced":
        setDateList(enhancedDateList);
        break;
      case "natural":
      default:
        setDateList(naturalDateList);
        break;
    }
  }, [type, naturalDateList, cloudDateList, aerosolDateList, enhancedDateList]);

  useEffect(() => {
    if (!dateList.includes(date)) setDate(dateList[0]);
  }, [dateList]);

  const handleDateChange = (newDate) =>
    setDate(dayjs(newDate).format("YYYY-MM-DD"));

  const handleRefresh = (e) => {
    e.preventDefault();
  };

  return (
    <div id="epic">
      <Box id="header">
        <Box id="filters">
          <FormControl id="form" sx={{ minWidth: { xs: "150px", sm: "200px", md: "250px" } }}>
          <CustomSelect
              rv = "Select a type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              children = {[
                { value: "natural", label: "Natural" },
                { value: "cloud", label: "Cloud" },
                { value: "aerosol", label: "Aerosol" },
                { value: "enhanced", label: "Enhanced" },
              ]}
              />
          </FormControl>
          <PickADate
            date={date}
            onDateChange={handleDateChange}
            datelist={dateList}
          />
        </Box>
        <Box className="switch">
          <Typography variant="body1" sx={{ color: "white" }}>
            Grid view:
          </Typography>
          <Switch
            checked={gridView}
            onChange={(e) => setGridView(e.target.checked)}
            defaultChecked
          />
          {!gridView && (
            <Box className="switch">
              <Typography variant="body1" sx={{ color: "white" }}>
                Animated view:
              </Typography>
              <Switch
                checked={animatedView}
                onChange={(e) => setAnimatedView(e.target.checked)}
              />
            </Box>
          )}
        </Box>
      </Box>
      {(dateList.length>0 && date && type) && <Epic date={date} type={type} gridView={gridView} animatedView={animatedView}/>}
    </div>
  );
}
