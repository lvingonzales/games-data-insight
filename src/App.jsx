import { extent, scaleLinear } from "d3";
import XAxis from "./components/axes/XAxis";
import "./App.css"
import YAxis from "./components/axes/YAxis";


function App () {

    const innerWidth = 650;
    const innerHeight = 360;
    const xField = fields.years;
    const yField = fields.values;

    const {accessor: xAccessor, title: xTitle} = xField;
    const {accessor: yAccessor, title: yTitle} = yField;
    
    const xExtent = extent(data, xAccessor)
    const xScale = scaleLinear().domain(xExtent).range([0, innerWidth])
    const yExtent = extent(data, yAccessor)
    const yScale = scaleLinear().domain(yExtent).range([innerHeight, 0])

    return (
        <>
            <svg width={800} height={400}>
                <g transform={`translate(50 10)`}>
                    <XAxis XScale={xScale} title={xTitle} innerHeight={innerHeight} tickDistance={100} />
                    <YAxis YScale={yScale} title={yTitle} /> 
                </g>
            </svg>
        </>
    )
}

const data = [
    {
        year: 2000,
        value: 10
    },
    {
        year: 2002,
        value: 30
    },
    {
        year: 2003,
        value: 100
    },
    {
        year: 2004,
        value: 60
    },
    {
        year: 2005,
        value: 50
    }
]

const fields = {
    years: {
        accessor: (d) => d.year,
        title: "Years"
    },
    values: {
        accessor: (d) => d.value,
        title: "Value"
    }
}
export default App;
