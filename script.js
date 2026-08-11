const WORDS = {
  easy: [
    { word: 'apple', hint: 'A fruit that keeps the doctor away' },
    { word: 'beach', hint: 'Sandy shore by the sea' },
    { word: 'cloud', hint: 'Fluffy white thing in the sky' },
    { word: 'dance', hint: 'Move rhythmically to music' },
    { word: 'eagle', hint: 'A majestic bird of prey' },
    { word: 'flame', hint: 'Hot glowing gas from fire' },
    { word: 'grape', hint: 'Small purple fruit used for wine' },
    { word: 'house', hint: 'A place where people live' },
    { word: 'image', hint: 'A picture or visual representation' },
    { word: 'juice', hint: 'A liquid extracted from fruits' },
    { word: 'knife', hint: 'A tool used for cutting' },
    { word: 'lemon', hint: 'A sour yellow citrus fruit' },
    { word: 'mango', hint: 'A sweet tropical fruit' },
    { word: 'night', hint: 'The time when it is dark' },
    { word: 'ocean', hint: 'A vast body of salt water' },
    { word: 'piano', hint: 'A musical instrument with keys' },
    { word: 'queen', hint: 'The female ruler of a kingdom' },
    { word: 'river', hint: 'A natural flowing water stream' },
    { word: 'snake', hint: 'A long legless reptile' },
    { word: 'tiger', hint: 'A large striped wild cat' },
  ],
  medium: [
    { word: 'ancient', hint: 'Very old, from a long time ago' },
    { word: 'bridge', hint: 'A structure built over a river or road' },
    { word: 'castle', hint: 'A large fortified building' },
    { word: 'desert', hint: 'A hot dry sandy region' },
    { word: 'empire', hint: 'A group of countries under one ruler' },
    { word: 'fossil', hint: 'Preserved remains of ancient life' },
    { word: 'galaxy', hint: 'A system of millions of stars' },
    { word: 'harvest', hint: 'The process of gathering crops' },
    { word: 'island', hint: 'Land surrounded by water' },
    { word: 'jungle', hint: 'A thick tropical forest' },
    { word: 'knight', hint: 'A medieval armored warrior' },
    { word: 'lantern', hint: 'A portable light source' },
    { word: 'mirror', hint: 'A reflective surface' },
    { word: 'noodle', hint: 'A thin strip of pasta' },
    { word: 'orbit', hint: 'The path of a planet around a star' },
    { word: 'puzzle', hint: 'A game that tests ingenuity' },
    { word: 'rocket', hint: 'A vehicle that travels to space' },
    { word: 'silver', hint: 'A precious gray metal' },
    { word: 'temple', hint: 'A place of worship' },
    { word: 'voyage', hint: 'A long journey, especially by sea' },
  ],
  hard: [
    { word: 'ambiguous', hint: 'Open to more than one interpretation' },
    { word: 'benevolent', hint: 'Well-meaning and kindly' },
    { word: 'catastrophe', hint: 'A sudden widespread disaster' },
    { word: 'dichotomy', hint: 'A division into two contrasting things' },
    { word: 'ephemeral', hint: 'Lasting for a very short time' },
    { word: 'facetious', hint: 'Treating serious issues with humor' },
    { word: 'gregarious', hint: 'Fond of company; sociable' },
    { word: 'hypothetical', hint: 'Based on assumed conditions' },
    { word: 'ineffable', hint: 'Too great to be expressed in words' },
    { word: 'juxtapose', hint: 'Place side by side for comparison' },
    { word: 'kaleidoscope', hint: 'A tube with mirrors showing patterns' },
    { word: 'labyrinth', hint: 'A complicated maze' },
    { word: 'magnificent', hint: 'Extremely beautiful and impressive' },
    { word: 'nostalgia', hint: 'Sentimental longing for the past' },
    { word: 'obstinate', hint: 'Stubbornly refusing to change' },
    { word: 'pandemonium', hint: 'Wild and noisy disorder' },
    { word: 'quintessential', hint: 'The most perfect example of something' },
    { word: 'serendipity', hint: 'Finding good things by chance' },
    { word: 'ubiquitous', hint: 'Found everywhere' },
    { word: 'whimsical', hint: 'Playfully quaint or fanciful' },
  ]
};

