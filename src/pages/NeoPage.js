import React, { useEffect } from "react";
import Neo, {Neo2, Neo3} from "../components/Neo";
import PickADate from "../components/DatePicker";
import dayjs from "dayjs";
import "../styles/Neo.css";
import {
  Box,
  Select,
  MenuItem,
  Radio,
  FormControl,
  FormControlLabel,
  RadioGroup,
  TextField,
  Button
} from "@mui/material";

export default function NeoPage() {
  const [mode, setMode] = React.useState(0);
  const [startDate, setStartDate] = React.useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = React.useState(dayjs().format("YYYY-MM-DD"));
  const [selectableDates, setSelectableDates] = React.useState([]);
  const [id, setId] = React.useState("");
  const [idd, setIdd] = React.useState("");
  const handleStartDateChange = (newDate) =>
    setStartDate(dayjs(newDate).format("YYYY-MM-DD"));
  const handleEndDateChange = (newDate) =>
    setEndDate(dayjs(newDate).format("YYYY-MM-DD"));

  const getEndDates = () => {
    let dates = [];
    for (
      let d = dayjs(startDate);
      d.isBefore(dayjs()) && d.isBefore(dayjs(startDate).add(7, "day"));
      d = d.add(1, "day")
    )
      dates.push(d.format("YYYY-MM-DD"));

    setEndDate(dates[0]);
    return dates;
  };

  useEffect(() => {
    setSelectableDates(getEndDates());
  }, [startDate]);

  return (
    <div id="neo">
      <Box id="bigger-header-neo">
        <Box id="header-neo">
          <FormControl>
            <RadioGroup
              row
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              sx={{ color: "rgb(180, 200, 220)" }}
            >
              <FormControlLabel
                value={0}
                control={<Radio style={{ color: "rgb(180, 200, 220)" }} />}
                label="Neo Feed"
              />
              <FormControlLabel
                value={1}
                control={<Radio style={{ color: "rgb(180, 200, 220)" }} />} //lakad tafa7 el kayl 3shan alwn el bta3 da
                label="Neo Lookup"
                onClick={() => {setIdd(""); setId("");}}
              />
              <FormControlLabel
                value={2}
                control={<Radio style={{ color: "rgb(180, 200, 220)" }} />}
                label="All Neos"
              />
            </RadioGroup>
          </FormControl>
          {parseInt(mode) === 0 && (
            <Box id="filters-neo">
              <PickADate
                date={startDate}
                onDateChange={handleStartDateChange}
              />
              <PickADate
                date={endDate}
                onDateChange={handleEndDateChange}
                datelist={selectableDates}
              />
            </Box>
          )}
          {parseInt(mode) === 1 && (
            <Box
              id="filters-neo"
              sx={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <TextField
                variant="outlined"
                label="Asteroid ID"
                value={idd}
                onChange={(e) => setIdd(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setId(idd);
                }}
                sx={{
                  input: { color: "rgb(180, 200, 220)" },
                  label: { color: "rgb(180, 200, 220)" },
                  "& .MuiInputLabel-root": {
                    color: "rgb(180, 200, 220)",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "rgb(180, 200, 220) !important",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "rgb(180, 200, 220)" },
                    "&:hover fieldset": { borderColor: "rgb(130, 170, 200)" },
                    "&.Mui-focused fieldset": {
                      borderColor: "rgb(100, 140, 180)",
                    },
                  },
                }}
              />

              <Button onClick={() => {setId(idd);}} id="id-enter-button">
                Search
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      {parseInt(mode) === 0 && <Neo startDate={startDate} endDate={endDate} />}
      {parseInt(mode) === 1 && id !== "" && <Neo2 id={id} />}
      {parseInt(mode) === 2 && <Neo3 />}
    </div>
  );
}
