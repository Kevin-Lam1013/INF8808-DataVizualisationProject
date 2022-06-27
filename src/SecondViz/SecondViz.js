import React, { Component, useEffect, useState } from "react";
import * as d3 from "d3";
import PieChart from "../components/PieChart.js";
import franceCSV from "./data/france_2022.csv";
import senegalCSV from "./data/senegal_2022.csv";

function SecondViz() {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [target1, setPlayer1] = useState("Kylian Mbappé");
  const [target2, setPlayer2] = useState("Karim Benzema");
  const [team, setTeam] = useState("France");
  const [file, setFile] = useState(franceCSV);
  var playingTime1 = {
    MatchPlayed: 0,
    MinPlayed: 0,
  };
  var playingTime2 = {
    MatchPlayed: 0,
    MinPlayed: 0,
  };

  useEffect(() => {
    if (team === "France") {
      setFile(franceCSV);
    } else {
      setFile(senegalCSV);
    }

    d3.csv(file).then(function (d) {
      const temp1 = {
        Goal: 0,
        Assist: 0,
        TeamGoal: 0,
      };

      const temp2 = {
        Goal: 0,
        Assist: 0,
        TeamGoal: 0,
      };

      d.forEach((player) => {
        if (player.Player === target1) {
          temp1.Goal = parseInt(player.Gls);
          temp1.Assist = parseInt(player.Ast);
          playingTime1.MatchPlayed = parseInt(player.MP);
          playingTime1.MinPlayed = parseInt(player.Min);
        } else if (player.Gls > 0) {
          temp1.TeamGoal += parseInt(player.Gls);
        }

        if (target2 !== "") {
          if (player.Player === target2) {
            temp2.Goal = parseInt(player.Gls);
            temp2.Assist = parseInt(player.Ast);
            playingTime2.MatchPlayed = parseInt(player.MP);
            playingTime2.MinPlayed = parseInt(player.Min);
          } else if (player.Gls > 0) {
            temp2.TeamGoal += parseInt(player.Gls);
          }
        }
      });

      setData1(temp1);

      if (target2 !== "") {
        setData2(temp2);
      }
    });
  });

  return (
    <div className="App row" style={{ background: "#E7EFF6" }}>
      <h1 className="p-3 fw-bold">National Team Comparison</h1>

      <div className="d-flex justify-content-center">
        <button
          className="btn btn-outline-info"
          onClick={() => {
            setTeam("France");
            setPlayer1("Kylian Mbappé");
            setPlayer2("Karim Benzema");
          }}
        >
          France
        </button>
        <button
          className="btn btn-outline-info"
          onClick={() => {
            setTeam("Senegal");
            setPlayer1("Sadio Mané");
            setPlayer2("");
          }}
        >
          Senegal
        </button>
      </div>

      <div>
        <p>
          {team === "France"
            ? "Kylian Mbappé with France national team"
            : "Sadio Mané with Senegal national team"}
        </p>
        <PieChart data={data1} />
      </div>
      {team === "France" && (
        <div>
          <p>Karim Benzema with France national team</p>
          <PieChart data={data2} />
        </div>
      )}
    </div>
  );
}

export default SecondViz;
