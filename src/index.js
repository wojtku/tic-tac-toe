import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Square = ({ value, onClick }) =>
  console.log("rendered", this) || (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xPlayerTurn: true,
      winner: null
    };
  }

  calculateWinner = () => {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    const { squares } = this.state;
    for (let i = 0; i < winningLines.length; ++i) {
      const [a, b, c] = winningLines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        this.setState({
          winner: squares[a]
        });
      }
    }
  };

  handleClick = squareIndex => {
    const { squares, xPlayerTurn, winner } = this.state;
    if (!squares[squareIndex] && !winner) {
      const squaresCopy = squares.slice(); // creates a copy of the squares
      squaresCopy[squareIndex] = xPlayerTurn ? "X" : "O";
      this.setState(
        {
          squares: squaresCopy,
          xPlayerTurn: !xPlayerTurn
        },
        this.calculateWinner
      );
    }
  };

  renderSquare = squareIndex => (
    <Square
      onClick={() => this.handleClick(squareIndex)}
      value={this.state.squares[squareIndex]}
    />
  );

  resetState = () => this.setState({
    squares: Array(9).fill(null),
    xPlayerTurn: !this.state.xPlayerTurn,
    winner: null
  })

  render() {
    const { winner, xPlayerTurn, squares } = this.state;
    const isDraw = !winner && !squares.includes(null);
    return (
      <div>
        <div className="status">
          {winner
            ? `The winner is: ${winner}`
            : isDraw
            ? `We have a draw!`
            : `Next player: ${xPlayerTurn ? "X" : "O"}`}
        </div>
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
        {(winner || isDraw) && (
          <button onClick={this.resetState}>Reset game</button>
        )}
      </div>
    );
  }
}

class Game extends Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/*status*/}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));
