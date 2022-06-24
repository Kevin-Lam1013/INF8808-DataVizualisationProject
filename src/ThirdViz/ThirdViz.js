import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import RadarChart from "../components/RadarChart.js";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "./styles.css";
import { STATS } from "./StatsSelector.js";
import dataBenzemaCSV from "./data/benzema.csv";
import dataMbappeCSV from "./data/mbappe.csv";
import dataManeCSV from "./data/mane.csv";

function ThirdViz() {
  // const benzemaRef = useRef();
  // const mbappeRef = useRef();
  // const maneRef = useRef();

  const [benzemaData, setBenzemaData] = useState([]);
  const [mbappeData, setMbappeData] = useState([]);
  const [maneData, setManeData] = useState([]);

  const handleChange1 = (event) => {
    let newArr = [...selectedStats];
    newArr[0] = event.target.value;
    setSelectedStats(newArr);
  };

  const handleChange2 = (event) => {
    let newArr = [...selectedStats];
    newArr[1] = event.target.value;
    setSelectedStats(newArr);
  };

  const handleChange3 = (event) => {
    let newArr = [...selectedStats];
    newArr[2] = event.target.value;
    setSelectedStats(newArr);
  };

  const handleChange4 = (event) => {
    let newArr = [...selectedStats];
    newArr[3] = event.target.value;
    setSelectedStats(newArr);
  };

  const handleChange5 = (event) => {
    let newArr = [...selectedStats];
    newArr[4] = event.target.value;
    setSelectedStats(newArr);
  };

  const handleChange6 = (event) => {
    let newArr = [...selectedStats];
    newArr[5] = event.target.value;
    setSelectedStats(newArr);
  };

  const [selectedStats, setSelectedStats] = useState([
    "Goals/Shot",
    "Shots Total",
    "Non-Penalty Goals",
    "Successful Dribble %",
    "Assists",
    "Touches (Att Pen)",
  ]);

  useEffect(() => {
    d3.csv(dataBenzemaCSV).then(function (d) {
      const filteredData = d.filter((stat) => {
        if (selectedStats.includes(stat.Statistic)) {
          return stat;
        }
      });
      setBenzemaData(filteredData);
      
    });
    d3.csv(dataMbappeCSV).then(function (d) {
      const filteredData = d.filter((stat) => {
        if (selectedStats.includes(stat.Statistic)) {
          return stat;
        }
      });
      setMbappeData(filteredData);
    });
    d3.csv(dataManeCSV).then(function (d) {
      const filteredData = d.filter((stat) => {
        if (selectedStats.includes(stat.Statistic)) {
          return stat;
        }
      });
      setManeData(filteredData);
    });
  }, [selectedStats]);

  return (
    <div className="App row">
      <div className="col-9 ">
        <div className="d-flex flex-column justify-content-center">
          <h3>Karim Benzema</h3>
          <RadarChart data={benzemaData} ></RadarChart>
        </div>
        <div className="d-flex justify-content-evenly">
          <div className="d-flex flex-column justify-content-center">
            <RadarChart data={mbappeData} ></RadarChart>
            <h3>Kylian Mbappé</h3>
          </div>
          <div className="d-flex flex-column justify-content-center">
            <RadarChart data={maneData} ></RadarChart>
            <h3>Sadio Mané</h3>
          </div>
        </div>
      </div>
      <div className="col-3">
        <div className="container d-flex flex-column justify-content-evenly h-100 bg-light rounded-3">
          <Box>
            <FormControl fullWidth>
              <InputLabel id="stat1-label">Stat 1</InputLabel>
              <Select
                labelId="stat1-label"
                id="stat1-select"
                value={selectedStats[0]}
                label="Stat1"
                onChange={handleChange1}
              >
                {STATS.map((stat) =>
                  selectedStats.includes(stat) ? (
                    <MenuItem key={stat} value={stat} disabled>
                      {stat}
                    </MenuItem>
                  ) : (
                    <MenuItem key={stat} value={stat}>
                      {stat}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Box>

          <Box>
            <FormControl fullWidth>
              <InputLabel id="stat2-label">Stat 2</InputLabel>
              <Select
                labelId="stat2-label"
                id="stat2-select"
                value={selectedStats[1]}
                label="Stat2"
                onChange={handleChange2}
              >
                {STATS.map((stat) =>
                  selectedStats.includes(stat) ? (
                    <MenuItem key={stat} value={stat} disabled>
                      {stat}
                    </MenuItem>
                  ) : (
                    <MenuItem key={stat} value={stat}>
                      {stat}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Box>

          <Box>
            <FormControl fullWidth>
              <InputLabel id="stat3-label">Stat 3</InputLabel>
              <Select
                labelId="stat3-label"
                id="stat3-select"
                value={selectedStats[2]}
                label="Stat3"
                onChange={handleChange3}
              >
                {STATS.map((stat) =>
                  selectedStats.includes(stat) ? (
                    <MenuItem key={stat} value={stat} disabled>
                      {stat}
                    </MenuItem>
                  ) : (
                    <MenuItem key={stat} value={stat}>
                      {stat}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Box>

          <Box>
            <FormControl fullWidth>
              <InputLabel id="stat4-label">Stat 4</InputLabel>
              <Select
                labelId="stat4-label"
                id="stat4-select"
                value={selectedStats[3]}
                label="Stat4"
                onChange={handleChange4}
              >
                {STATS.map((stat) =>
                  selectedStats.includes(stat) ? (
                    <MenuItem key={stat} value={stat} disabled>
                      {stat}
                    </MenuItem>
                  ) : (
                    <MenuItem key={stat} value={stat}>
                      {stat}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Box>

          <Box>
            <FormControl fullWidth>
              <InputLabel id="stat5-label">Stat 5</InputLabel>
              <Select
                labelId="stat5-label"
                id="stat5-select"
                value={selectedStats[4]}
                label="Stat5"
                onChange={handleChange5}
              >
                {STATS.map((stat) =>
                  selectedStats.includes(stat) ? (
                    <MenuItem key={stat} value={stat} disabled>
                      {stat}
                    </MenuItem>
                  ) : (
                    <MenuItem key={stat} value={stat}>
                      {stat}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Box>

          <Box>
            <FormControl fullWidth>
              <InputLabel id="stat6-label">Stat 6</InputLabel>
              <Select
                labelId="stat6-label"
                id="stat6-select"
                value={selectedStats[5]}
                label="Stat6"
                onChange={handleChange6}
              >
                {STATS.map((stat) =>
                  selectedStats.includes(stat) ? (
                    <MenuItem key={stat} value={stat} disabled>
                      {stat}
                    </MenuItem>
                  ) : (
                    <MenuItem key={stat} value={stat}>
                      {stat}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default ThirdViz;
