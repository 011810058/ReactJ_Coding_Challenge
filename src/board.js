import React from 'react';
import Square from './square.js';

//Board to manage the squares and render the grid 
class Board extends React.Component {
  renderSquare(i) {

    return (
      <Square
        id = {i}
        attr={this.props.squares[i]}
        calculateMatch={this.props.checkMatch}/>
        //
    );
  }
  
  buildBoard(dimenion) {
    const rows = [];
    for (let i=0; i < dimenion; i++) {
      let inner = [];
      for (var j=0; j < dimenion; j++) {
        inner.push(this.renderSquare((i * dimenion) + j ));
      }
      rows.push(<div className="board-row">{inner}</div>);
    } 

    return (
      rows
    );
  }

  render() {
  //  
  const displayBoard = this.buildBoard(this.props.dimenion);

    return (
      <div>
        {displayBoard}
      </div>
    );
  }
}

export default Board;