let state = {
  difficulty: 'easy',
  currentWord: null,
  guessedLetters: [],
  wrongGuesses: 0,
  maxWrong: 6,
  score: 0,
  currentPlayer: null,
  gameActive: false,
  players: [],
  scoreTarget: 50,
  matchOver: false,
};

function loadPlayers() {
  state.players = [
    { name: 'Player 1', wins: 0, losses: 0, score: 0 },
    { name: 'Player 2', wins: 0, losses: 0, score: 0 },
  ];
  state.currentPlayer = state.players[0];
}

function savePlayers() {
  localStorage.setItem('hangmanPlayers', JSON.stringify(state.players));
}

let editRow = null;

function renderScoreboard() {
  const sorted = [...state.players].sort((a, b) => b.score - a.score || b.wins - a.wins);
  const tbody = document.getElementById('scoreboardBody');
  tbody.innerHTML = '';
  sorted.forEach((p, i) => {
    const rankClass = i === 0 ? 'rank-1' : i === 1 ? 'rank-2' : i === 2 ? 'rank-3' : '';
    const isActive = state.currentPlayer && state.currentPlayer.name === p.name;
    const tr = document.createElement('tr');
    tr.dataset.player = p.name;
    tr.style.background = isActive ? 'rgba(46, 204, 113, 0.1)' : '';
    tr.innerHTML = `
      <td class="rank ${rankClass}">${i + 1}</td>
      <td class="player-name-cell" data-player="${p.name}">
        <span class="name-display">${p.name}</span>
        ${isActive ? '<span style="color:#2ecc71;font-size:12px;">(playing)</span>' : ''}
      </td>
      <td>${p.wins}</td>
      <td>${p.losses}</td>
      <td class="score-value">${p.score}</td>
      <td style="display:flex;gap:4px;">
        <button class="btn btn-sm edit-btn" data-player="${p.name}" style="background:rgba(52,152,219,0.3);color:#3498db;border:1px solid rgba(52,152,219,0.3);font-size:11px;padding:4px 8px;border-radius:8px;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.background='rgba(52,152,219,0.5)'" onmouseout="this.style.background='rgba(52,152,219,0.3)'">✎</button>
        <button class="btn btn-danger btn-sm" onclick="removePlayer('${p.name}')" style="font-size:11px;">X</button>
      </td>
    `;
    tr.querySelector('.player-name-cell').addEventListener('click', () => startInlineEdit(p.name));
    tr.querySelector('.edit-btn').addEventListener('click', (e) => { e.stopPropagation(); startInlineEdit(p.name); });
    tbody.appendChild(tr);
  });
}

function updatePlayerBadge() {
  if (state.currentPlayer) {
    document.getElementById('playerBadge').textContent = state.currentPlayer.name;
  }
}

function addPlayer() {
  const input = document.getElementById('playerNameInput');
  const name = input.value.trim();
  if (!name) return;
  if (state.players.some(p => p.name.toLowerCase() === name.toLowerCase())) {
    alert('Player already exists!');
    return;
  }
  state.players.push({ name, wins: 0, losses: 0, score: 0 });
  savePlayers();
  renderScoreboard();
  input.value = '';
  if (state.players.length === 1) {
    state.currentPlayer = state.players[0];
    updatePlayerBadge();
  }
}

function removePlayer(name) {
  if (state.players.length <= 1) {
    alert('Need at least one player!');
    return;
  }
  state.players = state.players.filter(p => p.name !== name);
  savePlayers();
  if (state.currentPlayer && state.currentPlayer.name === name) {
    state.currentPlayer = state.players[0];
    updatePlayerBadge();
  }
  renderScoreboard();
}

function startInlineEdit(oldName) {
  if (editRow) cancelInlineEdit();
  const cell = document.querySelector(`.player-name-cell[data-player="${oldName}"]`);
  if (!cell) return;
  const display = cell.querySelector('.name-display');
  if (!display) return;
  editRow = oldName;
  display.style.display = 'none';
  const input = document.createElement('input');
  input.type = 'text';
  input.value = oldName;
  input.maxLength = 20;
  input.className = 'inline-edit-input';
  input.style.cssText = 'width:100%;background:rgba(255,255,255,0.1);border:1px solid rgba(247,151,30,0.5);border-radius:6px;color:#fff;font-family:Poppins,sans-serif;font-size:13px;padding:2px 6px;outline:none;box-sizing:border-box;';
  cell.insertBefore(input, display.nextSibling);
  input.focus();
  input.select();
  const save = () => saveInlineEdit(oldName, input);
  input.addEventListener('blur', save);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { input.blur(); }
    if (e.key === 'Escape') cancelInlineEdit();
  });
}

