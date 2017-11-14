import React from 'react';
import Board from './Board';
import Form from './Form';
import { CheckWinStatus } from "../functions/handleWinGame";

class Game extends React.Component{
    constructor(){
        super();
        this.state = {
            historyList: [{
                squares: Array(0).fill(null),
                moveLocation: ''
            }],
            xIsNext: true,  
            sizeOfBoard: 0,
            StepsAmount: 0,  
            curPos: -1, //No bold
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(i){
        const historyList = this.state.historyList.slice(0, this.state.StepsAmount + 1);
        const squares = historyList[historyList.length - 1].squares.slice();
        if(CheckWinStatus(squares, this.state.sizeOfBoard, this.state.xIsNext, this.state.curPos) || squares[i]){
            return; //Nếu thắng thì không cho đánh nữa
        }
        const size = Math.sqrt(historyList[0].squares.length);
        const rowIndex = Math.floor(i/size) + 1;
        const colIndex = (i % size) + 1;
        const moveLocation = [colIndex, rowIndex].join(", ");
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            historyList: historyList.concat([{
                squares: squares,
                moveLocation: moveLocation,}
            ]),
            xIsNext: !this.state.xIsNext,
            StepsAmount: historyList.length,
            curPos: i,
        });
    }

    moveTo(move){
        const moveLocation = this.state.historyList[move].moveLocation;
        const position = moveLocation.split(',');
        const rowPos = parseInt(position[1]);
        const colPos = parseInt(position[0]);
        const rowsCount = this.state.sizeOfBoard;
        this.setState({
            curPos: (rowPos - 1) * rowsCount + colPos - 1,
            StepsAmount: move,
            xIsNext: (move % 2) === 0 ? true : false,
        });
    }

    handleSubmitForm(event){   
        this.setState({
            historyList: [{
                squares: Array(Number(this.state.sizeOfBoard)*Number(this.state.sizeOfBoard)),
                moveLocation: '',
            }],
            StepsAmount: 0,  //Reset Board
            xIsNext: true,
            curPos: -1
        });
        event.preventDefault();
    }

    handleInputChange(e){
        const sizeofBoard = e.target.value;
        if(sizeofBoard !== ""){
            this.setState({
                sizeOfBoard: sizeofBoard
            });
        }else{
            this.setState({
                historyList: [{
                    squares: Array(0).fill(null),
                    moveLocation: ''
                }],
                sizeOfBoard: 0, StepsAmount: 0
            });
        }
    }

    render(){
        const historyList = this.state.historyList;
        const squares = historyList[this.state.StepsAmount].squares;
        const winner = CheckWinStatus(squares, this.state.sizeOfBoard, this.state.xIsNext, this.state.curPos);
        let status = "";
        if(winner){
            status = "Winner is: " + winner.winnerPlayer; // Display who win the game
        }else if(this.state.StepsAmount === this.state.sizeOfBoard * this.state.sizeOfBoard){    //Full Board
            status = (this.state.StepsAmount !== 0) ? "Nobody wins. Click Get Start To Play Again." : "Enter Size Of Board";
        }else{
            status = "Next player is: " + (this.state.xIsNext ? 'X' : 'O');
        }
        const moves = historyList.map((step, move) => {
            let movement = "";
            if(this.state.StepsAmount !== 0){
                movement = move ? `Move #${move} (${step.moveLocation})` : 'Start Game';
            }
            return <li key={move}><a href="#" onClick={() => this.moveTo(move)}>{movement}</a></li>
        });
        return (
            <div id="game">
                <div id="head">
                    <Form handleInputChange={this.handleInputChange} handleSubmitForm = {this.handleSubmitForm}/>
                </div>
                <div id="divBoard">
                    <div id="board">
                        <Board squares={squares} currentIndex={this.state.curPos} onClick={i => this.handleClick(i)} 
                                                winner={winner && winner.winnerLocation}/>
                    </div>
                    <div id="game-detail">
                        <p>{status}</p>
                        <ol>{moves}</ol>
                    </div>
                </div>
                
            </div>
        );
    }
    
}

export default Game;