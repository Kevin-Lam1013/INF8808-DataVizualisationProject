import React, { Component, useEffect, useState } from "react";
import * as d3 from "d3";
import PieChart from "../components/PieChart.js";
import Bracket from "../components/Bracket/Bracket.js";
import franceCSV from "./data/france_2022.csv";
import senegalCSV from "./data/senegal_2022.csv";
import styles from "./styles.css";
import tournamentBracket from "./data/dataBracket.js";

function SecondViz() {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [bracketData, setBracketData] = useState(tournamentBracket["France"]);
  const [playingTime1, setPlayingTime1] = useState([]);
  const [playingTime2, setPlayingTime2] = useState([]);
  const [target1, setPlayer1] = useState("Kylian Mbappé");
  const [target2, setPlayer2] = useState("Karim Benzema");
  const [team, setTeam] = useState("France");
  const [file, setFile] = useState(franceCSV);

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

      const timeTemp1 = {
        MatchPlayed: 0,
        MinPlayed: 0,
      };

      const timeTemp2 = {
        MatchPlayed: 0,
        MinPlayed: 0,
      };

      d.forEach((player) => {
        if (player.Player === target1) {
          temp1.Goal = parseInt(player.Gls);
          temp1.Assist = parseInt(player.Ast);
          timeTemp1.MatchPlayed = parseInt(player.MP);
          timeTemp1.MinPlayed = parseInt(player.Min);
        } else if (player.Gls > 0) {
          temp1.TeamGoal += parseInt(player.Gls);
        }

        if (target2 !== "") {
          if (player.Player === target2) {
            temp2.Goal = parseInt(player.Gls);
            temp2.Assist = parseInt(player.Ast);
            timeTemp2.MatchPlayed = parseInt(player.MP);
            timeTemp2.MinPlayed = parseInt(player.Min);
          } else if (player.Gls > 0) {
            temp2.TeamGoal += parseInt(player.Gls);
          }
        }
      });

      setData1(temp1);
      setPlayingTime1(timeTemp1);

      if (target2 !== "") {
        setData2(temp2);
        setPlayingTime2(timeTemp2);
      }
    });

    setBracketData(tournamentBracket[team]);
  });

  return (
    <div className="App">
      <div>
        <button
          onClick={() => {
            setTeam("France");
            setPlayer1("Kylian Mbappé");
            setPlayer2("Karim Benzema");
          }}
        >
          France
        </button>
        <button
          onClick={() => {
            setTeam("Senegal");
            setPlayer1("Sadio Mané");
            setPlayer2("");
          }}
        >
          Senegal
        </button>
      </div>

      <div className="pieChartContainer">
        <div className="infoBox">
          <p>
            {team === "France"
              ? "Kylian Mbappé with France national team"
              : "Sadio Mané with Senegal national team"}
          </p>
          <p>{`- ${playingTime1.MatchPlayed} appearances`}</p>
          <p>{`- ${playingTime1.MinPlayed} minutes played`}</p>
          <PieChart data={data1} />
        </div>
        {team === "France" && (
          <div className="infoBox">
            <p>Karim Benzema with France national team</p>
            <p>{`- ${playingTime2.MatchPlayed} appearances`}</p>
            <p>{`- ${playingTime2.MinPlayed} minutes played`}</p>
            <PieChart data={data2} />
          </div>
        )}
      </div>

      <div className="bracketContainer">
        <Bracket data={bracketData} />
      </div>
    </div>
  );
}

export default SecondViz;
