import { useState } from "react";
import "./App.css";
import Cell from "./components/Cell";

const initialCells = [
  { number: 1, content: " " },
  { number: 2, content: " " },
  { number: 3, content: " " },
  { number: 4, content: " " },
  { number: 5, content: " " },
  { number: 6, content: " " },
  { number: 7, content: " " },
  { number: 8, content: " " },
  { number: 9, content: " " },
];

const lines = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function App() {
  const [cells, setCells] = useState(initialCells);
  const [player, setPlayer] = useState("x");
  const other = (player) => {
    return player === "x" ? "o" : "x";
  };

  const handleClick = (cell) => {
    const newCell = { number: cell.number, content: player };
    setCells(
      cells.map((e) => {
        return e.number === cell.number ? newCell : e;
      })
    );

    setPlayer(player === "x" ? "o" : "x");
  };

  const status = () => {
    let check = lines.map((line) => {
      return (
        cells[line[0] - 1].content === other(player) &&
        cells[line[1] - 1].content === other(player) &&
        cells[line[2] - 1].content === other(player)
      );
    });

    return check.includes(true) ? (
      <div>Winner : {other(player)}</div>
    ) : (
      <div>Current player : {player}</div>
    );
  };

  return (
    <div className="container">
      {status()}
      <div className="table">
        {cells.map((cell) => (
          <Cell key={cell.number} cell={cell} handleClick={handleClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
