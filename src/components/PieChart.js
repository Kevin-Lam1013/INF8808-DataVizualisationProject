import * as d3 from "d3";
import React, { useRef, useEffect, useState } from "react";
import _, { map } from "underscore";

// Don't forget to add value in the pie
function PieChart(props) {
  const ref = useRef();

  const width = 450,
    height = 450,
    margin = 40;
  const radius = Math.min(width, height) / 2 - margin;

  const [d, setData] = useState([]);

  useEffect(() => {
    if (_.isEqual(props.data, d)) {
      return;
    } else {
      setData(props.data);
    }
    d3.select(ref.current).selectAll("*").remove();

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // color scale
    const color = d3.scaleOrdinal().range(d3.schemeSet2);

    // shape helper to build pie
    const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

    // pie position
    const pie = d3.pie().value(function (d) {
      return d[1];
    });
    const data_ready = pie(Object.entries(props.data));

    // pie chart
    svg
      .selectAll("pie")
      .data(data_ready)
      .join("path")
      .attr("d", arcGenerator)
      .attr("fill", function (d) {
        return color(d.data[1]);
      })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

    // Annotation
    svg
      .selectAll("pie")
      .data(data_ready)
      .join("text")
      .text(function (d) {
        return d.data[1];
      })
      .attr("transform", function (d) {
        return `translate(${arcGenerator.centroid(d)})`;
      })
      .style("text-anchor", "middle")
      .style("font-size", 17);

    return;
  }, [props.data]);

  return (
    <div className="chart">
      <svg ref={ref}></svg>
    </div>
  );
}

export default PieChart;
