//This is the React component which contains a search bar to take in
//the stock code and a button to add that stock in the graph
//Boostrap styling has been applied to the buttons and search bars

import React, { Component } from "react";
export default class AddStockBar extends Component {
  render() {
    return (
      <form className="form-inline formstyle">
        <input
          id="addStock"
          className="form-control"
          type="search"
          placeholder="Enter Stock Code"
          aria-label="Add"
        />
        <button
          id="addBtn"
          className="btn btn-outline-primary my-btn-style"
          type="button"
          onClick={this.props.addStockEventHandler}
        >
          Add
        </button>
      </form>
    );
  }
}
