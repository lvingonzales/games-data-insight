import * as d3 from "d3";
import * as React from "react";
import XAxis from "../axes/XAxis";
import YAxis from "../axes/YAxis";
import { useElementOnScreen } from "../Hooks";
import Card from "../Cards";
import Highlight from "../Highlight";

function SalesByYear() {
  const data = LoadData();

  const [obeserverMask, chartVisible] = useElementOnScreen({
    ...options,
    threshold: 0.1,
  });

  const width = 1000;
  const height = 563;
  const margin = { top: 10, right: 50, bottom: 30, left: 50 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xField = fields.year;
  const yField = fields.sales;

  const { accessor: xAccessor, title: xTitle } = xField;
  const { accessor: yAccessor, title: yTitle } = yField;

  if (!data) {
    return <div style={{ width, height }}> Loading Data Please Wait </div>;
  }

  const xExtent = d3.extent(data, xAccessor);
  const xScale = d3.scaleLinear().domain(xExtent).range([0, innerWidth]);
  const yExtent = d3.extent(data, yAccessor);
  const yScale = d3.scaleLinear().domain(yExtent).range([innerHeight, 0]);

  const points = data.map((d) => [xScale(d.year), yScale(d.sales), d.region]);
  const groups = d3.rollup(
    points,
    (v) => Object.assign(v, { z: v[0][2] }),
    (d) => d[2]
  );

  return (
    <div className="section">
      <div className="background">
        <h1>Sales By Console</h1>
        <h3>Sales figures in millions for the various consoles</h3>
        <div ref={obeserverMask}>
          <svg width={width} height={height}>
            <g transform={`translate(${margin.left} ${margin.top})`}>
              <XAxis
                XScale={xScale}
                title={xTitle}
                innerHeight={innerHeight}
                tickDistance={100}
                lineColor="#FFF7F8"
                textColor="#FFF7F8"
              />
              <Line groups={groups} chartVisible={chartVisible} />
              <YAxis
                YScale={yScale}
                title={yTitle}
                lineColor="#FFF7F8"
                textColor="#FFF7F8"
              />
              <g display="none">
                <circle r={2.5} />
                <text textAnchor="middle" y={-8}></text>
              </g>
            </g>
          </svg>
        </div>
      </div>
      <div>
        <Card>
          <p>
            First we will be looking at the Sales By Year for the Four Regions,
            <Highlight color={"#67FF4C"}>North America</Highlight>,{" "}
            <Highlight color={"#6CB0FF"}>Europe</Highlight>,{" "}
            <Highlight color={"#FD8888"}>Japan</Highlight>, and{" "}
            <Highlight color={"#FFD455"}>Other</Highlight>.
          </p>
        </Card>
        <Card ref={obeserverMask}>
            <p>
              <em style={{ fontWeight: "bold" }}>2009</em> had the most
              successful game releases of the top 200 with
              <em style={{ fontWeight: "bold" }}> 180.85 million</em> copies
              sold between just <em style={{ fontWeight: "bold" }}>14 games</em>
              .{" "}
              <Highlight color={"#FF0000"} textColor="#fff7f8">
                Nintendo
              </Highlight>
              continues to dominate having published 5 of the 14 games.
            </p>
          </Card>
      </div>
    </div>
  );
}

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 100,
};

function Line({ groups, chartVisible }) {
  const pathRef = React.useRef();

  const line = d3.line();

  const paths = d3
    .select(pathRef.current)
    .attr("fill", "none")
    .attr("stroke-width", 2)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .selectAll("path")
    .data(groups.values())
    .join("path")
    .attr("class", "year-paths")
    .style("mix-blend-mode", "multiply")
    .attr("d", line);

  console.log(chartVisible);
  if (chartVisible) {
    paths.each(function () {
      const path = d3.select(this);
      const length = path.node().getTotalLength();

      path.attr("stroke", function (d) {
        return colours[d.z ? d.z : "steelblue"];
      });

      path
        .attr("stroke-dasharray", length)
        .attr("stroke-dashoffset", length)
        .transition()
        .delay(500)
        .duration(2500)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0);
    });
  }
  return <g ref={pathRef}></g>;
}

function LoadData() {
  const [data, setData] = React.useState(undefined);
  React.useEffect(() => {
    fetch("/salesbyYear.csv")
      .then((response) => response.text())
      .then((csvString) => {
        const data = d3.csvParse(csvString, (row) => {
          return {
            region: row.Region,
            year: +row.Year,
            sales: +row.Sales,
          };
        });
        //console.log("[data]", data);

        setData(data);
      });
  }, []);

  return data;
}

const fields = {
  region: {
    accessor: (d) => d.region,
    title: "Region",
  },
  year: {
    accessor: (d) => d.year,
    title: "Year",
  },
  sales: {
    accessor: (d) => d.sales,
    title: "Sales(millions)",
  },
};

const colours = {
  NA: "#67FF4C",
  EU: "#6CB0FF",
  JP: "#FD8888",
  Other: "#FFD455",
};

export default SalesByYear;
