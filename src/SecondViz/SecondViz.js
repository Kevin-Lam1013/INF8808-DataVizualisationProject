import React, { Component, useEffect, useState } from "react";
import * as d3 from "d3";
import PieChart from "../components/PieChart.js";
import franceCSV from "./data/france_2022.csv";
import senegalCSV from "./data/senegal_2022.csv";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

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
        PlayerGoal: 0,
        TeamGoal: 0,
      };

      const temp2 = {
        PlayerGoal: 0,
        TeamGoal: 0,
      };

      d.forEach((player) => {
        if (player.Player === target1) {
          temp1.PlayerGoal = parseInt(player.Gls) + parseInt(player.Ast);
          playingTime1.MatchPlayed = parseInt(player.MP);
          playingTime1.MinPlayed = parseInt(player.Min);
        } else if (player.Gls > 0) {
          temp1.TeamGoal += parseInt(player.Gls);
        }

        if (target2 !== "") {
          if (player.Player === target2) {
            temp2.PlayerGoal = parseInt(player.Gls) + parseInt(player.Ast);
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
        <div className="col-6"></div>
        <div className="col-6">
          <div className="row py-3">barchart</div>
          <div className="row ">
            <div className="col-6">
              <div className="container border border-5 border-primary rounded-3 bg-white">
                <h2>
                  {team === "France" ? (
                    <div>
                      <h2>
                        Kylian Mbappé <br />{" "}
                        <span className="fst-italic h4">
                          {" "}
                          with France national team{" "}
                        </span>
                      </h2>
                    </div>
                  ) : (
                    <div>
                      <h2>
                        Sadio Mané <br />{" "}
                        <span className="fst-italic h4">
                          with Senegal national team
                        </span>{" "}
                      </h2>
                    </div>
                  )}
                </h2>
                <PieChart data={data1} />
              </div>
            </div>
            <div className="col-6">
              {team === "France" && (
                <div className="container border border-5 border-primary rounded-3 bg-white">
                  <h2>
                    Karim Benzema <br />
                    <span className="fst-italic h4">
                      with France national team
                    </span>
                  </h2>
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
