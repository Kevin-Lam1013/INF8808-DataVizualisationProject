import React, { useEffect, useState} from "react";
import styles from './styles.css'
import * as d3 from 'd3'
import BarChart from '../components/BarChart.js'
import PlayerSelector from '../components/PlayerSelector.js'
import dataCSV from './data/ligue1_2017-2018.csv'

function FirstViz(){
    
    const [data, setData] = useState([])
    const [player, setPlayer] = useState("Mbappé")
    const [team, setTeam] = useState("Paris S-G")

    useEffect(() => {
        d3.csv(dataCSV).then( function(d){
            setData(d)
        })
    })

   
    
    const setSelectedPlayer = (newSelected) =>{

    }

    return (
        <div className="App">
            <p>Club Comparison</p>
            <BarChart data={data} selectedTeam={team}  />
            <PlayerSelector onSetSelected={setSelectedPlayer}/>
        </div>
    );
}

export default FirstViz;