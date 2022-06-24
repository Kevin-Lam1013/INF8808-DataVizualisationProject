import React, { useState, useEffect } from "react";
import styles from "../PlayerSelector/styles.css";

function PlayerSelector(props) {
  const [selectedPlayer, setSelectedPlayer] = useState(props.selectedPlayer);

  function changeSelected(newSelected) {
    setSelectedPlayer(newSelected);
    props.onSetSelected(newSelected);
  }

  return (
    <div className="selector">
      <div className="player">
        <div
          className={`circle mbappe ${
            selectedPlayer === "mbappe" ? "selected" : ""
          }`}
          onClick={() => changeSelected("mbappe")}
        ></div>
        <p>Kylian Mbappé</p>
      </div>

      <div className="player">
        <div
          className={`circle benzema ${
            selectedPlayer === "benzema" ? "selected" : ""
          }`}
          onClick={() => changeSelected("benzema")}
        ></div>
        <p>Karim Benzema</p>
      </div>
      <div className="player">
        <div
          className={`circle mane ${
            selectedPlayer === "mane" ? "selected" : ""
          }`}
          onClick={() => changeSelected("mane")}
        ></div>
        <p>Sadio Mané</p>
      </div>
    </div>
  );
}

export default PlayerSelector;
