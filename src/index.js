import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';

import Board from './board.js';

//Generating random pair of values for given dimension of board
function initialSquares(dimension) {
   var size = dimension ** 2;
   const squares = []
   var rand;

   var randomArray = Array(size/2).fill(null);
   randomArray = randomArray.map(function (x, i) { return i });
   randomArray = randomArray.concat(randomArray);
   console.log(randomArray);

   for (var i = 1; i <= size; i++) {
     let index = Math.floor(Math.random() * (randomArray.length));
     rand =  randomArray[index];
     randomArray.splice(index, 1);
     squares.push({'value': rand, 'matched': false, 'flipped': false});
   }
   
   return squares;
}

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.addToScoreHistory= this.addToScoreHistory.bind(this);

    this.defaultDimension = 6;
    this.pointPerMatch = 100;

    this.state = {
      squares: initialSquares(this.defaultDimension),
      prevSquare: null,
      viewed: false,
      matches: 0,
      selectedDimension: this.defaultDimension,
      scoreHistory: Array(0).fill(null),
      score: 0,
      topScore: 0,
      status : 1
    };
  }

  //Setting the game stte to default 
  reset() {
    this.setState({
      squares: initialSquares(this.defaultDimension),
      prevSquare: null,
      viewed: false,
      matches: 0, 
      selectedDimension: this.defaultDimension,
      status : 1,
      score: 0
    });
  }

  //On win user can replay the game with same dimension 
  replay() {
    this.setState({
      squares: initialSquares(this.state.selectedDimension),
      prevSquare: null,
      viewed: false,
      matches: 0, 
      selectedDimension: this.state.selectedDimension,
      status : 1,
      score: 0
    });
  }

  //initialize state for selected dimension from the dropdown list 
  changeDimension(event) {
    this.setState({
      squares: initialSquares(event.target.value),
      lastCard: null,
      viewed: false,
      matches: 0, 
      selectedDimension: event.target.value,
      //scorehistory: Array(0).fill(null),
      status : 1,
      score: 0
    });
  }

  //maintaining score history 
  addToScoreHistory(score){
      this.setState({
            scoreHistory: this.state.scoreHistory.concat([{
              score: score,
              }]),
            status : 0
          });
      
  }

  //render reset or replay button on win
  btnAction(command) {
    if (command === 'Reset'){
      return (
          <button class="button" onClick={this.reset.bind(this)}>{command}</button>  
          //
        );
    }else{
      return (
          <button class="button" onClick={this.replay.bind(this)}>{command}</button>  
          //
        );
      }
  };

  //function used to manage the square state and increment score 
  calculateMatch(value, id) {
    if (this.state.viewed) {
      return;
    }

    let squares = this.state.squares;
    squares[id].flipped = true;
    this.setState({squares, viewed: true});
    if (this.state.prevSquare) {
      if (value === this.state.prevSquare.value) {
        let matches = this.state.matches;
        let newScore = this.state.score + this.pointPerMatch
        squares[id].matched = true;
        squares[this.state.prevSquare.id].matched = true;
        this.setState({squares, prevSquare: null, viewed: false, matches: matches + 1, score: newScore});
      } else {
        setTimeout(() => {
          squares[id].flipped = false;
          squares[this.state.prevSquare.id].flipped = false;
          this.setState({squares, prevSquare: null, viewed: false});
        }, 1000);
      }
    } else {
      this.setState({
        prevSquare: {id, value},
        viewed: false
      });
    }
  }

  render() {
    //
    var command = 'Reset';
    const scoreHistory = this.state.scoreHistory;

    if (this.state.matches === this.state.squares.length / 2) {
        if (this.state.status === 1){
          this.addToScoreHistory(this.state.score);  
        }

        if (this.state.score > this.state.topScore){
          this.setState({
            topScore: this.state.score,
          });
        }

        command = 'Hey you win, Play Again!!';
    }

    const scoreTrack = scoreHistory.map((item, index) => {
      return (
        <li key={index}>
          {item.score}
        </li>
        );
        //   
    });



    return (
      <div className="game">
        <div className="game-board">
          <Board
            dimenion = {this.state.selectedDimension} //replace with drop-down list later
            squares={this.state.squares}
            checkMatch={this.calculateMatch.bind(this)}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">

          <div className="board-row">
           {this.btnAction(command)}
          </div>
          <br></br>
          <b>::Select Matrix Dimension::</b>
          <div>
            <select class="wrapper-dropdown" value={this.state.selectedDimension} onChange={this.changeDimension.bind(this)}>
              <option value="2">2x2</option>
              <option value="4">4x4</option>
              <option value="6">6x6</option>
              <option value="8">8x8</option>
            </select>
          </div>
          <br></br>
          <b>::Your Score::</b>
          <div class="score">{this.state.score}</div>
          <br></br>
          <b>::Top Score::</b>
          <div class="score">{this.state.topScore}</div>
          <br></br>
          <b>::Score History::</b>
          <div class="score">{scoreTrack}</div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


