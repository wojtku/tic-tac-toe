import React, { Component } from "react";
import Square from "./Square";

import "../index.css";

export default class extends Component {
  renderSquare = squareIndex => (
    <Square
      onClick={() => this.props.onClick(squareIndex)}
      value={this.props.squares[squareIndex]}
    />
  );

  render = () => (
    <div>
      <div className="board-row">
        {this.renderSquare(0)}
        {this.renderSquare(1)}
        {this.renderSquare(2)}
      </div>
      <div className="board-row">
        {this.renderSquare(3)}
        {this.renderSquare(4)}
        {this.renderSquare(5)}
      </div>
      <div className="board-row">
        {this.renderSquare(6)}
        {this.renderSquare(7)}
        {this.renderSquare(8)}
      </div>
    </div>
  );
}