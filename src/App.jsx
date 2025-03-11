import { extent, scaleLinear } from "d3";
import XAxis from "./components/axes/XAxis";
import "./App.css"
import YAxis from "./components/axes/YAxis";
import SalesByYear from "./components/charts/SalesByYear";


function App () {

    return (
        <>
            <SalesByYear />
        </>
    )
}



export default App;
