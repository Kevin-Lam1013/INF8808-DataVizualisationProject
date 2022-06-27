import * as d3 from "d3";
import React, { useRef, useEffect, useState } from "react";
import _, { map } from "underscore";
import styles from "../Bracket/styles.css";

// missing labels
function Bracket(props) {
  const ref = useRef();
  const [bracketData, setData] = useState({});

  var width = 460;
  var height = 460;

  useEffect(() => {
    if (_.isEqual(props.data, bracketData)) {
      return;
    } else {
      setData(props.data);
    }
    d3.select(ref.current).selectAll("*").remove();

    // append the svg object to the body of the page
    var svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(40,0)"); // bit of margin on the left = 40

    // Create the cluster layout:
    var cluster = d3.cluster().size([height, width - 100]); // 100 is the margin I will have on the right side

    // Give the data to this cluster layout:
    var root = d3.hierarchy(props.data, function (d) {
      return d.children;
    });

    cluster(root);

    // Add the links between nodes:
    svg
      .selectAll("path")
      .data(root.descendants().slice(1))
      .enter()
      .append("path")
      .attr("d", function (d) {
        return (
          "M" +
          d.y +
          "," +
          d.x +
          "C" +
          (d.parent.y + 50) +
          "," +
          d.x +
          " " +
          (d.parent.y + 150) +
          "," +
          d.parent.x + // 50 and 150 are coordinates of inflexion, play with it to change links shape
          " " +
          d.parent.y +
          "," +
          d.parent.x
        );
      })
      .style("fill", "none")
      .attr("stroke", "#ccc");

    // Add a circle for each node.
    svg
      .selectAll("g")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("transform", function (d) {
        return "translate(" + d.y + "," + d.x + ")";
      })
      .append("circle")
      .attr("r", 7)
      .style("fill", "#69b3a2")
      .attr("stroke", "black")
      .style("stroke-width", 2);

    return;
  }, [props.data]);

  return (
    <div id="container">
      <svg ref={ref}></svg>
    </div>
  );
}

export default Bracket;
