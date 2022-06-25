import React, { useEffect, useState } from "react";
import styles from "./styles.css";
import * as d3 from "d3";
import BarChart from "../components/BarChart/BarChart.js";
import PlayerSelector from "../components/PlayerSelector/PlayerSelector.js";
import YearSelector from "../components/YearSelector/YearSelector";
import dataCSV from "./data/data.js";
import PieChart from "../components/PieChart";

function FirstViz() {
  const [data, setData] = useState([]);
  const [player, setPlayer] = useState("benzema");
  const [team, setTeam] = useState("Real Madrid");
  const [league, setLeague] = useState("La Liga");
  const [pieData, setPieData] = useState([]);

  var playingTime1 = {
    MatchPlayed: 0,
    MinPlayed: 0,
  };

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

    d3.csv(dataCSV[player]["team"]).then(function (d) {
      console.log(d);
      const temp1 = {
        Goal: 0,
        Assist: 0,
        TeamGoal: 0,
      };

      d.forEach((p) => {
        let target1;
        switch (player) {
          case "benzema":
            target1 = "Karim Benzema";
            break;
          case "mbappe":
            target1 = "Kylian Mbappé";
            break;
          case "mane":
            target1 = "Sadio Mané";
            break;
        }
        if (p.Player === target1) {
          temp1.Goal = parseInt(p.Gls);
          temp1.Assist = parseInt(p.Ast);
          playingTime1.MatchPlayed = parseInt(p.MP);
          playingTime1.MinPlayed = parseInt(p.Min);
        } else if (p.Gls > 0) {
          temp1.TeamGoal += parseInt(p.Gls);
        }
      });
      console.log(temp1);
      setPieData(temp1);
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
            <PieChart data={pieData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirstViz;
