import React, { Component, useEffect, useState } from "react";
import * as d3 from "d3";
import PieChart from "../components/PieChart.js";
import franceCSV from "./data/france_2022.csv";
import senegalCSV from "./data/senegal_2022.csv";
import wcqFranceCSV from "./data/WCQ_France.csv";
import wcqSenegalCSV from "./data/WCQ_Senegal.csv";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import BarChart from "../components/BarChart/BarChart.js";
import bgImage from "./bg-visu2.png"

function SecondViz() {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [target1, setPlayer1] = useState("Kylian Mbappé");
  const [target2, setPlayer2] = useState("Karim Benzema");
  const [team, setTeam] = useState("France");
  const [file, setFile] = useState(franceCSV);
  const [matchsPlayed, setMatchsPlayed] = useState(0);
  const [minutesPlayed, setMinutesPlayed] = useState(0);
  const [matchsPlayed2, setMatchsPlayed2] = useState(0);
  const [minutesPlayed2, setMinutesPlayed2] = useState(0);

  const [wcqfile, setWcqFile] = useState(wcqFranceCSV);
  const [wcqData, setWcqData] = useState([]);



  useEffect(() => {
    if (team === "France") {
      setFile(franceCSV);
      setWcqFile(wcqFranceCSV);
    } else {
      setFile(senegalCSV);
      setWcqFile(wcqSenegalCSV);
    }

    // Load data for Bar chart
    d3.csv(wcqfile).then(function (d) {
      setWcqData(d);
    });

    // Load data for Pie charts
    d3.csv(file).then(function (d) {
      const temp1 = {
        PlayerGoal: 0,
        TeamGoal: 0,
      };

      const temp2 = {
        PlayerGoal: 0,
        TeamGoal: 0,
      };

      d.forEach((player) => {
        if (player.Player === target1) {
          setMatchsPlayed(parseInt(player.MP));
          setMinutesPlayed(parseInt(player.Min));
          temp1.PlayerGoal = parseInt(player.Gls) + parseInt(player.Ast);
        } else if (player.Gls > 0) {
          temp1.TeamGoal += parseInt(player.Gls);
        }

        if (target2 !== "") {
          if (player.Player === target2) {
            setMatchsPlayed2(parseInt(player.MP));
            setMinutesPlayed2(parseInt(player.Min));
            temp2.PlayerGoal = parseInt(player.Gls) + parseInt(player.Ast);
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
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            defaultValue="France"
          >
            <FormControlLabel
              value="France"
              control={<Radio />}
              label="France"
              onClick={() => {
                setTeam("France");
                setPlayer1("Kylian Mbappé");
                setPlayer2("Karim Benzema");
              }}
            />
            <FormControlLabel
              value="Senegal"
              control={<Radio />}
              label="Senegal"
              onClick={() => {
                setTeam("Senegal");
                setPlayer1("Sadio Mané");
                setPlayer2("");
              }}
            />
          </RadioGroup>
        </FormControl>
      </div>

      <div className="row">
        <div className="col-6">
          <h2 className="fw-bold">
            {team === "France" ? (
              <span>
                2021 UEFA European Championship <br />
                <span className="fst-italic h4">
                  (not considered for the Ballon d'Or)
                </span>
              </span>
            ) : (
              <span>2022 Africa Cup of Nations </span>
            )}
          </h2>
          {/* TOURNAMENT BRACKET */}

          {team === "France" ? (
              <span className="fst-italic h4 pt-4" style={{ color: "#FF4F00" }}>
                France is eliminated in the round of 16.
              </span>
            ) : (
              <span className="fst-italic h4 pt-4" style={{ color: "#FF4F00" }}>
                Senegal won the tournament.
              </span>
            )}
        </div>

        <div className="col-6">
          <h2 className="fw-bold">
            2022 World Cup Qualification
            {team === "France" ? (
              <span> - Europe</span>
            ) : (
              <span> - Africa</span>
            )}
          </h2>

          {/* Bar Chart */}
          <div className="row">
            <BarChart
              data={wcqData}
              selectedTeam={team}
              width={800}
              height={180}
              maxDomain={20}
            />

            {team === "France" ? (
              <span className="fst-italic h4 pt-4" style={{ color: "#FF4F00" }}>
                France is directly qualified for the World Cup <br />
                after the first round.
              </span>
            ) : (
              <span className="fst-italic h4 pt-4" style={{ color: "#FF4F00" }}>
                Senegal is qualified for the World Cup <br />
                after beating Egypt in the third round.
              </span>
            )}
          </div>

          {/* Pie Charts */}
          <div className="row">
            <div className="w-50 ">
              <div className="container border border-5 border-primary rounded-3 bg-white">
                <h2>
                  {team === "France" ? (
                    <div>
                      <h2 className="pt-1" style={{ color: "#095F78" }}>
                        Kylian Mbappé <br />{" "}
                        <span className="fst-italic h5">
                          with French national team
                        </span>
                      </h2>
                    </div>
                  ) : (
                    <div>
                      <h2 className="pt-1" style={{ color: "#095F78" }}>
                        Sadio Mané <br />{" "}
                        <span className="fst-italic h5">
                          with Senegalese national team
                        </span>{" "}
                      </h2>
                    </div>
                  )}
                </h2>

                <ul className="w-75 flex-wrap float-end pt-3 text-start">
                  <li>
                    <h5>
                      <span className="fw-bold" style={{ color: "#FF4F00" }}>
                        {matchsPlayed}
                      </span>{" "}
                      appearances
                    </h5>
                  </li>
                  <li>
                    <h5>
                      <span className="fw-bold" style={{ color: "#FF4F00" }}>
                        {minutesPlayed}
                      </span>{" "}
                      minutes played
                    </h5>
                  </li>
                </ul>

                <PieChart data={data1} />
              </div>
            </div>
            <div className="w-50">
              {team === "France" && (
                <div className="container border border-5 border-primary rounded-3 bg-white">
                  <h2 className="pt-1" style={{ color: "#095F78" }}>
                    Karim Benzema <br />
                    <span className="fst-italic h5">
                      with French national team
                    </span>
                  </h2>
                  <ul className="w-75 flex-wrap float-end pt-3 text-start">
                    <li>
                      <h5>
                        <span className="fw-bold" style={{ color: "#FF4F00" }}>
                          {matchsPlayed2}
                        </span>{" "}
                        appearances
                      </h5>
                    </li>
                    <li>
                      <h5>
                        <span className="fw-bold" style={{ color: "#FF4F00" }}>
                          {minutesPlayed2}
                        </span>{" "}
                        minutes played
                      </h5>
                    </li>
                  </ul>
                  <PieChart data={data2} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecondViz;
