import React from "react";
import { Typography, Box } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function PickADate({
  date,
  onDateChange,
  label,
  datelist = [],
}) {
  if (datelist.length !== 0 && !datelist.includes(date)) date = datelist[0];
  return (
    <Box
      sx={{
        margin: "10px 10px 10px 10px",
        padding: "10px",
        
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
          shouldDisableDate={(day) =>
            datelist.length
              ? !datelist.includes(dayjs(day).format("YYYY-MM-DD"))
              : false
          }
          sx={{
            color: "rgb(180, 200, 220)",

            "& .MuiInputBase-root": {
              backgroundColor: "rgb(20, 30, 40)",
              color: "white",
              borderRadius: "7px",
              border: "2px solid rgb(180, 200, 220)",
            },
            "& .MuiInputBase-input": {
              padding: "10px",
              color: "rgb(180, 200, 220)",
            },
            "& .MuiSvgIcon-root": {
              color: "rgb(180, 200, 220)",
            },
            
          }}
          slotProps={{
            desktopPaper: {
              sx: {
                backgroundColor: "rgb(20, 30, 40) !important",
                color: "rgb(180, 200, 220) !important",
              },
            },
            leftArrowIcon: {
              sx: {
                color: "rgb(180, 200, 220) !important",
              },
            },
            rightArrowIcon: {
              sx: {
                color: "rgb(180, 200, 220) !important",
              },
            },
            calendarHeader: {
              sx: {
                "& .MuiTypography-root": {
                  color: "rgb(180, 200, 220) !important", // Fixes the labels
                },
              },
            },
            
            day: {
              sx: {
                color: "rgb(180, 200, 220)",
                "&.Mui-selected": {
                  backgroundColor: "rgb(100, 150, 200) !important",
                  color: "white !important",
                },
                "&:hover": {
                  backgroundColor: "rgb(50, 80, 100) !important",
                },
                "&.Mui-disabled": {
                  color: "gray !important", 
                },
              },
            },
          }}
        />
      </LocalizationProvider>
    </Box>
  );
}