function saveInlineEdit(oldName, input) {
  if (editRow !== oldName) return;
  const trimmed = input.value.trim();
  const cell = document.querySelector(`.player-name-cell[data-player="${oldName}"]`);
  if (cell) {
    const display = cell.querySelector('.name-display');
    if (trimmed && trimmed !== oldName) {
      if (state.players.some(p => p.name.toLowerCase() === trimmed.toLowerCase() && p.name !== oldName)) {
        display.textContent = oldName;
        display.style.display = '';
        input.remove();
        editRow = null;
        return;
      }
      const player = state.players.find(p => p.name === oldName);
      if (player) {
        const wasCurrent = state.currentPlayer && state.currentPlayer.name === oldName;
        player.name = trimmed;
        savePlayers();
        if (wasCurrent) {
          state.currentPlayer = player;
          updatePlayerBadge();
        }
      }
    }
    display.textContent = trimmed || oldName;
    display.style.display = '';
  }
  input.remove();
  editRow = null;
  renderScoreboard();
}

function cancelInlineEdit() {
  if (!editRow) return;
  const cell = document.querySelector(`.player-name-cell[data-player="${editRow}"]`);
  if (cell) {
    const display = cell.querySelector('.name-display');
    if (display) display.style.display = '';
    const input = cell.querySelector('.inline-edit-input');
    if (input) input.remove();
  }
  editRow = null;
}

function resetScores() {
  if (!confirm('Reset all scores for everyone?')) return;
  state.players.forEach(p => { p.wins = 0; p.losses = 0; p.score = 0; });
  savePlayers();
  renderScoreboard();
}

let pendingDiff = null;
let diffResetScore = false;

function setDifficulty(diff) {
  if (state.gameActive) {
    pendingDiff = diff;
    diffResetScore = false;
    document.getElementById('diffTargetValue').textContent = state.scoreTarget;
    document.getElementById('diffResetScoreBtn').style.background = 'rgba(231,76,60,0.3)';
    document.getElementById('diffResetScoreBtn').style.borderColor = '#e74c3c';
    document.getElementById('diffKeepScoreBtn').style.background = 'rgba(46,204,113,0.5)';
    document.getElementById('diffKeepScoreBtn').style.borderColor = '#2ecc71';
    document.getElementById('diffConfirmModal').classList.add('show');
    return;
  }
  applyDifficulty(diff);
}

document.getElementById('diffTargetDecBtn').addEventListener('click', () => {
  let val = parseInt(document.getElementById('diffTargetValue').textContent) || 50;
  val = Math.max(10, val - 10);
  document.getElementById('diffTargetValue').textContent = val;
});

document.getElementById('diffTargetIncBtn').addEventListener('click', () => {
  let val = parseInt(document.getElementById('diffTargetValue').textContent) || 50;
  val = Math.min(999, val + 10);
  document.getElementById('diffTargetValue').textContent = val;
});

document.getElementById('diffResetScoreBtn').addEventListener('click', () => {
  diffResetScore = true;
  document.getElementById('diffResetScoreBtn').style.background = 'rgba(231,76,60,0.6)';
  document.getElementById('diffResetScoreBtn').style.borderColor = '#fff';
  document.getElementById('diffKeepScoreBtn').style.background = 'rgba(46,204,113,0.3)';
  document.getElementById('diffKeepScoreBtn').style.borderColor = '#2ecc71';
});

document.getElementById('diffKeepScoreBtn').addEventListener('click', () => {
  diffResetScore = false;
  document.getElementById('diffKeepScoreBtn').style.background = 'rgba(46,204,113,0.5)';
  document.getElementById('diffKeepScoreBtn').style.borderColor = '#fff';
  document.getElementById('diffResetScoreBtn').style.background = 'rgba(231,76,60,0.3)';
  document.getElementById('diffResetScoreBtn').style.borderColor = '#e74c3c';
});

