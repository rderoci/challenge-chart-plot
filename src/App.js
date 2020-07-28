import React, { Component } from 'react';
import HeaderComponent from './components/HeaderComponent';
import InputCommandComponent from './components/InputCommandComponent';
import FooterComponent from './components/FooterComponent';
import ChartComponent from './components/ChartComponent';

import './App.css'

class App extends Component {

  constructor(props, ws) {
    super(props);

    this.state = {commands:"", chartData: []};

    this.generateCharButtonClicked = this.generateCharButtonClicked.bind(this);
    this.onChangeInputCommand = this.onChangeInputCommand.bind(this);
  }

  componentDidMount() {
    this.connect();
  }

  connect = () => {
    var ws = new WebSocket("ws://localhost:8080/event");
    let that = this; // cache the this
    var connectInterval;

    // websocket onopen event listener
    ws.onopen = () => {
        console.log("connected websocket main component");

        this.setState({ ws: ws });

        that.timeout = 250; // reset timer to 250 on open of websocket connection 
        clearTimeout(connectInterval); // clear Interval on on open of websocket connection
    };

    // websocket onclose event listener
    ws.onclose = e => {
        console.log(
            `Socket is closed. Reconnect will be attempted in ${Math.min(
                10000 / 1000,
                (that.timeout + that.timeout) / 1000
            )} second.`,
            e.reason
        );

        that.timeout = that.timeout + that.timeout; //increment retry interval
        connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
    };

    // websocket onerror event listener
    ws.onerror = err => {
        console.error(
            "Socket encountered error: ",
            err.message,
            "Closing socket"
        );

        ws.close();
    };

    ws.onmessage = message => {
      this.setChartData(message.data);
    };
    
  };

  setChartData(message) {

    var responseObj = JSON.parse(message);

    var chartStructureObj = {
      animationEnabled: true,
      exportEnabled: true,
      title:{
        text: "Events Chart"
      },
      axisY: {
        title: "Response time in sec.",
        suffix: "s"
      },
      axisX: {
        title: "Event timestamp",
        suffix: ""
      },
      toolTip: {
        shared: true,
        reversed: true
      },
      legend: {
        verticalAlign: "center",
        horizontalAlign: "right",
        reversed: true
      },
      data: []
    };

    var chartData = {};
    responseObj.forEach((item, index) => {
      
      var baseData = {
        type: "line",
        name: "",
        showInLegend: true,
        xValueType: "dateTime",
        dataPoints: []
      }

      baseData.name = item.field;
    
      item.eventDataAxes.forEach((item, index) => {
        var dateTime = new Date(item.timestamp);
        //baseData.dataPoints.push(JSON.parse(`{"x": "${dateTime.toString('dd/MM/yyyy')}", "y": ${item.value}}`));
        baseData.dataPoints.push(JSON.parse(`{"x": ${item.timestamp}, "y": ${item.value}}`));
      });

      chartStructureObj.data.push(baseData);
      chartData = chartStructureObj;
    });

    this.setState({
      chartData: chartData 
    })
  }

  check = () => {
    const { ws } = this.state;
    if (!ws || ws.readyState == WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
  };

  generateCharButtonClicked() {
    const { ws } = this.state;
    var commandArr = this.state.commands.split('\n');
    commandArr.forEach((item, index) => ws.send(item));
  }

  onChangeInputCommand(newValue) {
    this.state.commands = newValue;
  }

  render() {
    return (
      <div className="App">
        <HeaderComponent />
        <InputCommandComponent onChangeInputCommand={this.onChangeInputCommand} />
        <ChartComponent chartData={this.state.chartData} />
        <FooterComponent generateCharButtonClicked={this.generateCharButtonClicked} />
      </div>
    )
  }

}
export default App;
