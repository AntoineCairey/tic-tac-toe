import { useImmer } from "use-immer";
import "./App.css";
import Cell from "./components/Cell";

const initialBoard = new Array(9).fill(null);

// Liste des combinaisons gagnantes (les lignes du plateau)
const winningLines = [
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
  // Création des states (plateau et prochain joueur)
  const [board, setBoard] = useImmer(initialBoard);
  const [xIsNext, setxIsNext] = useImmer(true);
  const currentPlayer = () => (xIsNext ? "x" : "o");
  const otherPlayer = () => (xIsNext ? "o" : "x");
  let winner = false;

  // Au clic sur une case, vérifier qu'elle est vide et que la partie n'est pas finie
  // Si c'est ok, alors on change le contenu de la case et le prochain joueur
  const handleClick = (cell, index) => {
    if (cell || winner) {
      return;
    }
    setBoard((board) => {
      board[index] = currentPlayer();
    });
    setxIsNext(!xIsNext);
  };

  // Fonction qui détermine le statut de la partie (affiché au dessus du plateau)
  // Calcule si celui qui vient de jouer a une des combinaisons gagnantes
  const status = () => {
    winner = winningLines
      .map((line) => {
        return (
          board[line[0] - 1] === otherPlayer() &&
          board[line[1] - 1] === otherPlayer() &&
          board[line[2] - 1] === otherPlayer()
        );
      })
      .includes(true);

    // Détermine le statut : nom du gagnant, égalité, ou prochain joueur
    return winner ? (
      <div>Winner : {otherPlayer()}</div>
    ) : !board.includes(null) ? (
      <div>Draw</div>
    ) : (
      <div>Current player : {currentPlayer()}</div>
    );
  };

  // Affichage du statut et plateau : appel du composant Cell (case du tableau)
  return (
    <div className="container">
      {status()}
      <div className="table">
        {board.map((cell, index) => (
          <Cell
            key={index}
            cell={cell}
            index={index}
            handleClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
