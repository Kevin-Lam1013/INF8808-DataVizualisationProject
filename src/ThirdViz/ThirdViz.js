import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import RadarChart from "../components/RadarChart/RadarChart.js";
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

  const handleStatChange = (event, index) => {
    let newArr = [...selectedStats];
    newArr[index] = event.target.value;
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
    setChartData()
    console.log(benzemaData, maneData, mbappeData)
  }, [selectedStats]);


  const setPlayerData = (player) => {
    let csvFile,setFunction;


    switch(player){
      case 'mbappe': {
        csvFile = dataMbappeCSV
        setFunction = setMbappeData
        break;
      }
      case 'benzema': {
        csvFile = dataBenzemaCSV
        setFunction = setBenzemaData
        break;
      }
      case 'mane': {
        csvFile = dataManeCSV
        setFunction = setManeData
        break;
      }
    }

    d3.csv(csvFile).then(function (d) {
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
      setFunction(orderedData);
  });
}


  const setChartData = () => {
    setPlayerData("benzema")
    setPlayerData("mbappe")
    setPlayerData("mane")
  }

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

          {selectedStats.map((s,i) => (
            <Box>
            <FormControl fullWidth>
              <InputLabel className="bg-light" id={`stat${i+1}-label`}>
                Stat {i+1}
              </InputLabel>
              <Select
                className="bg-light"
                labelId={`stat${i+1}-label`}
                id={`stat${i+1}-select`}
                value={selectedStats[i]}
                label={`Stat${i+1}`}
                onChange={(e) => handleStatChange(e,i)}
              >
                {STATS.map((stat) =>
                  selectedStats.includes(stat) ? (
                    <MenuItem key={`${stat}${i+1}`} value={stat} disabled>
                      {stat}
                    </MenuItem>
                  ) : (
                    <MenuItem key={`${stat}${i+1}`} value={stat}>
                      {stat}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Box>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ThirdViz;
