import * as d3 from 'd3';
import React, {useRef, useEffect, useState} from 'react';

function BarChart(props){
    const ref = useRef();

const margin = {top: 20, right: 30, bottom: 40, left: 90},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
    
        const svg = d3.select(ref.current)
            .attr("width", width)
            .attr("height", height)
            .style("border", "none")
            .append('g')
            .attr("transform", `translate(${margin.left}, ${margin.top})`);
         //const svg = d3.select(ref.current)
         const x = d3.scaleLinear()
         .domain([0, 100])
         .range([ 0, 100]);
     svg.append("g")
         .attr("transform", `translate(0, ${height})`)
         .call(d3.axisBottom(x))
         .selectAll("text")
         .attr("transform", "translate(-10,0)rotate(-45)")
         .style("text-anchor", "end");
 
     // Y axis
     const y = d3.scaleBand()
         .range([ 0, height ])
         .domain(props.data.map((d) => d.Squad))
         .padding(.1);
     svg.append("g")
         .call(d3.axisLeft(y))
 
     //Bars
     svg.selectAll("myRect")
         .data(props.data)
         .enter()
         .append("rect")
         .attr("x", x(0) )
         .attr("y", d => y(d.Squad))
         .attr("width", d => x(d.Pts))
         .attr("height", y.bandwidth())
         .attr("fill", "#69b3a2")
    return (
        <div className="chart">
            <svg ref={ref}>
            </svg>
        </div>
        
    )

}

export default BarChart;