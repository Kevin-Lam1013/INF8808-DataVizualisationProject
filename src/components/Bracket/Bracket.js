import * as d3 from "d3";
import React, { useRef, useEffect, useState } from "react";
import _, { map } from "underscore";
import styles from "../Bracket/styles.css";

function Bracket(props) {
  const ref = useRef();
  const [data, setData] = useState([]);

  const margin = { top: 40, right: 90, bottom: 50, left: 150 },
    width = 900 - margin.left - margin.right,
    height = 650 - margin.top - margin.bottom,
    separationConstant = 1;

  const boxWidth = 150,
    boxHeight = 40;

  // adds labels to the nodes
  // *** Hardcoded to France ***
  const gameTemplate = (nodeData) => {
    return (
      <div>
        <div className={`row ${nodeData.data.a === "France" ? " target" : ""}`}>
          <span className="cell name">{nodeData.data.a}</span>
          <span className="cell score">{nodeData.data.aScore}</span>
        </div>
        <div className={`row ${nodeData.data.b === "France" ? " target" : ""}`}>
          <span className="cell name">{nodeData.data.b}</span>
          <span className="cell score">{nodeData.data.bScore}</span>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (_.isEqual(props.data, data)) {
      return;
    } else {
      setData(props.data);
    }
    d3.select(ref.current).selectAll("*").remove();

    // Lines of the tournament bracket
    var line = d3
      .line()
      .x((d) => width - d.y)
      .y((d) => d.x)
      .curve(d3.curveStep);

    // tree layout
    var treemap = d3
      .tree()
      .size([height, width])
      .separation((a, b) => (a.parent === b.parent ? 1 : separationConstant));

    // assign data to nodes
    var nodes = d3.hierarchy(props.data);

    // map data for the tree layout
    nodes = treemap(nodes);

    const svg = d3
      .select(ref.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    const g = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Links between nodes
    g.selectAll(".link")
      .data(nodes.descendants().slice(1))
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", (d) => line([d, d.parent]))
      .classed("class", (d) => d.data.target);

    // labels for each nodes
    d3.select("#labels")
      .selectAll("g")
      .data(nodes.descendants())
      .enter()
      .append("div")
      .classed("table", true)
      .classed("played", (d) => d.data.aScore || d.data.bScore)
      .style("left", (d) => width - d.y + margin.left - 100 + "px")
      .style(
        "top",
        (d) =>
          d.x + (!d.data.b ? 12 : 0) + (!d.data.children ? -4 : 0) + 10 + "px"
      )
      .html(function (d) {
        gameTemplate(d);
      });

    return;
  }, [props.data]);

  return (
    <div className="bracket">
      <svg ref={ref}></svg>
    </div>
  );
}

export default Bracket;
