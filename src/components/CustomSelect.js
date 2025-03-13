import React from "react";
import { MenuItem, Select } from "@mui/material";

export default function CustomSelect({ type, onChange, children, rv }) {
  return (
    <Select
      displayEmpty
      renderValue={(selected) => (selected ? selected : rv)}
      value={type}
      onChange={onChange}
      sx={{
        height: "46.533333px",
        margin: "10px",
        color: "rgb(180, 200, 220)",
        backgroundColor: "rgb(20, 30, 40)",
        border: "2px solid rgb(180, 200, 220)",
        borderRadius: "7px", // Rounded corners
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none", // Remove default border
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          border: "none", // Border on hover
        },
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            backgroundColor: "rgb(20, 30, 40)", // Dropdown background
            border: "none", // Border around dropdown
            borderRadius: "0 0 8px 8px", // Rounded corners
            color: "rgb(180, 200, 220)", // Dropdown text color
          },
        },
      }}
    >
      {children.map((child, index) => (
        <MenuItem key={index} value={child.value}>
          {child.label}
        </MenuItem>
      ))}
    </Select>
  );
}
