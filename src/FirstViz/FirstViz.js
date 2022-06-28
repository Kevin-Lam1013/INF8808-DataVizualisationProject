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
  const [matchsPlayed, setMatchsPlayed] = useState(0);
  const [minutesPlayed, setMinutesPlayed] = useState(0);

  var playingTime1 = {
    MatchPlayed: 0,
    MinPlayed: 0,
  };

  const list = (
    <div
      className="d-flex flex-column h-75 justify-content-evenly"
      style={{ fontSize: "24px" }}
    >
      {dataCSV[team]["competitions"].map((e, i) => (
        <div className="h4 text-start" key={i} style={{ fontSize: "1.2vw" }}>
          <span className="fst-italic"> {e.name} :</span>{" "}
          <span style={{ color: "#FF4F00" }}>{e.place} </span>
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
        PlayerGoal: 0,
        TeamGoal: 0,
      };

      d.forEach((p) => {
        if (p.Player === piePlayer) {
          setMatchsPlayed(parseInt(p.MP));
          setMinutesPlayed(parseInt(p.Min));
          temp1.PlayerGoal = parseInt(p.Gls) + parseInt(p.Ast);
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

      <div className="col-6 pb-3">
        <div className="barChart">
          <h2 className="p-2">
            <u>{`${league} ranking (points)`}</u>
          </h2>
          <BarChart data={data} selectedTeam={team} width={850} height={500} maxDomain={100} />
        </div>
      </div>
      <div className="col-6 pb-3 d-flex flex-row ">
        <div
          className=" align-self-end container h-50 m-2 border border-5 border-primary rounded-3"
          style={{ background: "#E7EFF6" }}
        >
          <h2 className="pt-1 pb-2" style={{ color: "#095F78" }}>
            {team}
          </h2>
          {list}
        </div>

        <div
          className="align-self-end flex-wrap container m-2 border border-5 border-primary rounded-3"
          style={{ background: "#E7EFF6", height:"85%" }}
        >
          <h2 className="pt-1" style={{ color: "#095F78" }}>
            {piePlayer} <br />
            <span className="fst-italic h5">with {team}</span>
          </h2>

          <ul className="w-75 flex-wrap float-end text-start">
            <li>
              <h5 className="">
                <span className="fw-bold" style={{ color: "#FF4F00" }}>
                  {matchsPlayed}
                </span> appearances
              </h5>
            </li>
            <li>
              <h5 className="">
                <span className="fw-bold" style={{ color: "#FF4F00" }}>
                  {minutesPlayed}
                </span> minutes played
              </h5>
            </li>
          </ul>

          <PieChart data={pieData} />
        </div>
        <br />
      </div>
    </div>
  );
}

export default FirstViz;
