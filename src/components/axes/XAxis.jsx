import * as d3 from "d3";
import { numTicksForPixels } from "./AxisHelpers";

// XScale, InnerHeight and Title are Required fields
function XAxis({
  XScale,
  title,
  innerHeight,
  textColor = "black",
  lineColor = "grey",
  className,
  hasTicks = true,
  tickDistance = 70,
}) {
  // use the provided scale to find the minimum and maximum value
  const [xMin, xMax] = XScale.range();
  const ticks = XScale.ticks(numTicksForPixels((xMax - xMin), +tickDistance));
  return (
    <g transform={`translate(0 ${innerHeight})`}>
      {/* title text element */}
      <text
        x={xMax}
        textAnchor="end"
        dy={-4}
        fill={textColor}
        className={className}
      >
        {title}
      </text>
      {/* Axis line */}
      <line x1={xMin} x2={xMax} y1={0} y2={0} stroke={lineColor} />

      {/* Axis Ticks */}
      {/* Checks first if the chart has ticks enabled and displays them if true */}
      {hasTicks
        ? ticks.map((tick) => {
            const x = XScale(tick);
            return (
              <g key={tick} transform={`translate(${x} 0)`}>
                <text
                  y={10}
                  dy="0.8em"
                  textAnchor="middle"
                  fill={textColor}
                >
                    {tick}
                </text>
                <line y1={0} y2={8} stroke={lineColor} />
              </g>
            );
          })
        : null}
    </g>
  );
}

export default XAxis;
