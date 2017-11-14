function CheckWinStatus(squares, sizeOfBoard, xIsNext, curPos){
    sizeOfBoard = Number(sizeOfBoard);
    let count = 0;
    let currentPlayer = (!xIsNext) ? 'X' : 'O';
    if(curPos < 0)
      return null;
    let x =  curPos % sizeOfBoard;
    let y =  parseInt(curPos / sizeOfBoard);

    for (let i = sizeOfBoard * y; i < sizeOfBoard * y + sizeOfBoard; i++) {
        if(squares[i] === currentPlayer)
        {
          count++;
          if(count === 5){
            return { 
              winnerLocation: [i-4,i-3,i-2, i-1, i],
              winnerPlayer: currentPlayer
            };
          }
          
        }else
          count = 0;
    }

    count = 0;
    for (let i = x; i < sizeOfBoard * sizeOfBoard; i = i + sizeOfBoard){
        if(squares[i] === currentPlayer){
            count++;
            if(count === 5){
                return { 
                    winnerLocation: [i-sizeOfBoard,i-sizeOfBoard*2,i-sizeOfBoard*3, i-sizeOfBoard*4, i],
                    winnerPlayer: currentPlayer
                };
            }
        }else{
            count = 0;
        }
    }

    //duyệt ché xuoi
    count = 0;
    if(x - y >= 0){
        for (let i = x - y; i < sizeOfBoard * sizeOfBoard; i = i + sizeOfBoard + 1){
            if(squares[i] === currentPlayer){
                count++;
                if(count === 5){
                    return { 
                        winnerLocation: [i-sizeOfBoard -1,i-(sizeOfBoard + 1)*2,i-(sizeOfBoard + 1)*3, i-(sizeOfBoard + 1)*4, i],
                        winnerPlayer: currentPlayer
                    };
                }
            }else{
                count = 0;
            }
        }
    }else{
        for (let i = (y - x) * sizeOfBoard ; i < sizeOfBoard * sizeOfBoard; i = i + sizeOfBoard + 1){
            if(squares[i] === currentPlayer){
                count++;
                if(count === 5){
                    return { 
                        winnerLocation: [i-sizeOfBoard -1,i-(sizeOfBoard + 1)*2,i-(sizeOfBoard + 1)*3, i-(sizeOfBoard + 1)*4, i],
                        winnerPlayer: currentPlayer
                    };
                }
            }else{
                count = 0;
            }
        }
    }

    //duyệt chéo ngược
    count = 0;
    if(x + y < sizeOfBoard){
        for (let i = x + y; i < sizeOfBoard * sizeOfBoard; i = i + sizeOfBoard - 1){
            if(squares[i] === currentPlayer){
                count++;
                if(count === 5){
                    return { 
                        winnerLocation: [i-sizeOfBoard +1,i-(sizeOfBoard - 1)*2,i-(sizeOfBoard - 1)*3, i-(sizeOfBoard - 1)*4, i],
                        winnerPlayer: currentPlayer
                    };
                }else{
                    count = 0;
                }
            }
        }
    }else{
        for (let i = (x + y - sizeOfBoard + 1) * sizeOfBoard + sizeOfBoard - 1; i < sizeOfBoard * sizeOfBoard; i = i + sizeOfBoard - 1){
            if(squares[i] === currentPlayer){
                count++;
                if(count === 5){
                    return { 
                        winnerLocation: [i-sizeOfBoard +1,i-(sizeOfBoard - 1)*2,i-(sizeOfBoard - 1)*3, i-(sizeOfBoard - 1)*4, i],
                        winnerPlayer: currentPlayer
                    };
                }else{
                    count = 0;
                }
            }
        }
    }
    return null;
}

export {CheckWinStatus};