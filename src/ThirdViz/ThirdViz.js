import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import RadarChart from "../components/RadarChart.js";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { STATS } from "./StatsSelector.js";
import dataBenzemaCSV from "./data/benzema.csv";
import dataMbappeCSV from "./data/mbappe.csv";
import dataManeCSV from "./data/mane.csv";

function ThirdViz() {
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
      let filteredData = d.filter((stat) => {
        if (selectedStats.includes(stat.Statistic)) {
          return stat;
        }
      });

      let orderedData = []

      selectedStats.forEach((statName) => {
        filteredData.map( (stat)=> {
          if (stat.Statistic === statName) {
            orderedData.push(stat);
          } 
          return true
        });
      });
      setBenzemaData(orderedData);
 
    });
    d3.csv(dataMbappeCSV).then(function (d) {
      const filteredData = d.filter((stat) => {
        if (selectedStats.includes(stat.Statistic)) {
          return stat;
        }
      });

      let orderedData = []

      selectedStats.forEach((statName) => {
        filteredData.map( (stat)=> {
          if (stat.Statistic === statName) {
            orderedData.push(stat);
          } 
          return true
        });
      });
      setMbappeData(orderedData);
    });
    d3.csv(dataManeCSV).then(function (d) {
      const filteredData = d.filter((stat) => {
        if (selectedStats.includes(stat.Statistic)) {
          return stat;
        }
      });

      let orderedData = []

      selectedStats.forEach((statName) => {
        filteredData.map( (stat)=> {
          if (stat.Statistic === statName) {
            orderedData.push(stat);
          } 
          return true
        });
      });
      setManeData(orderedData);
    });
  }, [selectedStats]);

  return (
    <div className="App bg-white row">
      <h1 className="p-3 fw-bold">Individual Performance</h1>
      <div className="col-9">
        <div className="d-flex flex-column justify-content-center">
          <h3><u> Karim Benzema </u></h3>
          <RadarChart data={benzemaData}></RadarChart>
        </div>
        <div className="d-flex justify-content-evenly">
          <div className="d-flex flex-column justify-content-center">
            <h3><u>Kylian Mbappé</u></h3>
            <RadarChart data={mbappeData}></RadarChart>
          </div>
          <div className="d-flex flex-column justify-content-center">
            <h3><u>Sadio Mané</u></h3>
            <RadarChart data={maneData}></RadarChart>
          </div>
        </div>
      </div>
      <div className="col-3 p-3">
        <div
          className="container d-flex flex-column justify-content-evenly h-100 border border-5 border-primary rounded-3"
          style={{ background: "#E7EFF6" }}
        >
          <Box>
            <FormControl fullWidth>
              <InputLabel className="bg-light" id="stat1-label">
                Stat 1
              </InputLabel>
              <Select
                className="bg-light"
                labelId="stat1-label"
                id="stat1-select"
                value={selectedStats[0]}
                label="Stat1"
                onChange={handleChange1}
              >
                {STATS.map((stat) =>
                  selectedStats.includes(stat) ? (
                    <MenuItem key={`${stat}1`} value={stat} disabled>
                      {stat}
                    </MenuItem>
                  ) : (
                    <MenuItem key={`${stat}1D`} value={stat}>
                      {stat}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Box>

          <Box>
            <FormControl fullWidth>
              <InputLabel className="bg-light" id="stat2-label">
                Stat 2
              </InputLabel>
              <Select
                className="bg-light"
                labelId="stat2-label"
                id="stat2-select"
                value={selectedStats[1]}
                label="Stat2"
                onChange={handleChange2}
              >
                {STATS.map((stat) =>
                  selectedStats.includes(stat) ? (
                    <MenuItem key={`${stat}2`} value={stat} disabled>
                      {stat}
                    </MenuItem>
                  ) : (
                    <MenuItem key={`${stat}2`} value={stat}>
                      {stat}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Box>

          <Box>
            <FormControl fullWidth>
              <InputLabel className="bg-light" id="stat3-label">
                Stat 3
              </InputLabel>
              <Select
                className="bg-light"
                labelId="stat3-label"
                id="stat3-select"
                value={selectedStats[2]}
                label="Stat3"
                onChange={handleChange3}
              >
                {STATS.map((stat) =>
                  selectedStats.includes(stat) ? (
                    <MenuItem key={`${stat}3`} value={stat} disabled>
                      {stat}
                    </MenuItem>
                  ) : (
                    <MenuItem key={`${stat}3`} value={stat}>
                      {stat}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Box>

          <Box>
            <FormControl fullWidth>
              <InputLabel className="bg-light" id="stat4-label">
                Stat 4
              </InputLabel>
              <Select
                className="bg-light"
                labelId="stat4-label"
                id="stat4-select"
                value={selectedStats[3]}
                label="Stat4"
                onChange={handleChange4}
              >
                {STATS.map((stat) =>
                  selectedStats.includes(stat) ? (
                    <MenuItem key={`${stat}4`} value={stat} disabled>
                      {stat}
                    </MenuItem>
                  ) : (
                    <MenuItem key={`${stat}4`} value={stat}>
                      {stat}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Box>

          <Box>
            <FormControl fullWidth>
              <InputLabel className="bg-light" id="stat5-label">
                Stat 5
              </InputLabel>
              <Select
                className="bg-light"
                labelId="stat5-label"
                id="stat5-select"
                value={selectedStats[4]}
                label="Stat5"
                onChange={handleChange5}
              >
                {STATS.map((stat) =>
                  selectedStats.includes(stat) ? (
                    <MenuItem key={`${stat}5`} value={stat} disabled>
                      {stat}
                    </MenuItem>
                  ) : (
                    <MenuItem key={`${stat}5`} value={stat}>
                      {stat}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Box>

          <Box>
            <FormControl fullWidth>
              <InputLabel className="bg-light" id="stat6-label">
                Stat 6
              </InputLabel>
              <Select
                className="bg-light rounded-3"
                labelId="stat6-label"
                id="stat6-select"
                value={selectedStats[5]}
                label="Stat6"
                onChange={handleChange6}
              >
                {STATS.map((stat) =>
                  selectedStats.includes(stat) ? (
                    <MenuItem key={`${stat}6`} value={stat} disabled>
                      {stat}
                    </MenuItem>
                  ) : (
                    <MenuItem key={`${stat}6`} value={stat}>
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
