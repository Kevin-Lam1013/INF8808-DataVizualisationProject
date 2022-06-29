import * as d3 from "d3";
import React, { useRef, useEffect, useState } from "react";
import _, { map } from "underscore";

function Bracket(props) {
  const ref = useRef();
  const [bracketData, setData] = useState({});
  const [team, setTeam] = useState("");

  const width = 500,
    height = 680,
    labelHeight = 50,
    labelWidth = 120;

  useEffect(() => {
    if (_.isEqual(props.data, bracketData)) {
      return;
    } else {
      setData(props.data);
    }

    if (_.isEqual(props.teamSelected, team)) {
      return;
    } else {
      setTeam(props.teamSelected);
    }

    d3.select(ref.current).selectAll("*").remove();

    // append the svg object to the body of the page
    var svg = d3
      .select(ref.current)
      .attr("width", width + 250)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(100,0)");
    // Create the cluster layout:
    var cluster = d3.cluster().size([height, width - 25]); // 100 is the margin I will have on the right side

    // Give the data to this cluster layout:
    var root = d3.hierarchy(props.data, function (d) {
      return d.children;
    });

    cluster(root);

    // Create tooltip
    var Tooltip = d3
      .select("#container")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px");

    // Add the links between nodes:
    svg
      .selectAll("path")
      .data(root.descendants().slice(1))
      .enter()
      .append("path")
      .attr("d", function (d) {
        return (
          "M" +
          (width - d.y) +
          "," +
          d.x +
          " " +
          (width - d.parent.y) +
          "," +
          d.x +
          " " +
          (width - d.parent.y) +
          "," +
          d.parent.x + // 50 and 150 are coordinates of inflexion, play with it to change links shape
          " " +
          (width - d.parent.y) +
          "," +
          d.parent.x
        );
      })
      .style("fill", "none")
      .attr("stroke", "#A3A6A8")
      .transition()
      .duration(2500)
      .attr("opacity", 1);

    // Add a circle for each node.
    var node = svg
      .selectAll("g")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("transform", function (d) {
        return "translate(" + (width - d.y - 80) + "," + (d.x - 25) + ")";
      });

    node
      .append("rect")
      .attr("height", labelHeight)
      .attr("width", labelWidth + 15)
      .style("fill", "white")
      .style("opacity", 0.8)
      .attr("transform", function (d) {
        return "translate(0, -1)";
      })
      .on("mouseover", function (d) {
        
        Tooltip.style("opacity", 1);
        d3.select(this).style("stroke", "black").style("opacity", 1);
      })
      .on("mousemove", function (d) {
        const target = d.target.__data__.data;
        console.log(props.teamSelected);

        Tooltip.html(() => {
          var content = "";

          if (
            target.a === props.teamSelected ||
            target.b === props.teamSelected
          ) {
            content =
              props.teamSelected === "France"
                ? "Benzema scored " +
                  target.benzemaGls +
                  " and assisted " +
                  target.benzemaAst +
                  "<br> Mbappé scored " +
                  target.mbappeGls +
                  " and assisted " +
                  target.mbappeAst
                : "Mané scored " +
                  target.maneGls +
                  " and assisted " +
                  target.maneAst;
          }
          else{
            Tooltip.style("opacity", 0);
          }
          return content;
        })
          .style("left", d3.pointer[0] + 70)
          .style("top", d3.pointer[1])
      })
      .on("mouseleave", function (d) {
        Tooltip.style("opacity", 0);
        d3.select(this).style("stroke", "none").style("opacity", 0.8);
      });

    node
      .append("text")
      .attr("dx", -(labelWidth / 2) + 65)
      .attr("dy", labelHeight / 2 - 12)
      .attr("text-anchor", "start")
      .style("font-size", "11px")
      .style("font-weight", function (d) {
        return d.data.a === props.teamSelected ? 1000 : 500;
      })
      .style("fill", function (d) {
        return d.data.a === props.teamSelected ? "darkOrange" : "black";
      })
      .text(function (d) {
        return `${d.data.a} : ${d.data.aScore}`;
      })
      .transition()
      .duration(2500)
      .attr("opacity", 1);

    node
      .append("text")
      .attr("dx", -(labelWidth / 2) + 65)
      .attr("dy", labelHeight - 12)
      .attr("text-anchor", "start")
      .style("font-size", "11px")
      .style("font-weight", function (d) {
        return d.data.b === props.teamSelected ? 1000 : 500;
      })
      .style("fill", function (d) {
        return d.data.b === props.teamSelected ? "darkOrange" : "black";
      })
      .text(function (d) {
        return `${d.data.b} : ${d.data.bScore}`;
      })
      .transition()
      .duration(2500)
      .attr("opacity", 1);

    return;
  }, [props.data]);

  return (
    <div id="container">
      <svg ref={ref}></svg>
    </div>
  );
}

export default Bracket;