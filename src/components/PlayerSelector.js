import React, {useState, useEffect} from 'react'
import BarChart from './BarChart'

function PlayerSelector(props){

    const [selectedPlayer, setSelectedPlayer] = useState("Mbappé")  

    function changeSelected(newSelected){
        setSelectedPlayer(newSelected)
        props.onSetSelected(newSelected)
    }

    return(
        <div>
            <p>{selectedPlayer}</p>
        </div>
    )
}

export default PlayerSelector;