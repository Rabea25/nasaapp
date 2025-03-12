import React from "react";
import { Typography, Box } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function PickADate({ date, onDateChange, label, datelist = []}) {
  if(datelist.length !== 0 && !datelist.includes(date)) date = datelist[0];
  return (
    <Box
      sx={{
        margin: "10px 10px 10px 10px",
        padding: "10px",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: "7px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6">{label}</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={dayjs(date)}
          onChange={onDateChange}
          maxDate={dayjs()}
          shouldDisableDate={(day) => datelist.length ? !datelist.includes(dayjs(day).format("YYYY-MM-DD")) : false}
        />
      </LocalizationProvider>
    </Box>
  );
}
