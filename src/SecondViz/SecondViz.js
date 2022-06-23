import React, { Component, useEffect, useState } from "react";
import * as d3 from "d3";
import PieChart from "../components/PieChart.js";
import dataCSV from "./data/france_2022.csv";

function SecondViz() {
  const [data, setData] = useState([]);
  const [player, setPlayer] = useState("Mbappé");
  const [team, setTeam] = useState("Paris S-G");

  useEffect(() => {
    d3.csv(dataCSV).then(function (d) {
      const temp = {
        Goal: 0,
        Assist: 0,
        TeamGoal: 0,
        // MatchPlayed: 0,
        // MinPlayed: 0
      };

      d.forEach((player) => {
        if (player.Player === "Kylian Mbappé") {
          temp.Goal = parseInt(player.Gls);
          temp.Assist = parseInt(player.Ast);
          // temp.MatchPlayed = parseInt(player.MP)
          // temp.MinPlayed = parseInt(player.Min)
        } else if (player.Gls > 0) {
          temp.TeamGoal += parseInt(player.Gls);
        }
      });
      setData(temp);
    });
  });

  return (
    <div className="App">
      <p>Kylian Mbappé with french team</p>
      <PieChart data={data} />
    </div>
  );
}

export default SecondViz;
