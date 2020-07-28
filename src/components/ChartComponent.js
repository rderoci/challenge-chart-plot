import React, {Component} from 'react';
import CanvasJSReact from './../assets/canvasjs.react';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ChartComponent extends Component{

    componentDidUpdate() {
    }

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <>
                <div className="chart-component">
                  <CanvasJSChart options = {this.props.chartData} />
                </div>
            </>
        )
    }

}
export default ChartComponent;

