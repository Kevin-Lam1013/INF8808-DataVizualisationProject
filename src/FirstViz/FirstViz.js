import React, { useEffect, useState} from "react";
import styles from './styles.css'
import * as d3 from 'd3'
import BarChart from '../components/BarChart.js'

function FirstViz(){
    
    const margin = {top: 20, right: 30, bottom: 40, left: 90},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    const [data, setData] = useState({})

    d3.csv('./data/test.csv', function(dataaa){
        //setData(d)
        //console.log(data)
        console.log(dataaa)
    })
     

    return (
        <div className="App">
            <BarChart margin={margin} width={width} height={height} data={data}  />
        </div>
    );
}

export default FirstViz;