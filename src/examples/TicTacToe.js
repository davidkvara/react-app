import React from "react";
import "./css/tictactoe.css";
import classNames from "classnames";

function Square(props) {
  let btnClass = classNames({
    square: true,
    "x-color": props.value === "X"
    // "btn-over": !this.state.isPressed && this.state.isHovered
  });
  return (
    <button className={btnClass} onClick={props.onSquareClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  state = { squares: Array(9).fill(null), xIsNext: true };

  handleSquareClick(i) {
    const newSquares = this.state.squares.slice();
    if (haveWinner(newSquares) || newSquares[i]) {
      return "";
    }
    newSquares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({ squares: newSquares, xIsNext: !this.state.xIsNext });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onSquareClick={() => this.handleSquareClick(i)}
      />
    );
  }

  render() {
    const winner = haveWinner(this.state.squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="board">
        <h2>{status}</h2>
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
}

function haveWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
}

const Game = () => (
  <div className="game">
    <Board />
  </div>
);

export default Game;
