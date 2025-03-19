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
  const [xMin, xMax] = XScale.range();

  // Determine if the scale is categorical (band or point)
  const isCategorical = XScale.bandwidth || XScale.step;

  // Generate ticks based on the scale type
  const ticks = isCategorical
    ? XScale.domain() // Use the domain for categorical scales
    : XScale.ticks(numTicksForPixels((xMax - xMin), +tickDistance)); // Use ticks for numerical scales

  return (
    <g transform={`translate(0 ${innerHeight})`}>
      {/* Title text element */}
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
      {hasTicks
        ? ticks.map((tick) => {
            // Calculate the x position for the tick
            const x = isCategorical
              ? XScale(tick) + (XScale.bandwidth ? XScale.bandwidth() / 2 : 0) // Center ticks for band scales
              : XScale(tick); // Use the scale directly for numerical scales

            return (
              <g key={tick} transform={`translate(${x} 0)`}>
                {/* Tick label */}
                <text
                  y={10}
                  dy="0.8em"
                  textAnchor="middle"
                  fill={textColor}
                >
                  {tick}
                </text>

                {/* Tick line */}
                <line y1={0} y2={8} stroke={lineColor} />
              </g>
            );
          })
        : null}
    </g>
  );
}

export default XAxis;
