import React, { useEffect, useState } from "react";
import styles from "./styles.css";
import * as d3 from "d3";
import BarChart from "../components/BarChart/BarChart.js";
import PlayerSelector from "../components/PlayerSelector/PlayerSelector.js";
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
    <div>
      {dataCSV[team]["competitions"].map((e, i) => (
        <div key={i}>
          {e.name} : <span style={{ color: "#FF4F00" }}>{e.place}</span>
          <br />
        </div>
      ))}
    </div>
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
        setTeam("Paris Saint-Germain");
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
      default:
        break;
    }
  };

  return (
    <div className="App bg-white row">
      <h1 className="p-3 fw-bold">Club Comparison</h1>
      <div className="playerSelector">
        <PlayerSelector
          onSetSelected={setSelectedPlayer}
          selectedPlayer={player}
        />
      </div>

      <div className="col-6">
        <div className="barChart">
          <h2 className="p-2">
            <u>{`${league} ranking (points)`}</u>
          </h2>
          <BarChart data={data} selectedTeam={team} />
        </div>
      </div>
      <div className="col-6 d-flex flex-column justify-content-center">
          <div className="container w-50 m-2 border border-5 border-primary rounded-3"
          style={{ background: "#E7EFF6" }}>
            <h2 className="fw-bold">{team}</h2>
            {list}
          </div>
          <div className="container m-2 border border-5 border-primary rounded-3"
          style={{ background: "#E7EFF6" }}>
              <h2 className="playerName">{piePlayer} with {team}</h2>
            <PieChart data={pieData} className="pieChart" />
        </div>
      </div>
    </div>
  );
}

export default FirstViz;
