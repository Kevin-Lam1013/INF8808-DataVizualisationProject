import * as d3 from "d3";
import React, { useRef, useEffect, useState } from "react";
import _, { map } from "underscore";

function PieChart(props) {
  const ref = useRef();

  const width = 450,
    height = 450,
    margin = 40,
    labelHeight = 18;
  const radius = Math.min(width, height) / 2 - margin;
  const legendLabel = {
    Goal: "Goals scored",
    Assist: "Goals assisted",
    TeamGoal: "Goals scored by the team",
  };

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
      .attr("width", width + 150)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // color scale
    const color = d3
      .scaleOrdinal()
      .domain(["Goals scored", "Goals assisted", "Goals scored by the team"])
      .range(d3.schemeSet2);

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
      .transition()
      .duration(1000)
      .attr("d", arcGenerator)
      .attr("fill", function (d) {
        return color(d.data[1]);
      })
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

    // Legend
    const legend = svg
      .selectAll(".legend")
      .data(data_ready)
      .enter()
      .append("g")
      .attr("transform", function (d, i) {
        return "translate(" + 220 + "," + (i * 15 + 20) + ")";
      })
      .attr("class", "legend");

    legend
      .append("rect")
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", function (d) {
        return color(d.data[1]);
      });

    legend
      .append("text")
      .text(function (d) {
        return legendLabel[d.data[0]];
      })
      .style("font-size", 12)
      .attr("y", 10)
      .attr("x", 11);

    return;
  }, [props.data]);

  return (
    <div className="chart">
      <svg ref={ref}></svg>
    </div>
  );
}

export default PieChart;
