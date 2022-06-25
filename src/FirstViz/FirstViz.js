import React, { useEffect, useState } from "react";
import styles from "./styles.css";
import * as d3 from "d3";
import BarChart from "../components/BarChart/BarChart.js";
import PlayerSelector from "../components/PlayerSelector/PlayerSelector.js";
import YearSelector from "../components/YearSelector/YearSelector";
import dataCSV from "./data/data.js";

function FirstViz() {
  const [data, setData] = useState([]);
  const [player, setPlayer] = useState("benzema");
  const [team, setTeam] = useState("Real Madrid");
  const [league, setLeague] = useState("La Liga");

  const list = (
    <ul>
      {dataCSV[team]["competitions"].map((e, i) => (
        <li key={i}>
          {e.name} : <span style={{ color: "#FF4F00" }}>{e.place}</span>
        </li>
      ))}
    </ul>
  );

  useEffect(() => {
    d3.csv(dataCSV[player]["ligue"]).then(function (d) {
      setData(d);
    });
  }, [player]);

  const setSelectedPlayer = (newSelected) => {
    setPlayer(newSelected);
    switch (newSelected) {
      case "mbappe":
        setTeam("Paris S-G");
        setLeague("Ligue 1");
        break;
      case "benzema":
        setTeam("Real Madrid");
        setLeague("La Liga");
        break;
      case "mane":
        setTeam("Liverpool");
        setLeague("Premier League");
        break;
    }
  };

  return (
    <div className="firstviz">
      <p className="headerTitle">Club Comparison</p>
      <div className="container">
        <div className="barChart">
          <p>{`${league} ranking (points)`}</p>
          <BarChart data={data} selectedTeam={team} />
        </div>
        <div className="rightContainer">
          <div className="playerSelector">
            <PlayerSelector
              onSetSelected={setSelectedPlayer}
              selectedPlayer={player}
            />
          </div>
          <div className="infoBox">
            <div className="headerTitle">{team}</div>

            {list}
          </div>
          <div className="infoBox">
            <p>Pie chart</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirstViz;
