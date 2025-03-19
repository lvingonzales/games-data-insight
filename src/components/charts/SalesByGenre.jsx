import * as d3 from "d3";
import * as colors from "./Colours.json";
import { useEffect, useRef } from "react";
import { useElementOnScreen } from "../Hooks";

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0,
};

function SalesByGenre() {
  const chartRef = useRef();
  const width = 1000;
  const height = 563;
  const margin = { top: 10, right: 50, bottom: 30, left: 50 };

  const [obeserverMask, chartVisible] = useElementOnScreen({
    ...options,
    threshold: 1,
  });

  useEffect(() => {
    d3.csv("/SalesByGenre.csv").then((data) => {
      if (data) {
        data.forEach((d) => {
          d.Sales = +d.Sales;
        });
      }

      console.log("[data-genre]", data);

      const fx = d3
        .scaleBand()
        .domain(new Set(data.map((d) => d.Genre)))
        .rangeRound([margin.left, width - margin.right])
        .paddingInner(0.1);

      const regions = new Set(data.map((d) => d.Region));
      const x = d3
        .scaleBand()
        .domain(regions)
        .rangeRound([0, fx.bandwidth()])
        .padding(0.05);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.Sales)])
        .nice()
        .rangeRound([height - margin.bottom, margin.top]);

      const formatValue = (x) => (isNaN(x) ? "N/A" : x.toLocaleString("en"));

      const svg = d3
        .select(chartRef.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto;");

      svg
        .append("g")
        .selectAll()
        .data(d3.group(data, (d) => d.Genre))
        .join("g")
        .attr("transform", ([state]) => `translate(${fx(state)},0)`)
        .selectAll()
        .data(([, d]) => d)
        .join("rect")
        .attr("x", (d) => x(d.Region))
        .attr("y", (d) => y(d.Sales))
        .attr("width", x.bandwidth())
        .attr("height", (d) => y(0) - y(d.Sales))
        .attr("fill", (d) => colors[d.Region]);

      svg
        .append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(fx).tickSizeOuter(0))
        .call((g) => g.selectAll(".domain").remove());

      svg
        .append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${margin.left},0)`)
        .attr("fill", "#fff7f8")
        .call(d3.axisLeft(y).ticks(null, "s"));
    });
  }, []);

  return (
    <div ref={obeserverMask}>
      <div ref={chartRef}></div>
    </div>
  );
}

export default SalesByGenre;
