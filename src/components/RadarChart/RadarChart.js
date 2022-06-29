import * as d3 from "d3";
import React, { useRef } from "react";

function wrap(text, width) {
  text.each(function () {
      var text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1, // ems
          x = text.attr("x"),
          y = text.attr("y"),
          dy = 0, //parseFloat(text.attr("dy")),
          tspan = text.text(null)
                      .append("tspan")
                      .attr("x", x)
                      .attr("y", y)
                      .attr("dy", dy + "em");
      while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
              line.pop();
              tspan.text(line.join(" "));
              line = [word];
              tspan = text.append("tspan")
                          .attr("x", x)
                          .attr("y", y)
                          .attr("dy", ++lineNumber * lineHeight + dy + "em")
                          .text(word);
          }
      }
  });
}

function RadarChart(props) {
  const ref = useRef();

  const margin = { top: 50, right: 50, bottom: 50, left: 50 },
    width = 650 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

  d3.select(ref.current).selectAll("*").remove();

  let svg = d3.select(ref.current).attr("width", width).attr("height", height);

  let radialScale = d3
    .scaleLinear()
    .domain([0, 100])
    .range([0, 100]);
  let ticks = [20, 40, 60, 80, 100];

  ticks.forEach((t) =>
    svg
      .append("circle")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("fill", "none")
      .attr("stroke", "gray")
      .attr("r", radialScale(t))
  );

  ticks.forEach((t) =>
    svg
      .append("text")
      .attr("x", width / 2 + 5)
      .attr("y", height / 2 - radialScale(t))
      .transition()
      .duration(2500)
      .text(t.toString())
      .attr("opacity", 1)
  );

  function angleToCoordinate(angle, value) {
    let x = Math.cos(angle) * radialScale(value);
    let y = Math.sin(angle) * radialScale(value);
    return { x: width / 2 + x, y: height / 2 - y };
  }

  for (var i = 0; i < props.data.length; i++) {
    let ft_name = props.data[i].Statistic;
    let angle = Math.PI / 2 + (2 * Math.PI * i) / props.data.length;
    let line_coordinate = angleToCoordinate(angle, 100);
    let label_coordinate = 0
    if(i === 0 || i===3){
      label_coordinate = angleToCoordinate(angle, 140);
    }
    else{
      label_coordinate = angleToCoordinate(angle, 170);
    }

    //draw axis line
    svg
      .append("line")
      .attr("x1", width / 2)
      .attr("y1", height / 2)
      .attr("x2", line_coordinate.x)
      .attr("y2", line_coordinate.y)
      .attr("stroke", "black");

    //draw axis label
    svg
      .append("text")
      .attr("x", label_coordinate.x)
      .attr("y", label_coordinate.y)
      .style("text-anchor", "middle")
      .style("fill", "#095F78")
      .transition()
      .duration(2500)
      .attr("opacity", 1)
      .text(ft_name)
      .call(wrap, 30)
  }

  let line = d3
    .line()
    .x((d) => d.x)
    .y((d) => d.y);

  // for the animation
  let lineStart = d3
    .line()
    .x((d) => width / 2)
    .y((d) => height / 2);

  let coordinates = props.data.map((stat, i) => {
    let angle = Math.PI / 2 + (2 * Math.PI * i) / props.data.length;
    let coordinate = angleToCoordinate(angle, stat.Percentile);
    return coordinate;
  });
  coordinates.push(coordinates[0]); // close the radar

  //draw the path element
  svg
    .append("path")
    .datum(coordinates)
    .attr("d", lineStart)
    .transition()
    .duration(2500)
    .attr("d", line)
    .attr("stroke", "#6497B1")
    .attr("fill", "#E7EFF6");

  svg
    .select("path")
    .attr("stroke-width", 2)
    .attr("stroke-opacity", 1)
    .attr("fill-opacity", 0.8)
    .attr("opacity", 0.8);

  return (
    <div className="chart">
      <svg ref={ref}></svg>
    </div>
  );
}

export default RadarChart;
