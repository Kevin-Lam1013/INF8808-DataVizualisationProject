import * as d3 from 'd3';
import React, {useRef, useEffect, useState} from 'react';
import dataCsv from '../data/laLiga_2017-2018.csv'

function BarChart(){
    const ref = useRef();

const margin = {top: 20, right: 30, bottom: 40, left: 90},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
    const [data, setData] = useState([{}])

    useEffect(() => {        
        

        d3.csv(dataCsv, (d) => {
            setData(d)
        })

        const svg = d3.select(ref.current)
            .attr("width", width)
            .attr("height", height)
            .style("border", "none")
            .append('g')
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

    }, []);

    useEffect(() => {
        draw();
    }, [data]);

    const draw = () => {
        
        const svg = d3.select(ref.current)
        const x = d3.scaleLinear()
        .domain([0, 13000])
        .range([ 0, width]);
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Y axis
    const y = d3.scaleBand()
        .range([ 0, height ])
        //.domain(this.props.data.map(d => d.Squad))
        .padding(.1);
    svg.append("g")
        .call(d3.axisLeft(y))

    //Bars
    svg.selectAll("myRect")
        .data(data)
        .join("rect")
        .attr("x", x(0) )
        .attr("y", d => y(d.Squad))
        .attr("width", d => x(d.Pts))
        .attr("height", y.bandwidth())
        .attr("fill", "#69b3a2")
    }


    return (
        <div className="chart">
            <svg ref={ref}>
            </svg>
        </div>
        
    )

}

export default BarChart;