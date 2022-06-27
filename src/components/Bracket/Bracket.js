import * as d3 from "d3";
import React, { useRef, useEffect, useState } from "react";
import _, { map } from "underscore";
import styles from "../Bracket/styles.css";
import franceBracket from "./france_bracket.json";

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
    console.log("wefnweiofwofwefw");
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
    if (_.isEqual(props.data, data) || _.isEqual(props.data, {})) {
      return;
    } else {
      setData(props.data);
    }
    d3.select(ref.current).selectAll("*").remove();

    // Lines of the tournament bracket
    var margin = { top: 40, right: 90, bottom: 50, left: 150 },
      width = 900 - margin.left - margin.right,
      height = 650 - margin.top - margin.bottom,
      separationConstant = 1;

    var treeData = franceBracket;

    // line connector between nodes
    var line = d3
      .line()
      .x((d) => width - d.y)
      .y((d) => d.x)
      .curve(d3.curveStep);

    // declares a tree layout and assigns the size
    var treemap = d3
      .tree()
      .size([height, width])
      .separation((a, b) => (a.parent == b.parent ? 1 : separationConstant));

    //  assigns the data to a hierarchy using parent-child relationships
    var nodes = d3.hierarchy(treeData);

    // maps the node data to the tree layout
    nodes = treemap(nodes);

    var svg = d3
      .select(ref.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    var g = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // adds the links between the nodes
    var link = g
      .selectAll(".link")
      .data(nodes.descendants().slice(1))
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", (d) => line([d, d.parent]))
      .classed("win", (d) => d.data.win);

    // adds labels to the nodes
    function gameTemplate(d) {
      return (
        "" +
        "<div class='row" +
        (d.data.ascore > d.data.bscore ? " winner" : "") +
        "'>" +
        "<span class='cell name'>" +
        d.data.a +
        "</span>" +
        "<span class='cell score'>" +
        (d.data.ascore >= 0 ? d.data.ascore : "") +
        "</span>" +
        "</div>" +
        "<div class='row" +
        (d.data.bscore > d.data.ascore ? " winner" : "") +
        "'>" +
        "<span class='cell name'>" +
        (d.data.b || "") +
        "</span>" +
        "<span class='cell score'>" +
        (d.data.bscore >= 0 ? d.data.bscore : "") +
        "</span>" +
        "</div>"
      );
    }

    var labels = d3
      .select("#labels")
      .selectAll("div")
      .data(nodes.descendants())
      .enter()
      .append("div")
      .classed("table", true)
      .classed("played", (d) => d.data.ascore || d.data.bscore)

      .style("left", (d) => width - d.y + margin.left - 100 + "px")
      .style(
        "top",
        (d) =>
          d.x + (!d.data.b ? 12 : 0) + (!d.data.children ? -4 : 0) + 10 + "px"
      )
      .html((d) => gameTemplate(d));
    return;
  }, [props.data]);

  return (
    <div className="bracket" id="container">
      <svg ref={ref}></svg>
      <div id="labels"></div>
    </div>
  );
}

export default Bracket;
