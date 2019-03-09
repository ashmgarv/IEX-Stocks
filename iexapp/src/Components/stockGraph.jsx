//Component to graphically represent stock prices using a bar graph
import React, { Component } from "react";
import * as d3 from "d3";

export default class StockGraph extends Component {
  state = {};
  constructor() {
    super();
    this.drawChart = this.drawChart.bind(this);
  }
  drawChart() {
    //Clear everything from the svg
    if (this.props.stocks.length > 0) {
      d3.select("#barChart")
        .selectAll("g")
        .remove();
      d3.select("#barChart")
        .selectAll("rect")
        .remove();
      d3.select("#barChart")
        .selectAll("text")
        .remove();

      //Set appropriate margin, width and height
      const margin = 60;
      const width = 800;
      const height = this.props.stocks.length * 100;
      const svg = d3.select("#barChart");
      svg.attr("height", height).attr("width", width);
      var innerWidth = width - 2 * margin;
      var innerHeight = height - 2 * margin;

      //Apply margins
      const chart = svg
        .append("g")
        .attr("transform", `translate(${margin}, ${margin})`);

      //Y scale to represent the stock symbols
      const yScale = d3
        .scaleBand()
        .range([0, innerHeight])
        .domain(this.props.stocks.map(stock => stock.symbol))
        .padding(0.1);

      //X scale to represent the  stock prices
      const xScale = d3
        .scaleLinear()
        .range([0, innerWidth])
        .domain([0, d3.max(this.props.stocks, d => d.price)]);

      //Append y-scale
      chart.append("g").call(d3.axisLeft(yScale));

      //Append x-scale
      chart
        .append("g")
        .call(d3.axisBottom(xScale).ticks(this.props.stocks.length))
        .attr("transform", `translate(0,${innerHeight})`);

      //Append the bars
      chart
        .selectAll()
        .data(this.props.stocks)
        .enter()
        .append("rect")
        .attr("class", "barG")
        .attr("y", d => yScale(d.symbol))
        .attr("width", s => xScale(s.price))
        .attr("height", yScale.bandwidth())
        .attr("fill", "steelblue");

      //Append the stock values as text
      chart
        .selectAll()
        .data(this.props.stocks)
        .enter()
        .append("text")
        .attr("x", d => xScale(d.price))
        .attr("y", d => yScale(d.symbol) + 10)
        .attr("dy", ".35em")
        .text(d => d.price);

      //Append label for the bottom axis
      svg
        .append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width - 350)
        .attr("y", height - 6)
        .text("Stock Price");
    }
  }

  componentDidUpdate() {
    //Draw the chart on component update
    this.drawChart();
  }
  render() {
    return (
      <div className="bar-chart-container">
        <svg id="barChart" className="bar-chart" />
      </div>
    );
  }
}
