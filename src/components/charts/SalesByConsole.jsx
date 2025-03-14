import * as d3 from "d3";
import * as colors from "./Colours.json";
import { useEffect, useRef } from "react";

function SalesByConsole() {
  const chartRef = useRef();
  const width = 1000;
  const height = 563;
  const margin = { top: 10, right: 50, bottom: 30, left: 50 };

  useEffect(() => {
    d3.csv("/SalesByConsole.csv").then((data) => {
      if (data) {
        data.forEach((d) => {
          d.Sales = +d.Sales;
        });
      }

      console.log("[data-console]", data);

      // Set up the series
      const series = d3
        .stack()
        .keys(d3.union(data.map((d) => d.Region)))
        .value(([, D], key) => D.get(key).Sales)(
        d3.index(
          data,
          (d) => d.Console,
          (d) => d.Region
        )
      );
      console.log("[series]", series);

      // prepare the scales
      const x = d3
        .scaleBand()
        .domain(
          d3.groupSort(
            data,
            (D) => -d3.sum(D, (d) => d.Sales),
            (d) => d.Console
          )
        )
        .range([margin.left, width - margin.right])
        .padding(0.1);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(series, (d) => d3.max(d, (d) => d[1]))])
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
        .data(series)
        .join("g")
        .attr("fill", (d) => colors[d.key])
        .selectAll("rect")
        .data((D) => D.map((d) => ((d.key = D.key), d)))
        .join("rect")
        .attr("x", (d) => x(d.data[0]))
        .attr("y", (d) => height - 20)
        .attr("height", 0)
        .attr("width", x.bandwidth())
        .append("title")
        .text(
          (d) =>
            `${d.data[0]} ${d.key}\n${formatValue(d.data[1].get(d.key).Sales)}`
        );

      svg
        .append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));

      svg
        .append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${margin.left},0)`)
        .attr("fill", "#fff7f8")
        .call(d3.axisLeft(y).ticks(null, "s"));

      svg.selectAll(".axis .tick line").attr("fill", "#fff7f8");

      svg
        .selectAll("rect")
        .transition()
        .duration(500)
        .ease(d3.easeSin)
        .delay((d, i) => i * 50)
        .attr("y", (d) => y(d[1]))
        .attr("height", (d) => y(d[0]) - y(d[1]));
    });
  }, []);

  return <div ref={chartRef}></div>;
}

export default SalesByConsole;
