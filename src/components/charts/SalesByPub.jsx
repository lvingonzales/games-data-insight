import * as d3 from "d3";
import * as colors from "./Colours.json";
import { useEffect, useRef, useState } from "react";

function SalesByPub() {
  const [data, setData] = useState(undefined);
  const chartRef = useRef();
  const width = 1500;
  const height = 844;

  useEffect(() => {
    d3.json("/salesByPub.json").then(function (data) {
      data.children.forEach((d) => {
        if (d.children) {
          d.children.forEach((dChild) => {
            dChild.name = dChild.name.replace(/\s+/g, "");
          });
        }
        d.name = d.name.replace(/\s+/g, "");
      });
      console.log(data);
      setData(data);

      function tile(node, x0, y0, x1, y1) {
        d3.treemapBinary(node, 0, 0, width, height);
        for (const child of node.children) {
          child.x0 = x0 + (child.x0 / width) * (x1 - x0);
          child.x1 = x0 + (child.x1 / width) * (x1 - x0);
          child.y0 = y0 + (child.y0 / height) * (y1 - y0);
          child.y1 = y0 + (child.y1 / height) * (y1 - y0);
        }
      }

      const hierarchy = d3
        .hierarchy(data)
        .sum((d) => d.value)
        .sort((a, b) => b.value - a.value);
      const root = d3.treemap().tile(tile)(hierarchy);

      console.log("[heirarchy]", hierarchy);

      const x = d3.scaleLinear().rangeRound([0, width]);
      const y = d3.scaleLinear().rangeRound([0, height]);

      const format = d3.format(".2f");
      const name = (d) =>
        d
          .ancestors()
          .reverse()
          .map((d) => d.data.name)
          .join("/");

      const svg = d3
        .select(chartRef.current)
        .append("svg")
        .attr("viewBox", [0.5, -30.5, width, height + 30])
        .attr("width", width)
        .attr("height", height + 30)
        .attr("style", "max-width: 100%; height: auto;")
        .style("font", "12px sans-serif");

      let group = svg.append("g").call(render, root);

      const myColor = (parentColor, min, max) => {
        return d3.scaleLinear().domain([0, max]).range(["white", parentColor]);
      };

      function render(group, root) {
        const node = group
          .selectAll("g")
          .data(root.children.concat(root))
          .join("g");

        node
          .filter((d) => (d === root ? d.parent : d.children))
          .attr("cursor", "pointer")
          .on("click", (event, d) => (d === root ? zoomout(root) : zoomin(d)));

        node.append("title").text((d) => `${name(d)}\n${format(d.value)}`);

        node
          .append("rect")
          .attr("id", (d) => (d.leafUid = d3.select("leaf")).id)
          .attr("fill", (d) => {
            if (d.depth === 0) {
              // Root level
              return "#fff";
            } else if (d.depth === 1) {
              // Publisher level
              return colors[d.data.name];
            } else if (d.depth === 2) {
              // Game level
              let min = d3.min(d.parent.children, d => d.value);
              let max = d3.max(d.parent.children, d => d.value);
              console.log(min);
              let colorScale = myColor(colors[d.parent.data.name], min, max);
              
              return colorScale(d.value);
            } else if (d.depth === 3) {
              // Region level
              return colors[d.data.name];
            } else {
              return "#ccc";
            }
          })
          .attr("stroke", "#fff");

        node
          .append("clipPath")
          .attr("id", (d) => (d.clipUid = d3.select("clip")).id)
          .append("use")
          .attr("xlink:href", (d) => d.leafUid.href);

        node
          .append("text")
          .attr("clip-path", null)
          .attr("font-weight", (d) => (d === root ? "bold" : null))
          .selectAll("tspan")
          .data((d) => {
            const nameText = d === root ? name(d) : d.data.name;
            const splitText =
              d === root ? [nameText] : nameText.split(/(?=[A-Z][^A-Z])/g);
            return splitText.concat(format(d.value));
          })
          .join("tspan")
          .attr("x", 3)
          .attr(
            "y",
            (d, i, nodes) =>
              `${(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`
          )
          .attr("fill-opacity", (d, i, nodes) =>
            i === nodes.length - 1 ? 0.7 : null
          )
          .attr("font-weight", (d, i, nodes) =>
            i === nodes.length - 1 ? "normal" : null
          )
          .style("fill", "#1b1b1b")
          .text((d) => d);

        group.call(position, root);
      }

      function position(group, root) {
        group
          .selectAll("g")
          .attr("transform", (d) =>
            d === root ? `translate(0,-30)` : `translate(${x(d.x0)},${y(d.y0)})`
          )
          .select("rect")
          .attr("width", (d) => (d === root ? width : x(d.x1) - x(d.x0)))
          .attr("height", (d) => (d === root ? 30 : y(d.y1) - y(d.y0)));
      }

      function zoomin(d) {
        const group0 = group.attr("pointer-events", "none");
        const group1 = (group = svg.append("g").call(render, d));

        x.domain([d.x0, d.x1]);
        y.domain([d.y0, d.y1]);

        svg
          .transition()
          .duration(750)
          .call((t) => group0.transition(t).remove().call(position, d.parent))
          .call((t) =>
            group1
              .transition(t)
              .attrTween("opacity", () => d3.interpolate(0, 1))
              .call(position, d)
          );
      }

      function zoomout(d) {
        const group0 = group.attr("pointer-events", "none");
        const group1 = (group = svg.insert("g", "*").call(render, d.parent));

        x.domain([d.parent.x0, d.parent.x1]);
        y.domain([d.parent.y0, d.parent.y1]);

        svg
          .transition()
          .duration(750)
          .call((t) =>
            group0
              .transition(t)
              .remove()
              .attrTween("opacity", () => d3.interpolate(1, 0))
              .call(position, d)
          )
          .call((t) => group1.transition(t).call(position, d.parent));
      }
    });
  }, []);

  return <div ref={chartRef}></div>;
}

export default SalesByPub;