document.getElementById('diffConfirmBtn').addEventListener('click', () => {
  document.getElementById('diffConfirmModal').classList.remove('show');
  if (pendingDiff) {
    const diff = pendingDiff;
    pendingDiff = null;
    const newTarget = parseInt(document.getElementById('diffTargetValue').textContent);
    if (newTarget && newTarget >= 10) {
      state.scoreTarget = newTarget;
    }
    if (diffResetScore && state.currentPlayer) {
      state.currentPlayer.score = 0;
      state.currentPlayer.wins = 0;
      state.currentPlayer.losses = 0;
      state.score = 0;
      savePlayers();
      renderScoreboard();
    }
    applyDifficulty(diff);
    const wordData = getRandomWord();
    state.currentWord = wordData.word.toUpperCase();
    state.guessedLetters = [];
    state.wrongGuesses = 0;
    document.getElementById('hintText').textContent = wordData.hint;
    resetKeyboard();
    document.querySelectorAll('.key').forEach(k => k.disabled = false);
    updateLives();
    renderWord();
    hideHangmanParts();
    document.getElementById('targetDisplay').textContent = `Target: ${state.scoreTarget} pts`;
    document.getElementById('gameStatus').textContent = 'Difficulty changed! New word loaded.';
    document.getElementById('gameStatus').style.color = '#f1c40f';
    setTimeout(() => {
      document.getElementById('gameStatus').textContent = 'Guess the word!';
      document.getElementById('gameStatus').style.color = 'rgba(255, 255, 255, 0.8)';
    }, 1500);
  }
});

document.getElementById('diffCancelBtn').addEventListener('click', () => {
  document.getElementById('diffConfirmModal').classList.remove('show');
  pendingDiff = null;
});

function applyDifficulty(diff) {
  state.difficulty = diff;
  document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`.difficulty-btn.${diff}`).classList.add('active');
}

function switchPlayer(player) {
  state.currentPlayer = player;
  updatePlayerBadge();
}

function initParticles() {
  const container = document.getElementById('particles');
  const colors = ['#f7971e', '#ffd200', '#2ecc71', '#3498db', '#9b59b6', '#fff'];
  for (let i = 0; i < 45; i++) {
    const p = document.createElement('div');
    const size = 2 + Math.random() * 5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    p.className = 'particle' + (Math.random() > 0.6 ? ' particle-glow' : '');
    p.style.left = Math.random() * 100 + '%';
    p.style.width = p.style.height = size + 'px';
    p.style.background = color;
    p.style.color = color;
    p.style.animationDuration = (10 + Math.random() * 15) + 's';
    p.style.animationDelay = (Math.random() * 20) + 's';
    container.appendChild(p);
  }
}

function initKeyboard() {
  const kb = document.getElementById('keyboard');
  kb.innerHTML = '';
  'abcdefghijklmnopqrstuvwxyz'.split('').forEach(ch => {
    const key = document.createElement('button');
    key.className = 'key';
    key.textContent = ch;
    key.dataset.letter = ch;
    key.addEventListener('click', () => handleGuess(ch));
    kb.appendChild(key);
  });
}

function resetKeyboard() {
  document.querySelectorAll('.key').forEach(k => {
    k.disabled = false;
    k.className = 'key';
  });
}

function updateLives() {
  const livesContainer = document.getElementById('lives');
  const hearts = livesContainer.querySelectorAll('.heart');
  hearts.forEach((h, i) => {
    if (i < state.maxWrong - state.wrongGuesses) {
      h.className = 'heart';
      h.textContent = '❤️';
    } else {
      h.className = 'heart lost';
      h.textContent = '💔';
    }
  });
}

function getRandomWord() {
  const pool = WORDS[state.difficulty];
  return pool[Math.floor(Math.random() * pool.length)];
}

function showStartScreen() {
  closeModal();
  state.gameActive = false;
  state.currentWord = null;
  state.guessedLetters = [];
  state.wrongGuesses = 0;
  document.getElementById('startScreen').style.display = 'flex';
  document.getElementById('wordLetters').style.display = 'none';
  document.getElementById('hintArea').style.display = 'none';
  document.getElementById('targetDisplay').style.display = 'none';
  document.getElementById('gameStatus').textContent = 'Choose a difficulty and press Start Game!';
  document.getElementById('gameStatus').style.color = 'rgba(255, 255, 255, 0.5)';
  document.querySelectorAll('.key').forEach(k => k.disabled = true);
  updateLives();
  hideHangmanParts();
}

