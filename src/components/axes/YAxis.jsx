import * as d3 from "d3";
import { numTicksForPixels } from "./AxisHelpers";

// YScale, InnerHeight and Title are Required fields
function YAxis({
  YScale,
  title,
  textColor = "black",
  lineColor = "grey",
  className,
  hasTicks = true,
  tickDistance = 70,
}) {
  // use the provided scale to find the minimum and maximum value
  const [yMin, yMax] = YScale.range();
  const ticks = YScale.ticks(numTicksForPixels((yMax - yMin), +tickDistance));
  return (
    <g transform={`translate(0, 0)`}>
      {/* title text element */}
      <text
        dx={4}
        dy="0.8em"
        fill={textColor}
        className={className}
      >
        {title}
      </text>
      {/* Axis line */}
      <line x1={0} x2={0} y1={yMin} y2={yMax} stroke={lineColor} />

      {/* Axis Ticks */}
      {/* Checks first if the chart has ticks enabled and displays them if true */}
      {hasTicks
        ? ticks.map((tick) => {
            const y = YScale(tick);
            return (
              <g key={tick} transform={`translate(0 ${y})`}>
                <text
                  dx={-12}
                  dy="0.8em"
                  textAnchor="end"
                  fill={textColor}
                >
                    {tick}
                </text>
                <line x1={0} x2={-8} stroke={lineColor} />
              </g>
            );
          })
        : null}
    </g>
  );
}

export default YAxis;
