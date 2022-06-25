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
  const [piePlayer, setPiePlayer] = useState("Karim Benzema");

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
      const temp1 = {
        Goal: 0,
        Assist: 0,
        TeamGoal: 0,
      };

      d.forEach((p) => {
        if (p.Player === piePlayer) {
          temp1.Goal = parseInt(p.Gls);
          temp1.Assist = parseInt(p.Ast);
          playingTime1.MatchPlayed = parseInt(p.MP);
          playingTime1.MinPlayed = parseInt(p.Min);
        } else if (p.Gls > 0) {
          temp1.TeamGoal += parseInt(p.Gls);
        }
      });
      setPieData(temp1);
    });
  }, [player]);

  const setSelectedPlayer = (newSelected) => {
    setPlayer(newSelected);
    switch (newSelected) {
      case "mbappe":
        setTeam("Paris S-G");
        setLeague("Ligue 1");
        setPiePlayer("Kylian Mbappé");
        break;
      case "benzema":
        setTeam("Real Madrid");
        setLeague("La Liga");
        setPiePlayer("Karim Benzema");
        break;
      case "mane":
        setTeam("Liverpool");
        setLeague("Premier League");
        setPiePlayer("Sadio Mané");
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
            <div className="infoBoxTitle">
              <p className="playerName">{piePlayer}</p>
              <p className="teamName">with {team}</p>
            </div>
            <PieChart data={pieData} className="pieChart" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirstViz;
