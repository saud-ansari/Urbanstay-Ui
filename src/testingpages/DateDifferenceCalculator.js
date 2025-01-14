import React, { useState } from "react";

const DateDifferenceCalculator = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [daysDifference, setDaysDifference] = useState(null);

  const calculateDifference = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const differenceInTime = end - start;

      if (differenceInTime < 0) {
        setDaysDifference("End date should be after the start date!");
      } else {
        const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);
        setDaysDifference(differenceInDays);
      }
    } else {
      setDaysDifference("Please select both dates.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Date Difference Calculator</h2>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Start Date:{" "}
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label>
          End Date:{" "}
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>
      <button onClick={calculateDifference} style={{ marginBottom: "20px" }}>
        Calculate Days
      </button>
      {daysDifference !== null && (
        <div>
          <h3>{typeof daysDifference === "string" ? daysDifference : `Number of Days: ${daysDifference}`}</h3>
        </div>
      )}
    </div>
  );
};

export default DateDifferenceCalculator;