function showTargetModal() {
  document.getElementById('targetDisplayValue').textContent = state.scoreTarget;
  document.getElementById('targetModal').classList.add('show');
}

document.getElementById('targetDecBtn').addEventListener('click', () => {
  let val = parseInt(document.getElementById('targetDisplayValue').textContent) || 50;
  val = Math.max(10, val - 10);
  document.getElementById('targetDisplayValue').textContent = val;
});

document.getElementById('targetIncBtn').addEventListener('click', () => {
  let val = parseInt(document.getElementById('targetDisplayValue').textContent) || 50;
  val = Math.min(999, val + 10);
  document.getElementById('targetDisplayValue').textContent = val;
});

document.getElementById('targetConfirmBtn').addEventListener('click', () => {
  const val = parseInt(document.getElementById('targetDisplayValue').textContent);
  if (val && val >= 10) {
    state.scoreTarget = val;
  }
  document.getElementById('targetModal').classList.remove('show');
  beginGame();
});

function beginGame() {
  closeModal();
  state.gameActive = true;
  document.getElementById('celebration').innerHTML = '';
  const wordData = getRandomWord();
  state.currentWord = wordData.word.toUpperCase();
  state.guessedLetters = [];
  state.wrongGuesses = 0;

  document.getElementById('startScreen').style.display = 'none';
  document.getElementById('wordLetters').style.display = 'flex';
  document.getElementById('hintArea').style.display = 'block';
  document.getElementById('hintText').textContent = wordData.hint;
  document.getElementById('targetDisplay').style.display = 'inline-block';
  document.getElementById('targetDisplay').textContent = `Target: ${state.scoreTarget} pts`;
  document.getElementById('gameStatus').textContent = 'Guess the word!';
  document.getElementById('gameStatus').style.color = 'rgba(255, 255, 255, 0.8)';

  resetKeyboard();
  document.querySelectorAll('.key').forEach(k => k.disabled = false);
  updateLives();
  renderWord();
  hideHangmanParts();
}

function hideHangmanParts() {
  const parts = ['part-base', 'part-head', 'part-body', 'part-left-arm', 'part-right-arm', 'part-left-leg', 'part-right-leg'];
  parts.forEach((id, i) => {
    const el = document.querySelector(`#${id}`);
    el.classList.remove('show', 'swing');
    if (i === 0) el.classList.add('show');
  });
}

function renderWord() {
  const container = document.getElementById('wordLetters');
  container.innerHTML = '';
  if (!state.currentWord) return;
  state.currentWord.split('').forEach((ch, i) => {
    const box = document.createElement('div');
    box.className = 'letter-box';
    box.id = `letter-${i}`;
    if (state.guessedLetters.includes(ch)) {
      box.textContent = ch;
      box.classList.add('revealed');
    } else {
      box.textContent = '_';
    }
    container.appendChild(box);
  });
}

function handleGuess(letter) {
  if (!state.gameActive) return;
  const key = document.querySelector(`.key[data-letter="${letter}"]`);
  if (key.disabled) return;

  const upper = letter.toUpperCase();
  state.guessedLetters.push(upper);
  key.disabled = true;

  if (state.currentWord.includes(upper)) {
    key.classList.add('used-correct');
    renderWord();

    const indices = [];
    state.currentWord.split('').forEach((ch, i) => {
      if (ch === upper) indices.push(i);
    });
    indices.forEach(i => {
      const box = document.getElementById(`letter-${i}`);
      if (box) box.classList.add('correct-flash');
    });

    if (checkWin()) {
      handleWin();
    }
  } else {
    key.classList.add('used-wrong');
    state.wrongGuesses++;
    updateLives();
    showNextHangmanPart();
    shakeWord();

    if (checkLose()) {
      handleLose();
    }
  }
}

function initHangmanPaths() {
  document.querySelectorAll('.hangman-part line, .hangman-part circle, .hangman-part path').forEach(el => {
    const len = el.getTotalLength ? el.getTotalLength() : 1000;
    el.style.setProperty('--length', len);
  });
}

function showNextHangmanPart() {
  const order = ['part-head', 'part-body', 'part-left-arm', 'part-right-arm', 'part-left-leg', 'part-right-leg'];
  const idx = state.wrongGuesses - 1;
  if (idx >= 0 && idx < order.length) {
    const el = document.querySelector(`#${order[idx]}`);
    el.classList.add('show');
    setTimeout(() => el.classList.add('swing'), 700);
  }
}

