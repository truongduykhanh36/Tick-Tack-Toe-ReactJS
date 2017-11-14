import React from 'react';
import Square from './Square';

class Board extends React.Component{
    renderSquare(i){
        const winner = this.props.winner;
        const curIndex = this.props.currentIndex;
        return <Square curSelect={(curIndex === i) ? 'curClick' : ''} value={this.props.squares[i]} onClick={() => this.props.onClick(i)} winner={winner && winner.includes(i) ? 'winner' : ''} />
    }

    renderBoard(){
        const sizeOfBoard = Math.sqrt(this.props.squares.length);
        const tmp = Array(sizeOfBoard).fill(null);
        for(let i = 0; i < sizeOfBoard; i++){
            const row = Array(sizeOfBoard).fill(null);
            for(let j = 0; j < sizeOfBoard; j++){
                var key = i * sizeOfBoard + j;
                row.push(<span key={key}> {this.renderSquare(key)} </span>);
            }
            tmp.push(<div key={i}>{row}</div>);
        }
        return tmp;
    }

    render(){
        return(
            <div>
                <div>{this.renderBoard()}</div>
            </div>
        );
    }
}

export default Board;