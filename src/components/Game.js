import React, { Component } from "react";
import Board from "./Board";

import "../index.css";


export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
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
    const { squares } = this.state.history[this.state.history.length - 1];
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

  resetState = () =>
    this.setState({
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      xPlayerTurn: !this.state.xPlayerTurn,
      winner: null
    });

  handleClick = squareIndex => {
    const { history, xPlayerTurn, winner } = this.state;
    const currentBoard = history[history.length - 1];
    if (!currentBoard.squares[squareIndex] && !winner) {
      const squares = currentBoard.squares.slice(); // creates a copy of the squares
      squares[squareIndex] = xPlayerTurn ? "X" : "O";
      this.setState(
        {
          history: history.concat([
            {
              squares
            }
          ]),
          xPlayerTurn: !xPlayerTurn
        },
        this.calculateWinner
      );
    }
  };

  render() {
    const { winner, history, xPlayerTurn } = this.state;
    const currentBoard = history[history.length - 1];
    const isDraw = !winner && !currentBoard.squares.includes(null);
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={currentBoard.squares} onClick={this.handleClick} />
          {(winner || isDraw) && (
            <button onClick={this.resetState}>Reset game</button>
          )}
        </div>
        <div className="game-info">
          <div>
            {winner
              ? `The winner is: ${winner}`
              : isDraw
              ? `We have a draw!`
              : `Next player: ${xPlayerTurn ? "X" : "O"}`}
          </div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}