function shakeWord() {
  document.querySelectorAll('.letter-box').forEach(box => {
    if (box.textContent === '_') {
      box.classList.add('wrong');
      setTimeout(() => box.classList.remove('wrong'), 500);
    }
  });
}

function checkWin() {
  return state.currentWord.split('').every(ch => state.guessedLetters.includes(ch));
}

function checkLose() {
  return state.wrongGuesses >= state.maxWrong;
}

function nextTurn() {
  if (state.gameActive) return;
  closeModal();
  if (checkChampion()) return;
  cyclePlayer();
  const next = state.currentPlayer;
  const statusEl = document.getElementById('gameStatus');
  statusEl.className = 'game-status';
  statusEl.style.color = '#ffd200';
  statusEl.textContent = `${next.name}'s turn!`;
  setTimeout(() => beginGame(), 600);
}

function checkChampion() {
  const target = state.scoreTarget;
  if (target <= 0) return false;
  for (const p of state.players) {
    if (p.score >= target) {
      document.getElementById('championName').textContent = p.name;
      document.getElementById('championModal').classList.add('show');
      showCelebration();
      return true;
    }
  }
  return false;
}

function resetMatch() {
  document.getElementById('championModal').classList.remove('show');
  state.players.forEach(p => { p.wins = 0; p.losses = 0; p.score = 0; });
  savePlayers();
  renderScoreboard();
  state.currentPlayer = state.players[0];
  updatePlayerBadge();
  showStartScreen();
}

function handleWin() {
  state.gameActive = false;
  const points = { easy: 10, medium: 25, hard: 50 }[state.difficulty];
  state.score += points;

  if (state.currentPlayer) {
    state.currentPlayer.wins++;
    state.currentPlayer.score += points;
    savePlayers();
    renderScoreboard();
  }

  const statusEl = document.getElementById('gameStatus');
  statusEl.className = 'game-status';
  const remaining = state.maxWrong - state.wrongGuesses;
  let praise, subtitle;
  if (remaining >= state.maxWrong) {
    praise = 'FLAWLESS!';
    subtitle = 'Perfect game — not a single mistake!';
    statusEl.classList.add('praise-flawless');
  } else if (remaining === state.maxWrong - 1) {
    praise = 'Brilliant!';
    subtitle = 'Almost perfect — only one slip!';
    statusEl.classList.add('praise-normal');
    statusEl.style.color = '#ffd200';
  } else if (remaining === state.maxWrong - 2) {
    praise = 'Impressive!';
    subtitle = 'Strong play with minimal errors!';
    statusEl.classList.add('praise-normal');
    statusEl.style.color = '#2ecc71';
  } else if (remaining === state.maxWrong - 3) {
    praise = 'Great Job!';
    subtitle = 'Solid recovery to finish strong!';
    statusEl.classList.add('praise-normal');
    statusEl.style.color = '#3498db';
  } else if (remaining === state.maxWrong - 4) {
    praise = 'Close One!';
    subtitle = 'You pulled through under pressure!';
    statusEl.classList.add('praise-normal');
    statusEl.style.color = '#9b59b6';
  } else {
    praise = 'CLUTCH!';
    subtitle = 'Down to the wire — incredible save!';
    statusEl.classList.add('praise-clutch');
  }

  statusEl.textContent = `${praise} ${state.currentPlayer.name} got it!`;
  showCelebration();

  const correctCount = state.guessedLetters.filter(l => state.currentWord.includes(l)).length;
  const heartsStr = '❤️'.repeat(remaining) + '🖤'.repeat(state.wrongGuesses);
  document.getElementById('statHearts').textContent = heartsStr;
  document.getElementById('statWrong').textContent = `${state.wrongGuesses} / ${state.maxWrong}`;
  document.getElementById('statCorrect').textContent = correctCount;
  document.getElementById('statPoints').textContent = `+${points}pts`;

  const next = getNextPlayer();
  document.getElementById('modalContinueBtn').dataset.next = next ? next.name : '';
  showModal(
    'win',
    `${praise} ${state.currentPlayer.name} Won!`,
    subtitle,
    state.currentWord
  );
}

