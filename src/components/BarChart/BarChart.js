import * as d3 from 'd3';
import React, {useRef, useEffect, useState} from 'react';
import _, {map} from 'underscore'
import styles from '../BarChart/styles.css'

function BarChart(props){
    const ref = useRef();

const margin = {top: 0, right: 30, bottom: 0, left: 100},
    width = 600 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;


    const [d, setData] = useState([])


    useEffect(() => {
        if(_.isEqual(props.data, d)){
            return
        }else{
            setData(props.data)
        }
        d3.select(ref.current).selectAll("*").remove()
        
        const svg = d3.select(ref.current)
            .attr("width", width)
            .attr("height", height)
            .style("border", "none")
            .append('g')
            .attr("transform", `translate(${margin.left}, ${margin.top})`);
         //const svg = d3.select(ref.current)
         const x = d3.scaleLinear()
         .domain([0,100])
         .range([ 0, width*0.8]);
     svg.append("g")
         .attr("transform", `translate(0, ${height})`)
         .call(d3.axisBottom(x))
         .select('.domain')
         .attr('stroke-width',0)
         .style('font-family','Roboto')
         .selectAll("text")
         .attr("transform", "translate(-10,0)rotate(-45)")
         .style("text-anchor", "end");
 
     // Y axis
     const y = d3.scaleBand()
         .range([ 0, height ])
         .domain(props.data.map((d) => d.Squad))
         .padding(.1);
     svg.append("g")
         .call(d3.axisLeft(y).tickSize(0))
         .select('.domain')
         .attr('stroke-width',0)
         .style('font-family','Roboto')
 
     //Bars
     svg.selectAll("myRect")
         .data(props.data)
         .enter()
         .append("rect")
         .attr("x", x(0) )
         .attr("y", d => y(d.Squad))
         .attr("width", d => x(d.Pts))
         .attr("height", y.bandwidth())
         .attr("fill", (d) => {
            if(d.Squad == props.selectedTeam){
                return '#FF4F00'
            }
            else{
                return '#D9D9D9'
            }
         })

         svg.selectAll("myRect")
         .data(props.data)
         .enter()
         .append("g") .append("text")
         .attr("class", "label")
         //y position of the label is halfway down the bar
         .attr("y", function (d) {
             return y(d.Squad) + y.bandwidth() / 2 + 4;
         })
         //x position is 3 pixels to the right of the bar
         .attr("x", function (d) {
             return x(d.Pts) + 3;
         })
         .text(function (d) {
             return d.Pts;
         })
         .style('font-size', '0.8rem')
         .style('font-family', 'Roboto');
        
        return

    },[props.data])

    
    return (
        <div className="chart">
            <svg ref={ref}>
            </svg>
        </div>
        
    )

}

export default BarChart;