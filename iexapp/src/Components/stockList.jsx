//Component to display list of added stocks
import React, { Component } from "react";

export default class StockList extends Component {
  render() {
    return (
      <div>
        <ul className="list-group stock-list">
          {this.props.stocks.map(stock => (
            <li className="list-group-item">{stock.symbol}</li>
          ))}
        </ul>
      </div>
    );
  }
}