function handleLose() {
  state.gameActive = false;

  if (state.currentPlayer) {
    state.currentPlayer.losses++;
    savePlayers();
    renderScoreboard();
  }

  document.getElementById('gameStatus').textContent = `${state.currentPlayer.name} lost!`;
  document.getElementById('gameStatus').style.color = '#e74c3c';

  const heartsStr = '🖤'.repeat(state.maxWrong);
  const correctCount = state.guessedLetters.filter(l => state.currentWord.includes(l)).length;
  document.getElementById('statHearts').textContent = heartsStr;
  document.getElementById('statWrong').textContent = `${state.wrongGuesses} / ${state.maxWrong}`;
  document.getElementById('statCorrect').textContent = correctCount;
  document.getElementById('statPoints').textContent = `0pts`;

  const next = getNextPlayer();
  document.getElementById('modalContinueBtn').dataset.next = next ? next.name : '';
  showModal(
    'lose',
    `💀 ${state.currentPlayer.name} Out!`,
    `Word was: "${state.currentWord}"`,
    state.currentWord
  );
}

function showCelebration() {
  const container = document.getElementById('celebration');
  container.innerHTML = '';
  const colors = ['#f7971e', '#ffd200', '#2ecc71', '#e74c3c', '#3498db', '#9b59b6', '#1abc9c', '#e84393', '#00cec9'];
  const shapes = ['confetti-circle', 'confetti-square', 'confetti-star'];
  for (let i = 0; i < 100; i++) {
    const c = document.createElement('div');
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    c.className = 'confetti ' + shape;
    const size = 6 + Math.random() * 10;
    c.style.left = Math.random() * 100 + '%';
    c.style.background = colors[Math.floor(Math.random() * colors.length)];
    c.style.width = size + 'px';
    c.style.height = size + 'px';
    if (shape === 'confetti-circle') {
      c.style.background = `radial-gradient(circle at 30% 30%, ${colors[Math.floor(Math.random() * colors.length)]}, ${colors[Math.floor(Math.random() * colors.length)]})`;
    }
    c.style.animationDuration = (2 + Math.random() * 3) + 's';
    c.style.animationDelay = (Math.random() * 1.5) + 's';
    container.appendChild(c);
  }
  setTimeout(() => container.innerHTML = '', 6000);
}

function showModal(type, title, subtitle, word) {
  const modal = document.getElementById('gameOverModal');
  const titleEl = document.getElementById('modalTitle');
  const subtitleEl = document.getElementById('modalSubtitle');
  const wordEl = document.getElementById('modalWord');

  titleEl.textContent = title;
  titleEl.className = type === 'win' ? 'win-title' : 'lose-title';
  subtitleEl.textContent = subtitle;
  wordEl.textContent = word;

  modal.classList.add('show');
  document.getElementById('modalContinueBtn').focus();
}

function closeModal() {
  document.getElementById('gameOverModal').classList.remove('show');
}

function updateStatus() {
  document.getElementById('gameStatus').textContent = 'Guess the word!';
  document.getElementById('gameStatus').style.color = 'rgba(255, 255, 255, 0.8)';
}

document.addEventListener('keydown', (e) => {
  if (e.key >= 'a' && e.key <= 'z') {
    handleGuess(e.key);
  }
});

function getNextPlayer() {
  if (state.players.length === 0) return null;
  const idx = state.players.indexOf(state.currentPlayer);
  return state.players[(idx + 1) % state.players.length];
}

function cyclePlayer() {
  if (state.players.length === 0) return;
  const next = getNextPlayer();
  if (next) {
    state.currentPlayer = next;
    updatePlayerBadge();
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    e.preventDefault();
    cyclePlayer();
  }
});

document.getElementById('playerBadge').addEventListener('click', (e) => {
  e.stopPropagation();
  if (state.currentPlayer) startInlineEdit(state.currentPlayer.name);
});

document.addEventListener('click', (e) => {
  if (editRow && !e.target.closest('.player-name-cell') && !e.target.closest('.inline-edit-input')) {
    cancelInlineEdit();
  }
});

document.getElementById('modalContinueBtn').addEventListener('click', nextTurn);

loadPlayers();
initParticles();
initKeyboard();
initHangmanPaths();
showStartScreen();
renderScoreboard();
updatePlayerBadge();
