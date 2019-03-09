import React, { Component } from "react";
import "./App.css";
import AddStockBar from "./Components/addStockBar";
import axios from "axios";
import $ from "jquery";
import StockList from "./Components/stockList";
import StockGraph from "./Components/stockGraph";

class App extends Component {
  state = {
    stocks: [],
    stockSymbols: "",
    base_url: "https://api.iextrading.com/1.0//tops/last?symbols="
  };

  constructor() {
    super();
    this.handleAddStockEvent = this.handleAddStockEvent.bind(this);
  }

  componentDidMount() {
    setInterval(() => {
      this.updateLatestStockPrices();
    }, 5000);
  }

  //This function will handle addition of a stock
  handleAddStockEvent() {
    var stockCode = $("#addStock").val();

    //Avoid duplication of stock symbols
    var listStockSymbols = this.state.stockSymbols.split(",");
    console.log(listStockSymbols);
    if (listStockSymbols.includes(stockCode.toUpperCase())) {
      alert("The stock symbol is already being monitored");
    } else {
      var url = this.state.base_url + stockCode;
      var newData = [];
      var stateStocks = this.state.stocks;
      var stateStockSymbols = this.state.stockSymbols;

      //Using axios to Request stock price from the IEX website
      axios.get(url).then(res => {
        //Alert the user if the stock symbol entered is incorrect
        if (res.data.length === 0 || res.data === undefined) {
          alert(
            "The stock symbol does not match any listed items. Please enter a correct stock symbol"
          );
        } else {
          newData = res.data;
          stateStocks.push(newData[0]);
          if (stateStockSymbols !== "") stateStockSymbols += ",";
          stateStockSymbols += newData[0].symbol;
          this.setState({
            stocks: stateStocks,
            stockSymbols: stateStockSymbols
          });
        }
      });
    }
  }

  //Function to check for latest stock prices
  updateLatestStockPrices() {
    var url = this.state.base_url + this.state.stockSymbols;
    axios.get(url).then(res => {
      this.setState({
        stocks: res.data
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <AddStockBar addStockEventHandler={this.handleAddStockEvent} />
        <StockList stocks={this.state.stocks} />
        <StockGraph stocks={this.state.stocks} />
        <div className="copyrithtInfo">
          <p>
            Data provided for free by{" "}
            <a href="https://iextrading.com/developer/">IEX</a>. View{" "}
            <a href="https://iextrading.com/api-exhibit-a/">
              IEX’s Terms of Use.
            </a>
          </p>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
