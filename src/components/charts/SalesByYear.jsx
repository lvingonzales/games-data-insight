import * as d3 from "d3";
import * as React from "react";
import XAxis from "../axes/XAxis";
import YAxis from "../axes/YAxis";

function SalesByYear() {
  const data = LoadData();

  const width = 1000;
  const height = 500;
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

  //console.log("[groups]", groups);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left} ${margin.top})`}>
        <XAxis
          XScale={xScale}
          title={xTitle}
          innerHeight={innerHeight}
          tickDistance={100}
        />
        <Line groups={groups} />
        <YAxis YScale={yScale} title={yTitle} />
      </g>
    </svg>
  );
}

function Line({ groups }) {
  const pathRef = React.useRef();

  const line = d3.line()

  const paths = d3
    .select(pathRef.current)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .selectAll("path")
    .data(groups.values())
    .join("path")
    .attr("class", "year-paths")
    .style("mix-blend-mode", "multiply")
    .attr("d", line);

  paths.each(function () {
    const path = d3.select(this);
    const length = path.node().getTotalLength();

    path
      .attr("stroke-dasharray", length)
      .attr("stroke-dashoffset", length)
      .transition()
      .duration(1000)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0);
  });

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

export default SalesByYear;
