import React from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css';


function Square(props) {
    return(
     <button className="square" onClick={props.shitForBrains}>
         {props.value}
     </button>
    );
}
  
  class Board extends React.Component {
   
    renderSquare(i) {
      return (<Square 
                value={this.props.squares[i]}
                cunt='fuck'
                shitForBrains={()=> this.props.handleMyCock(i)}
            />
            );
    }
  
    renderRow(i){
      

      let rowSquares = Array(this.props.noRows).fill(null);

      for (let index = 0; index < this.props.noRows; index++) {
        rowSquares[index] = this.renderSquare((i * this.props.noRows) + index);  
      }

      return (
          <div className="board-row">
            {rowSquares}
          </div>
      )

    }

    render() {
      
      let boardRows = Array(this.props.noRows).fill(null);

      for (let index = 0; index < this.props.noRows; index++) {
        boardRows[index] = this.renderRow(index);
      }
      
      return (
        <div>
         {boardRows}
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        history:[
          {
            historySquares: Array(9).fill(null)
          }
        ],
        stepNumber: 0,
        xIsNext: true,
        noRows: 3
      };
    }

    handleMyArse(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const mySquares = current.historySquares.slice();


      if (calculateWinner(mySquares) || mySquares[i]) {
          return;
      }
      
      mySquares[i] =  this.state.xIsNext ? 'X' : 'O';
      this.setState({

        history: history.concat([{
          historySquares : mySquares,
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext
      });
      
    }

    jumpTo(gradus){
      this.setState({
        stepNumber: gradus,
        xIsNext: (gradus % 2) === 0
      });
    }

    changeGameType(numberRows){
      this.setState({
        noRows: numberRows,
        history:[
          {
            historySquares: Array(numberRows * numberRows).fill(null)
          }
        ],
        stepNumber: 0,
        xIsNext: true,
      });

    }

    renderSelectOption(i)
    {
      
      return(
        <span>
          <input type="radio" key={i}  checked={i === this.state.noRows? true:false}    id="game-type" name ="game-type" value="{i}" onChange={()=>this.changeGameType(i)}/>
          <label htmlFor="{i}">{i}</label><br></br>
        </span>
      )
    }

    render() {
      
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.historySquares);

      const moves = history.map((step, arrayIndex) => {
        const desc = arrayIndex ?
          'Go to move #' + arrayIndex + ' (' + ((arrayIndex % 2 == 1) ? 'X': 'O') + ')':
          'Go to game start';
          return(
            <li key={arrayIndex}>
              <button onClick={() => this.jumpTo(arrayIndex)}>{desc}</button>
            </li>
          );
      });

      let status;
      if (winner){
        status = 'Winner: ' + winner;
      }
      else{
        status = 'Next player: ' + (this.state.xIsNext? 'X' : 'O');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.historySquares}
              handleMyCock={(i) => this.handleMyArse(i)}
              noRows={this.state.noRows}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        
          <div className="game-selector">
            Please select your game type:
            <br></br>
             {this.renderSelectOption(3)}
             {this.renderSelectOption(4)}
             {this.renderSelectOption(5)}
          </div>

        </div>
      );
    }
  }

  function calculateWinner(squares) {

    let noRows = Math.sqrt(squares.length);

    let scoredSquares = squares.map((player) => {
        switch (player) {
          case 'X':
            return 1;
          case 'O':
            return -1;
          default:
            return 0;
        }
    });

    for (let i = 0; i < noRows; i++) {
      //console.log('start at ' + (rowNum * noRows));
      //console.log('end at ' + ((rowNum * noRows) + noRows));
      //rows are easy
      let thisRowSum = scoredSquares.slice((i * noRows),(i * noRows) + noRows).reduce((a, b) => a + b, 0);
      switch(thisRowSum){
        case noRows:
          return 'X';
        case -noRows:
          return 'O';
        default:
          //nowt
      }

      //cols are annoying
      let thisColSum = 0;
      for (let j = 0; j < noRows; j++) {
        thisColSum += scoredSquares[(j * noRows) + i]
      }
      switch(thisColSum){
        case noRows:
          return 'X';
        case -noRows:
          return 'O';
        default:
          //nowt
      }
    }

    //diagonals are easy
    let backSlash = 0;
    let forwardSlash = 0;
    for (let i = 0; i < noRows; i++) {
      backSlash += scoredSquares[(i * noRows) + i];
      forwardSlash += scoredSquares[(i * noRows) + (noRows - i - 1)]
    }

    switch(backSlash){
      case noRows:
        return 'X';
      case -noRows:
        return 'O';
      default:
        //nowt
    }

    switch(forwardSlash){
      case noRows:
        return 'X';
      case -noRows:
        return 'O';
      default:
        //nowt
    }

    return null;
  }
  
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  