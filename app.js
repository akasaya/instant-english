const decks = (window.QUESTION_DECKS || []).map(deck => ({
  ...deck,
  items: deck.items.map((item, index) => ({
    ...item,
    key: item.key || `${deck.id}-${index}`
  }))
}));

const STORAGE_KEY = "instantEisakuStatsV2";

const state = {
  deckId: "core",
  level: "all",
  order: "shuffle",
  mode: "typing",
  queue: [],
  index: 0,
  sessionActive: false,
  paused: false,
  answerVisible: false,
  answered: false,
  timerId: null,
  timerLimitMs: 12000,
  remainingMs: 12000,
  elapsedMs: 0,
  startedAt: Date.now(),
  recognition: null,
  listening: false,
  stats: loadStats()
};

const el = {
  deckSelect: document.querySelector("#deckSelect"),
  levelSelect: document.querySelector("#levelSelect"),
  orderSelect: document.querySelector("#orderSelect"),
  typingMode: document.querySelector("#typingMode"),
  speakingMode: document.querySelector("#speakingMode"),
  japaneseText: document.querySelector("#japaneseText"),
  questionCounter: document.querySelector("#questionCounter"),
  questionLevel: document.querySelector("#questionLevel"),
  answerInput: document.querySelector("#answerInput"),
  speakButton: document.querySelector("#speakButton"),
  speechStatus: document.querySelector("#speechStatus"),
  startButton: document.querySelector("#startButton"),
  pauseButton: document.querySelector("#pauseButton"),
  restartButton: document.querySelector("#restartButton"),
  sessionStatus: document.querySelector("#sessionStatus"),
  showAnswerButton: document.querySelector("#showAnswerButton"),
  correctButton: document.querySelector("#correctButton"),
  missButton: document.querySelector("#missButton"),
  nextButton: document.querySelector("#nextButton"),
  modelAnswer: document.querySelector("#modelAnswer"),
  hintText: document.querySelector("#hintText"),
  streakCount: document.querySelector("#streakCount"),
  doneCount: document.querySelector("#doneCount"),
  accuracyRate: document.querySelector("#accuracyRate"),
  weakCount: document.querySelector("#weakCount"),
  historyList: document.querySelector("#historyList"),
  resetButton: document.querySelector("#resetButton"),
  timerBar: document.querySelector("#timerBar")
};

function loadStats() {
  const fallback = { done: 0, correct: 0, streak: 0, weak: {}, history: [] };
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || fallback;
  } catch {
    return fallback;
  }
}

function saveStats() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.stats));
}

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[.,!?;:]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function currentDeck() {
  return decks.find(deck => deck.id === state.deckId) || decks[0];
}

function currentItem() {
  return state.queue[state.index] || state.queue[0];
}

