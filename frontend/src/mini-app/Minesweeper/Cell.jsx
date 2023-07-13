/* eslint-disable react/prop-types */
const Cell = ({ cell, onClick, onContextMenu }) => {
  const style = {
    backgroundColor: cell.hasMine ? "red" : "grey",
  };
  if (cell.isVisible) {
    return <div className="cell" style={style}><div>{(cell.neighbors === "x" || cell.neighbors === 0) ? " " : cell.neighbors}</div></div>;
  }
  if(cell.hasFlag){
    return <div className="cell" onContextMenu={onContextMenu} style={{backgroundColor: "yellow"}}><div></div></div>
  }
  return <div className="cell" onClick={onClick} onContextMenu={onContextMenu}><div></div></div>
};

export default Cell;
