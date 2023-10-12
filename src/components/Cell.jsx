function Cell({ cell, handleClick }) {
  return (
    <div className="cell" onClick={() => handleClick(cell)}>
      {cell.content}
    </div>
  );
}

export default Cell;