function filteredItems() {
  const deck = currentDeck();
  return state.level === "all"
    ? deck.items
    : deck.items.filter(item => String(item.level) === state.level);
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function rebuildQueue() {
  const items = filteredItems();
  if (state.order === "ordered") {
    state.queue = items;
  } else if (state.order === "weak") {
    state.queue = [...items].sort((a, b) => (state.stats.weak[b.key] || 0) - (state.stats.weak[a.key] || 0));
  } else {
    state.queue = shuffle(items);
  }
  state.index = 0;
  if (state.sessionActive) {
    renderQuestion();
  } else {
    renderReadyState();
  }
}

function renderReadyState() {
  clearInterval(state.timerId);
  if (state.listening && state.recognition) state.recognition.stop();
  state.paused = false;
  state.remainingMs = state.timerLimitMs;
  el.japaneseText.textContent = "開始を押すと出題されます。";
  el.questionCounter.textContent = `0 / ${state.queue.length || filteredItems().length}`;
  el.questionLevel.textContent = "Ready";
  el.answerInput.value = "";
  el.modelAnswer.textContent = "練習を開始すると表示できます。";
  el.hintText.textContent = "開始後、和文を見た瞬間に英語を出してください。";
  el.timerBar.style.transform = "scaleX(1)";
  updateSessionControls();
  updateStats();
}

function renderQuestion() {
  const item = currentItem();
  state.answerVisible = false;
  state.answered = false;
  state.remainingMs = state.timerLimitMs;
  state.elapsedMs = 0;
  state.startedAt = Date.now();
  el.japaneseText.textContent = item.ja;
  el.questionCounter.textContent = `${state.index + 1} / ${state.queue.length}`;
  el.questionLevel.textContent = `Level ${item.level}`;
  el.answerInput.value = "";
  el.modelAnswer.textContent = "答えを見ると表示されます。";
  el.hintText.textContent = item.hint;
  el.correctButton.disabled = false;
  el.missButton.disabled = false;
  el.answerInput.focus();
  updateStats();
  updateSessionControls();
  startTimer();
}

function startTimer() {
  clearInterval(state.timerId);
  if (!state.sessionActive || state.paused) return;
  state.startedAt = Date.now();
  el.timerBar.style.transform = `scaleX(${state.remainingMs / state.timerLimitMs})`;
  state.timerId = setInterval(() => {
    const delta = Date.now() - state.startedAt;
    state.elapsedMs += delta;
    state.remainingMs = Math.max(0, state.remainingMs - delta);
    state.startedAt = Date.now();
    const left = Math.max(0, state.remainingMs / state.timerLimitMs);
    el.timerBar.style.transform = `scaleX(${left})`;
    if (left === 0) clearInterval(state.timerId);
  }, 80);
}

function captureTimerDelta() {
  if (!state.sessionActive || state.paused) return;
  const delta = Date.now() - state.startedAt;
  state.elapsedMs += delta;
  state.remainingMs = Math.max(0, state.remainingMs - delta);
  state.startedAt = Date.now();
}

function startSession() {
  if (state.sessionActive && state.paused) {
    state.paused = false;
    el.answerInput.focus();
    updateSessionControls();
    startTimer();
    return;
  }
  state.sessionActive = true;
  state.paused = false;
  state.index = 0;
  renderQuestion();
}

function pauseSession() {
  if (!state.sessionActive) return;
  if (state.paused) {
    startSession();
    return;
  }
  captureTimerDelta();
  state.paused = true;
  clearInterval(state.timerId);
  if (state.listening && state.recognition) state.recognition.stop();
  updateSessionControls();
}

function restartSession() {
  state.sessionActive = false;
  state.paused = false;
  rebuildQueue();
}

function canAnswer() {
  return state.sessionActive && !state.paused;
}

function updateSessionControls() {
  const disabled = !canAnswer();
  el.startButton.disabled = state.sessionActive && !state.paused;
  el.startButton.textContent = state.sessionActive && state.paused ? "再開" : "開始";
  el.pauseButton.disabled = !state.sessionActive;
  el.pauseButton.textContent = state.paused ? "再開" : "一時停止";
  el.restartButton.disabled = !state.sessionActive && state.index === 0;
  el.answerInput.disabled = disabled;
  el.showAnswerButton.disabled = disabled;
  el.correctButton.disabled = disabled || state.answered;
  el.missButton.disabled = disabled || state.answered;
  el.nextButton.disabled = disabled;
  el.speakButton.disabled = disabled || state.mode !== "speaking" || !supportsSpeechRecognition();
  el.sessionStatus.textContent = state.sessionActive
    ? state.paused
      ? "一時停止中です。再開すると同じ問題から続きます。"
      : "練習中です。"
    : "開始を押すと出題されます。";
}

function revealAnswer() {
  if (!canAnswer()) return;
  const item = currentItem();
  state.answerVisible = true;
  el.modelAnswer.textContent = item.en;
  speakText(item.en);
}

function markResult(wasCorrect) {
  if (!canAnswer() || state.answered) return;
  const item = currentItem();
  captureTimerDelta();
  const seconds = Math.max(1, Math.round(state.elapsedMs / 1000));
  state.answered = true;
  el.correctButton.disabled = true;
  el.missButton.disabled = true;
  state.stats.done += 1;
  state.stats.correct += wasCorrect ? 1 : 0;
  state.stats.streak = wasCorrect ? state.stats.streak + 1 : 0;
  state.stats.weak[item.key] = Math.max(0, (state.stats.weak[item.key] || 0) + (wasCorrect ? -1 : 1));
  state.stats.history.unshift({
    ja: item.ja,
    en: item.en,
    answer: el.answerInput.value.trim(),
    ok: wasCorrect,
    seconds
  });
  state.stats.history = state.stats.history.slice(0, 10);
  saveStats();
  revealAnswer();
  updateStats();
}

function nextQuestion() {
  if (!canAnswer()) return;
  state.index += 1;
  if (state.index >= state.queue.length) {
    rebuildQueue();
    return;
  }
  renderQuestion();
}

function updateStats() {
  const accuracy = state.stats.done ? Math.round((state.stats.correct / state.stats.done) * 100) : 0;
  const weakTotal = Object.values(state.stats.weak).filter(score => score > 0).length;
  el.streakCount.textContent = state.stats.streak;
  el.doneCount.textContent = state.stats.done;
  el.accuracyRate.textContent = `${accuracy}%`;
  el.weakCount.textContent = weakTotal;
  renderHistory();
}

function renderHistory() {
  el.historyList.innerHTML = "";
  if (!state.stats.history.length) {
    const li = document.createElement("li");
    li.textContent = "まだ記録はありません。まず1問やってみましょう。";
    el.historyList.append(li);
    return;
  }
  state.stats.history.forEach(record => {
    const li = document.createElement("li");
    li.className = record.ok ? "good" : "miss";
    li.textContent = `${record.ok ? "できた" : "復習"} / ${record.seconds}s: ${record.ja} → ${record.en}`;
    el.historyList.append(li);
  });
}

function setMode(mode) {
  state.mode = mode;
  const speaking = mode === "speaking";
  el.typingMode.classList.toggle("active", !speaking);
  el.speakingMode.classList.toggle("active", speaking);
  el.typingMode.setAttribute("aria-pressed", String(!speaking));
  el.speakingMode.setAttribute("aria-pressed", String(speaking));
  updateSessionControls();
  refreshMicStatus();
}

function supportsSpeechRecognition() {
  return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
}

async function refreshMicStatus() {
  if (state.mode !== "speaking") {
    el.speechStatus.textContent = "スピーキングモードで音声入力を使えます。";
    return;
  }
  if (!supportsSpeechRecognition()) {
    el.speechStatus.textContent = "このブラウザでは音声認識が使えません。Chrome系ブラウザのHTTPS公開URLで試してください。";
    return;
  }
  const secure = window.isSecureContext || location.hostname === "localhost";
  if (!secure) {
    el.speechStatus.textContent = "この環境では音声入力が制限される場合があります。";
    return;
  }
  try {
    if (navigator.permissions?.query) {
      const permission = await navigator.permissions.query({ name: "microphone" });
      const labels = { granted: "許可済み", prompt: "未確認", denied: "ブロック中" };
      el.speechStatus.textContent = `マイク: ${labels[permission.state] || permission.state}。録音開始を押して英語で答えてください。`;
      permission.onchange = refreshMicStatus;
      return;
    }
  } catch {
    // Some browsers do not expose microphone permission status.
  }
  el.speechStatus.textContent = "録音開始を押して英語で答えてください。許可はブラウザのサイト設定に保存されます。";
}

function setupSpeechRecognition() {
  if (!supportsSpeechRecognition()) return;
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  state.recognition = new Recognition();
  state.recognition.lang = "en-US";
  state.recognition.interimResults = true;
  state.recognition.continuous = false;
  state.recognition.onresult = event => {
    const transcript = Array.from(event.results)
      .map(result => result[0].transcript)
      .join(" ");
    el.answerInput.value = transcript;
  };
  state.recognition.onend = () => {
    state.listening = false;
    el.speakButton.textContent = "録音開始";
    refreshMicStatus();
  };
  state.recognition.onerror = event => {
    state.listening = false;
    el.speakButton.textContent = "録音開始";
    if (event.error === "not-allowed") {
      el.speechStatus.textContent = "マイクがブロックされています。ブラウザのサイト設定でマイクを許可してください。";
    } else {
      el.speechStatus.textContent = "音声入力に失敗しました。もう一度試すか、入力欄を使ってください。";
    }
  };
}

function toggleListening() {
  if (!state.recognition || !canAnswer()) return;
  if (state.listening) {
    state.recognition.stop();
    return;
  }
  el.answerInput.value = "";
  state.listening = true;
  el.speakButton.textContent = "録音停止";
  el.speechStatus.textContent = "聞き取り中です。英語で答えてください。";
  state.recognition.start();
}

function speakText(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
}

function autoJudge() {
  const item = currentItem();
  const typed = normalize(el.answerInput.value);
  const model = normalize(item.en);
  if (!typed) return false;
  if (typed === model) return true;
  const typedWords = new Set(typed.split(" "));
  const modelWords = model.split(" ");
  const matched = modelWords.filter(word => typedWords.has(word)).length;
  return matched / modelWords.length >= 0.72;
}

function bindEvents() {
  el.deckSelect.addEventListener("change", event => {
    state.deckId = event.target.value;
    state.sessionActive = false;
    rebuildQueue();
  });
  el.levelSelect.addEventListener("change", event => {
    state.level = event.target.value;
    state.sessionActive = false;
    rebuildQueue();
  });
  el.orderSelect.addEventListener("change", event => {
    state.order = event.target.value;
    state.sessionActive = false;
    rebuildQueue();
  });
  el.typingMode.addEventListener("click", () => setMode("typing"));
  el.speakingMode.addEventListener("click", () => setMode("speaking"));
  el.speakButton.addEventListener("click", toggleListening);
  el.startButton.addEventListener("click", startSession);
  el.pauseButton.addEventListener("click", pauseSession);
  el.restartButton.addEventListener("click", restartSession);
  el.showAnswerButton.addEventListener("click", revealAnswer);
  el.correctButton.addEventListener("click", () => markResult(true));
  el.missButton.addEventListener("click", () => markResult(false));
  el.nextButton.addEventListener("click", nextQuestion);
  el.resetButton.addEventListener("click", () => {
    state.stats = { done: 0, correct: 0, streak: 0, weak: {}, history: [] };
    saveStats();
    updateStats();
  });
  el.answerInput.addEventListener("keydown", event => {
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      if (!canAnswer()) return;
      revealAnswer();
      markResult(autoJudge());
    }
  });
}

function init() {
  decks.forEach(deck => {
    const option = document.createElement("option");
    option.value = deck.id;
    option.textContent = `${deck.name} (${deck.items.length})`;
    el.deckSelect.append(option);
  });
  setupSpeechRecognition();
  bindEvents();
  setMode("typing");
  rebuildQueue();
}

init();
