import React, { useState } from "react";
import Apod from "../components/Apod";
import PickADate from "../components/DatePicker";
import dayjs from "dayjs";
import "../App.css";

export default function ApodPage() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleDateChange = (newDate) => {
    setDate(dayjs(newDate).format("YYYY-MM-DD"));
  };

  return (
    <div className="apod">
      <Apod date={date} />
      <PickADate
        date={date}
        onDateChange={handleDateChange}
        label={false && "Select a date for picture of the day"}
        sx={{}}
      />
    </div>
  );
}
