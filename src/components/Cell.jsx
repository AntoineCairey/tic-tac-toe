function Cell({ cell, index, handleClick }) {
  return (
    <div className="cell" onClick={() => handleClick(cell, index)}>
      {cell}
    </div>
  );
}

export default Cell;
