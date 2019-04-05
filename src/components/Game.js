import React, { Component } from "react";
import Board from "./Board";
import History from "./History";

import "../index.css";

const initialState = {
  history: [
    {
      squares: Array(9).fill(null),
      moveLocation: {
        column: null,
        row: null
      }
    }
  ],
  xPlayerTurn: true,
  winner: null,
  stepNumber: 0
};

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
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
      ...initialState,
      xPlayerTurn: !this.state.xPlayerTurn
    });

  handleClick = squareIndex => {
    const { history, xPlayerTurn, winner, stepNumber } = this.state;
    const currentBoard = history[history.length - 1];
    if ((!stepNumber && !history.length) || stepNumber === history.length - 1) {
      if (!currentBoard.squares[squareIndex] && !winner) {
        const squares = currentBoard.squares.slice(); // creates a copy of the squares
        squares[squareIndex] = xPlayerTurn ? "X" : "O";
        debugger;
        this.setState(
          {
            history: history.concat([
              {
                squares,
                moveLocation: this.calculateMoveLocation(squareIndex)
              }
            ]),
            xPlayerTurn: !xPlayerTurn,
            stepNumber: stepNumber + 1
          },
          this.calculateWinner
        );
      }
    } else {
      console.log("switch to latest board");
    }
  };

  calculateMoveLocation = squareIndex =>
    ({
      0: {
        column: 0,
        row: 0
      },
      1: {
        column: 1,
        row: 0
      },
      2: {
        column: 2,
        row: 0
      },
      3: {
        column: 0,
        row: 1
      },
      4: {
        column: 1,
        row: 1
      },
      5: {
        column: 2,
        row: 1
      },
      6: {
        column: 0,
        row: 2
      },
      7: {
        column: 1,
        row: 2
      },
      8: {
        column: 2,
        row: 2
      }
    }[squareIndex]);

  jumpToMove = moveIndex =>
    this.setState({
      stepNumber: moveIndex
    });

  render() {
    const { winner, history, xPlayerTurn, stepNumber } = this.state;
    const currentBoard = history[stepNumber];
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
          <History
            stepNumber={stepNumber}
            history={history}
            onClick={this.jumpToMove}
          />
        </div>
      </div>
    );
  }
}
