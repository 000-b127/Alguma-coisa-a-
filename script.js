// Jogo da Velha (tic-tac-toe)
const cells = document.querySelectorAll('.cell');
const statusEl = document.getElementById('ttt-status');
const playerEl = document.getElementById('ttt-player');
const restartBtn = document.getElementById('ttt-restart');
let board = Array(9).fill(null);
let turn = 'X';
let running = true;

const winCombos = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function updateStatus(){
  if(!running) return;
  playerEl.textContent = turn;
}

function handleClick(e){
  const btn = e.currentTarget;
  const idx = Number(btn.dataset.index);
  if(board[idx] || !running) return;
  board[idx] = turn;
  btn.textContent = turn;
  checkResult();
}

function checkResult(){
  let winner = null;
  for(const combo of winCombos){
    const [a,b,c] = combo;
    if(board[a] && board[a] === board[b] && board[a] === board[c]){
      winner = board[a];
      highlight(combo);
      break;
    }
  }
  if(winner){
    statusEl.textContent = `Vencedor: ${winner}`;
    running = false;
    return;
  }
  if(board.every(cell => cell)){
    statusEl.textContent = 'Empate';
    running = false;
    return;
  }
  turn = turn === 'X' ? 'O' : 'X';
  updateStatus();
}

function highlight(combo){
  combo.forEach(i => cells[i].classList.add('winning'));
}

function restart(){
  board = Array(9).fill(null);
  cells.forEach(c => { c.textContent = ''; c.classList.remove('winning'); });
  turn = 'X';
  running = true;
  statusEl.textContent = 'Vez: ';
  playerEl.textContent = turn;
}

cells.forEach(c => c.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restart);

// inicializa
updateStatus();
