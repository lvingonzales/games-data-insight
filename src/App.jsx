import { extent, scaleLinear } from "d3";
import XAxis from "./components/axes/XAxis";
import "./App.css"
import YAxis from "./components/axes/YAxis";
import SalesByYear from "./components/charts/SalesByYear";
import SalesByPub from "./components/charts/SalesByPub";


function App () {

    return (
        <>
            <SalesByYear />
            <SalesByPub />
        </>
    )
}



export default App;
