import React, { useState, useEffect } from 'react';

function App() {

   const [board, setBoard] = useState({
      0: '',1: '',2: '',3: '',4: '',5: '',6: '',7: '',8: ''
   });
   const [turn, setTurn] = useState('X');

   const patterns = ['012', '345', '678', '036', '147', '258', '048', '246'];

   const handleClick = e => {
      const index = e.target.attributes.data.value;
      if (!board[index] && turn === 'X') {
         setBoard({ ...board, [index]: 'X' });
         setTurn('O');
      }
   }

   const bestMove = () => {
      const boardCopy = { ...board };
      let bestScore = -1, move;
      for (let i = 0; i < 9; i++) {
         if (!boardCopy[i]) {
            boardCopy[i] = 'O';
            const score = minimax(boardCopy, false);
            boardCopy[i] = '';
            if (score > bestScore) {
               bestScore = score;
               move = i;
            }
         }
      }
      return move;
   }

   const minimax = (boardCopy, oTurn) => {
      const winner = checkWinner(boardCopy, true);
      if (winner) {
         if (winner === 'O') return 1;
         if (winner === 'X') return -1;
         if (winner === 'D') return 0;
      }

      if (oTurn) {
         let bestScore = -10;
         for (let i = 0; i < 9; i++) {
            if (!boardCopy[i]) {
               boardCopy[i] = 'O';
               const score = minimax(boardCopy, false);
               boardCopy[i] = '';
               if (score > bestScore) {
                  bestScore = score;
               }
            }
         }
         return bestScore;
      } else {
         let bestScore = 10;
         for (let i = 0; i < 9; i++) {
            if (!boardCopy[i]) {
               boardCopy[i] = 'X';
               const score = minimax(boardCopy, true);
               boardCopy[i] = '';
               if (score < bestScore) {
                  bestScore = score;
               }
            }
         }
         return bestScore;
      }
   }

   const checkWinner = (board, test) => {
      for (let i = 0; i < 8; i++) {
         const symbol = board[patterns[i][0]];
         if (symbol === 'X' || symbol === 'O') {
            if (board[patterns[i][1]] === symbol &&
               board[patterns[i][2]] === symbol) {
               if (!test) {
                  console.log(symbol, 'is the winner');
                  setBoard({ 0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' });
               }
               return symbol;
            }
         }
      }
      const checkDraw = [];
      for (let i = 0; i < 9; i++) {
         if (!board[i]) checkDraw.push(false);
         else checkDraw.push(true);
      }
      if (!checkDraw.includes(false)) {
         if (!test) {
            console.log('draw');
            setBoard({ 0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' });
         }
         return 'D';
      }
   }

   useEffect(() => {
      checkWinner(board, false);
      if (turn === 'O') {
         const move = bestMove(board);
         setBoard({ ...board, [move]: 'O' });
         setTurn('X');
      }
      // eslint-disable-next-line
   }, [board]);

   return (
      <div className="container">
         <div className="board">
            <div data={0} className="box" onClick={handleClick}>{board[0]}</div>
            <div data={1} className="box" onClick={handleClick}>{board[1]}</div>
            <div data={2} className="box" onClick={handleClick}>{board[2]}</div>
            <div data={3} className="box" onClick={handleClick}>{board[3]}</div>
            <div data={4} className="box" onClick={handleClick}>{board[4]}</div>
            <div data={5} className="box" onClick={handleClick}>{board[5]}</div>
            <div data={6} className="box" onClick={handleClick}>{board[6]}</div>
            <div data={7} className="box" onClick={handleClick}>{board[7]}</div>
            <div data={8} className="box" onClick={handleClick}>{board[8]}</div>
         </div>
      </div>
   )
}

export default App;
