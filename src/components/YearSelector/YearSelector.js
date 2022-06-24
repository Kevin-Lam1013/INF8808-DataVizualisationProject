import React, { useState, useEffect } from "react";
import styles from "../YearSelector/styles.css";

function YearSelector(props) {
  const [selectedYear, setSelectedYear] = useState(0);

  return (
    <div className="yearButtons">
      <div
        className={`button ${selectedYear === 0 ? "selected" : ""}`}
        onClick={() => setSelectedYear(0)}
      >
        2021/2022
      </div>
      <div
        className={`button ${selectedYear === 1 ? "selected" : ""}`}
        onClick={() => setSelectedYear(1)}
      >
        2020/2021
      </div>
      <div
        className={`button ${selectedYear === 2 ? "selected" : ""}`}
        onClick={() => setSelectedYear(2)}
      >
        2019/2020
      </div>
      <div
        className={`button ${selectedYear === 3 ? "selected" : ""}`}
        onClick={() => setSelectedYear(3)}
      >
        2018/2019
      </div>
      <div
        className={`button ${selectedYear === 4 ? "selected" : ""}`}
        onClick={() => setSelectedYear(4)}
      >
        2017/2018
      </div>
    </div>
  );
}

export default YearSelector;
