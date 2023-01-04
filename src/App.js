import React, { useState, useMemo } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function Board({ boardClicked, board }) {
  const girdItemStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Courier', fontSize: '50px', backgroundColor: 'pink' }
  return <div id='grid-container' style={{
    display: 'grid', gridTemplateColumns: '100px 100px 100px',
    gridTemplateRows: '100px 100px 100px', backgroundColor: 'black', rowGap: '3px', columnGap: '3px', margin: '30px'
  }}>
    {
      board.map((str, index) => {
        return <div key={index} style={girdItemStyle} onClick={() => boardClicked(index)}>{str}</div>
      })
    }
  </div>
}

const findWinner = (board) => {
  console.log('called find winne')
  //col 
  for (let i = 0; i < 3; i++) {
    if ((board[i] == board[i + 3] && board[i] == board[i + (3 * 2)]) && board[i] != '') {
      return board[i]
    }
  }
  //row
  for (let i = 0; i < 3; i++) {
    const startingIndex = i * 3
    if ((board[startingIndex] == board[startingIndex + 1] && board[startingIndex] == board[startingIndex + 2]) && board[startingIndex] != '') {
      return board[startingIndex]
    }
  }

  //diagonal 
  if ((board[0] == board[4] && board[4] == board[8]) && board[0] != '') {
    return board[4]
  }

  if ((board[2] == board[4] && board[4] == board[6]) && board[2] != '') {
    return board[4]
  }
}

const findStaleMate = (board) => {
  for (let i = 0; i < board.length; i++) {
    if (board[i] == '') {
      return false
    }
  }
  return true
}

function App() {
  const [turn, setTurn] = useState('X')
  const [board, setBoard] = useState(['', '', '', '', '', '', '', '', ''])

  const winner = useMemo(() => findWinner(board), [board])
  const staleMate = findStaleMate(board)

  const boardClicked = (index) => {
    // console.log('board is clicked', index)
    if (board[index] != '' || winner || staleMate) {
      //do not proceed
      return
    }

    board[index] = turn
    setBoard([...board])
    setTurn(turn == 'X' ? 'O' : 'X')
  }

  const resetBoard = () => {
    setTurn('X')
    setBoard(['', '', '', '', '', '', '', '', ''])
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h3" marginTop={'10px'} >
            Tic Tac Toe
          </Typography>
          {!winner && !staleMate && <Typography variant="h5">Whose turn: {turn}</Typography>}
          {winner && <Typography variant="h5">Winner is {winner}</Typography>}
          {staleMate && !winner && <Typography variant="h5"> No winner!</Typography>}
          <Board boardClicked={boardClicked} board={board}></Board>
          {(winner || staleMate) && <Button variant="outlined" color='inherit' onClick={resetBoard}>Reset Game</Button>}
        </div>
      </header >

    </div >
  );
}

export default App;
