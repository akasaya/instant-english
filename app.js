const decks = [
  {
    id: "core",
    name: "基礎瞬発",
    items: [
      ["私は毎朝コーヒーを飲みます。", "I drink coffee every morning.", 1, "習慣は現在形で言えます。"],
      ["彼は英語を勉強しています。", "He is studying English.", 1, "今していることは be + ing です。"],
      ["昨日はとても寒かったです。", "It was very cold yesterday.", 1, "yesterday があるので過去形です。"],
      ["私はこの映画を見たことがあります。", "I have seen this movie before.", 1, "経験は have + 過去分詞です。"],
      ["彼女は料理が上手です。", "She is good at cooking.", 1, "be good at ... の形です。"],
      ["私は犬より猫が好きです。", "I like cats better than dogs.", 1, "A better than B で比較できます。"],
      ["このバッグは私のものです。", "This bag is mine.", 1, "mine は my bag の意味です。"],
      ["彼らはまだ到着していません。", "They haven't arrived yet.", 1, "yet は否定文でまだの意味です。"],
      ["雨が降ったら家にいます。", "If it rains, I will stay home.", 2, "条件節の中は現在形です。"],
      ["彼は私にその本を貸してくれました。", "He lent me the book.", 2, "lend + 人 + 物 の形です。"],
      ["私はもっと早く寝るべきでした。", "I should have gone to bed earlier.", 2, "過去の後悔は should have + 過去分詞。"],
      ["これは私が探していた鍵です。", "This is the key I was looking for.", 2, "関係代名詞は省略できます。"],
      ["私は彼に待つように頼みました。", "I asked him to wait.", 2, "ask 人 to ... を使います。"],
      ["窓を開けてもいいですか。", "May I open the window?", 2, "許可は May I ...? が丁寧です。"],
      ["彼は忙しそうに見えます。", "He looks busy.", 2, "look + 形容詞です。"],
      ["私は髪を切ってもらいました。", "I had my hair cut.", 2, "have + 物 + 過去分詞です。"],
      ["彼女がなぜ怒っているのか分かりません。", "I don't know why she is angry.", 3, "間接疑問文は why + 主語 + 動詞。"],
      ["ここから駅まで歩いてどのくらいかかりますか。", "How long does it take to walk from here to the station?", 3, "How long does it take to ...? の形です。"],
      ["もし時間があれば、あなたに電話したのに。", "If I had had time, I would have called you.", 3, "過去の仮定は had + 過去分詞。"],
      ["彼が来るかどうかは分かりません。", "I don't know whether he will come.", 3, "whether + 主語 + 動詞です。"],
      ["この問題は思ったより難しいです。", "This problem is harder than I expected.", 3, "than I expected は思ったより。"],
      ["彼女は英語を話すのに慣れています。", "She is used to speaking English.", 3, "be used to + ing です。"],
      ["私は彼に謝るべきだったと思います。", "I think I should have apologized to him.", 3, "should have apologized で謝るべきだった。"],
      ["早く出発していれば、間に合ったでしょう。", "If we had left earlier, we would have been on time.", 3, "仮定法過去完了です。"]
    ]
  },
  {
    id: "daily",
    name: "日常会話",
    items: [
      ["今日は何をしたいですか。", "What do you want to do today?", 1, "want to + 動詞です。"],
      ["私は少し疲れています。", "I'm a little tired.", 1, "a little は少し。"],
      ["もう一度言ってください。", "Please say that again.", 1, "Please + 動詞で依頼です。"],
      ["彼女は今シャワーを浴びています。", "She is taking a shower now.", 1, "take a shower を使います。"],
      ["私は朝食を食べませんでした。", "I didn't eat breakfast.", 1, "過去の否定は didn't + 動詞原形。"],
      ["この店は何時に閉まりますか。", "What time does this store close?", 1, "What time does ...?"],
      ["私は新しい靴を買いました。", "I bought new shoes.", 1, "buy の過去形は bought。"],
      ["彼はいつも親切です。", "He is always kind.", 1, "always は be 動詞の後に置きます。"],
      ["あとで電話してもいいですか。", "Can I call you later?", 2, "Can I ...? で許可を聞けます。"],
      ["私は夕食を作るつもりです。", "I'm going to cook dinner.", 2, "予定は be going to。"],
      ["彼女に駅で会う予定です。", "I'm going to meet her at the station.", 2, "meet 人 at 場所です。"],
      ["傘を持っていったほうがいいです。", "You should take an umbrella.", 2, "should で助言です。"],
      ["私は鍵をなくしたかもしれません。", "I may have lost my key.", 2, "may have + 過去分詞です。"],
      ["彼は私より背が高いです。", "He is taller than me.", 2, "比較級 + than。"],
      ["私は部屋をきれいにしておきました。", "I cleaned the room in advance.", 2, "in advance で前もって。"],
      ["それについて考えさせてください。", "Let me think about it.", 2, "Let me ... でさせてください。"],
      ["彼女が何を言ったのか聞こえませんでした。", "I couldn't hear what she said.", 3, "what she said は彼女が言ったこと。"],
      ["あなたが来られなくて残念です。", "I'm sorry you can't come.", 3, "I'm sorry + 文で残念を表せます。"],
      ["私が家に着いたとき、彼は寝ていました。", "When I got home, he was sleeping.", 3, "過去の最中は was + ing。"],
      ["そのニュースを聞いて驚きました。", "I was surprised to hear the news.", 3, "be surprised to ... です。"],
      ["彼女は忙しいにもかかわらず手伝ってくれました。", "She helped me even though she was busy.", 3, "even though でにもかかわらず。"],
      ["私は何を注文すればいいか決められません。", "I can't decide what to order.", 3, "what to + 動詞です。"],
      ["この服は洗うと縮むかもしれません。", "These clothes may shrink when washed.", 3, "may + 動詞原形で可能性。"],
      ["私が言いたかったのはそういうことではありません。", "That's not what I meant.", 3, "what I meant で私が意味したこと。"]
    ]
  },
  {
    id: "work",
    name: "仕事・学習",
    items: [
      ["会議は10時に始まります。", "The meeting starts at ten.", 1, "予定表の時刻は現在形でも自然です。"],
      ["この資料を確認してください。", "Please check this document.", 1, "Please + 動詞で依頼です。"],
      ["私は今日少し忙しいです。", "I am a little busy today.", 1, "a little busy で少し忙しい。"],
      ["メールを送りました。", "I sent the email.", 1, "send の過去形は sent。"],
      ["質問があります。", "I have a question.", 1, "シンプルに have a question。"],
      ["画面を共有します。", "I'll share my screen.", 1, "I'll + 動詞で今からすること。"],
      ["もう一度説明できますか。", "Could you explain it again?", 1, "Could you ...? は丁寧です。"],
      ["今日はここまでにしましょう。", "Let's stop here for today.", 1, "Let's ... で提案です。"],
      ["締め切りまでに終わらせる必要があります。", "I need to finish it by the deadline.", 2, "by は期限までに。"],
      ["この問題を一緒に解決しましょう。", "Let's solve this problem together.", 2, "solve a problem です。"],
      ["彼に進捗を共有してもらえますか。", "Could you ask him to share the progress?", 2, "ask 人 to ... の形です。"],
      ["この部分をもう少し詳しく見てみます。", "I'll take a closer look at this part.", 2, "take a closer look at ...。"],
      ["仕様を確認してから返事します。", "I'll reply after I check the requirements.", 2, "after + 主語 + 動詞です。"],
      ["この案は試す価値があります。", "This idea is worth trying.", 2, "be worth + ing です。"],
      ["先に優先順位を決めましょう。", "Let's decide the priorities first.", 2, "priority の複数形は priorities。"],
      ["それは私の理解と少し違います。", "That is a little different from my understanding.", 2, "different from ... です。"],
      ["仕様が変わったので、計画を調整する必要があります。", "Because the requirements changed, we need to adjust the plan.", 3, "because で理由を言えます。"],
      ["この機能がなぜ動かないのか調べています。", "I am looking into why this feature doesn't work.", 3, "look into は調べる。"],
      ["確認が終わり次第、結果を送ります。", "I will send you the results as soon as I finish checking.", 3, "as soon as + 主語 + 動詞。"],
      ["もう少し文脈があれば、より正確に答えられます。", "With a little more context, I can answer more accurately.", 3, "With ... で条件を短く置けます。"],
      ["この変更が他の部分に影響しないか確認します。", "I'll check whether this change affects other parts.", 3, "whether + 文でかどうか。"],
      ["最初に想定していたより時間がかかっています。", "It is taking longer than I initially expected.", 3, "longer than I expected です。"],
      ["問題を再現できる手順を教えてください。", "Please tell me the steps to reproduce the issue.", 3, "steps to reproduce は再現手順。"],
      ["結論から言うと、この方針で進めるのがよさそうです。", "In short, it seems best to move forward with this approach.", 3, "In short で結論を前に出せます。"]
    ]
  },
  {
    id: "travel",
    name: "旅行・外出",
    items: [
      ["この電車は新宿に行きますか。", "Does this train go to Shinjuku?", 1, "Does this train go to ...?"],
      ["水を一杯いただけますか。", "Could I have a glass of water?", 1, "Could I have ...? は丁寧な注文。"],
      ["私は道に迷いました。", "I'm lost.", 1, "短く I'm lost. で十分です。"],
      ["いくらですか。", "How much is it?", 1, "値段は How much?"],
      ["トイレはどこですか。", "Where is the restroom?", 1, "場所は Where is ...?"],
      ["ここで降ります。", "I get off here.", 1, "get off で降りる。"],
      ["予約があります。", "I have a reservation.", 1, "ホテルや店で使えます。"],
      ["メニューを見せてください。", "Please show me the menu.", 1, "show me ... の形です。"],
      ["この近くに薬局はありますか。", "Is there a pharmacy near here?", 2, "Is there ... near here?"],
      ["予約を変更したいです。", "I'd like to change my reservation.", 2, "I'd like to ... は丁寧な希望。"],
      ["ここで写真を撮ってもいいですか。", "May I take photos here?", 2, "許可を求める May I ...?"],
      ["領収書をいただけますか。", "Could I have a receipt?", 2, "receipt は領収書。"],
      ["辛くしないでください。", "Please don't make it spicy.", 2, "don't make it ... です。"],
      ["この住所までお願いします。", "Please take me to this address.", 2, "タクシーで使えます。"],
      ["チェックインは何時からですか。", "What time does check-in start?", 2, "What time does ... start?"],
      ["席を変えてもらえますか。", "Could you change my seat?", 2, "Could you ...? で丁寧な依頼。"],
      ["空港まで一番早く行く方法は何ですか。", "What is the fastest way to get to the airport?", 3, "the fastest way to ...。"],
      ["荷物をチェックインまで預かってもらえますか。", "Could you keep my luggage until check-in?", 3, "keep my luggage until ...。"],
      ["注文したものと違うものが来ました。", "This is different from what I ordered.", 3, "what I ordered で注文したもの。"],
      ["もし席が空いたら、窓側に変えていただけますか。", "If a seat becomes available, could you move me to a window seat?", 3, "If ... could you ...?"],
      ["このチケットで乗り換えできますか。", "Can I transfer with this ticket?", 3, "transfer は乗り換える。"],
      ["アレルギーがあるので、ナッツを入れないでください。", "I have an allergy, so please don't include nuts.", 3, "include で含める。"],
      ["出発ゲートが変わったか確認したいです。", "I'd like to check whether the departure gate has changed.", 3, "whether ... has changed。"],
      ["近くで静かに休める場所を探しています。", "I'm looking for a quiet place to rest nearby.", 3, "look for a place to ...。"]
    ]
  },
  {
    id: "opinion",
    name: "意見・説明",
    items: [
      ["私はそう思います。", "I think so.", 1, "短く言えます。"],
      ["私はそうは思いません。", "I don't think so.", 1, "否定は don't think so。"],
      ["理由は簡単です。", "The reason is simple.", 1, "reason は理由。"],
      ["それはいい考えです。", "That's a good idea.", 1, "That is を短く That's。"],
      ["私は少し心配です。", "I'm a little worried.", 1, "worried は心配している。"],
      ["もっと時間が必要です。", "I need more time.", 1, "need more time。"],
      ["例を一つ挙げます。", "I'll give you an example.", 1, "give an example です。"],
      ["私の意見では、それは重要です。", "In my opinion, it is important.", 1, "In my opinion で意見を示します。"],
      ["それには二つの理由があります。", "There are two reasons for that.", 2, "There are ... reasons。"],
      ["私は別の方法を試したいです。", "I want to try another way.", 2, "another way で別の方法。"],
      ["それは状況によります。", "It depends on the situation.", 2, "depend on ... です。"],
      ["最初は難しそうに見えました。", "At first, it looked difficult.", 2, "At first で最初は。"],
      ["この方法のほうが簡単だと思います。", "I think this way is easier.", 2, "比較級 easier。"],
      ["重要なのは続けることです。", "The important thing is to keep going.", 2, "The important thing is to ...。"],
      ["私は完全には同意できません。", "I can't completely agree.", 2, "completely で完全に。"],
      ["それは誤解かもしれません。", "That might be a misunderstanding.", 2, "might be でかもしれない。"],
      ["私が言いたいのは、焦る必要はないということです。", "What I mean is that we don't need to rush.", 3, "What I mean is that ...。"],
      ["別の見方をすると、それは良い機会です。", "From another point of view, it is a good opportunity.", 3, "From another point of view。"],
      ["すべてを一度に完璧にする必要はありません。", "We don't need to make everything perfect at once.", 3, "at once で一度に。"],
      ["大切なのは、間違いから学ぶことです。", "What matters is learning from mistakes.", 3, "What matters is ...。"],
      ["それが本当なら、計画を変えるべきです。", "If that is true, we should change the plan.", 3, "If that is true ...。"],
      ["短期的には大変ですが、長期的には役に立ちます。", "It is hard in the short term, but it helps in the long term.", 3, "short term / long term。"],
      ["私はその説明が少し曖昧だと感じました。", "I felt that explanation was a little vague.", 3, "vague は曖昧な。"],
      ["結局のところ、誰にとって役立つかを考えるべきです。", "In the end, we should think about who it helps.", 3, "who it helps は誰の役に立つか。"]
    ]
  },
  {
    id: "feelings",
    name: "感情・人間関係",
    items: [
      ["会えてうれしいです。", "I'm happy to see you.", 1, "be happy to ... です。"],
      ["心配しないでください。", "Don't worry.", 1, "短く Don't worry.。"],
      ["本当にありがとう。", "Thank you so much.", 1, "強めの感謝です。"],
      ["ごめんなさい、遅れました。", "I'm sorry I'm late.", 1, "I'm sorry + 文。"],
      ["彼は少し緊張しています。", "He is a little nervous.", 1, "nervous は緊張している。"],
      ["私はあなたを信じています。", "I believe you.", 1, "believe 人 です。"],
      ["それを聞いて安心しました。", "I'm relieved to hear that.", 1, "be relieved to ...。"],
      ["彼女は楽しそうです。", "She looks happy.", 1, "look + 形容詞。"],
      ["あなたが手伝ってくれて助かりました。", "It helped that you supported me.", 2, "It helped that ...。"],
      ["彼に正直に話したほうがいいです。", "You should be honest with him.", 2, "be honest with 人。"],
      ["私は彼女を傷つけるつもりはありませんでした。", "I didn't mean to hurt her.", 2, "didn't mean to ... でつもりはなかった。"],
      ["彼は私に怒っているようです。", "It seems that he is angry with me.", 2, "It seems that ...。"],
      ["困ったときは私に連絡してください。", "Please contact me when you need help.", 2, "when you need help。"],
      ["あなたが無事でよかったです。", "I'm glad you are safe.", 2, "I'm glad + 文。"],
      ["彼女は私を励ましてくれました。", "She encouraged me.", 2, "encourage は励ます。"],
      ["私は自分に少し厳しすぎました。", "I was a little too hard on myself.", 2, "be hard on oneself。"],
      ["彼がそんなことを言うとは思いませんでした。", "I didn't expect him to say that.", 3, "expect 人 to ...。"],
      ["あなたがそう感じるのは自然なことです。", "It is natural for you to feel that way.", 3, "It is natural for 人 to ...。"],
      ["彼女に誤解されたくありません。", "I don't want her to misunderstand me.", 3, "want 人 to ... の否定。"],
      ["私は彼にもう一度チャンスをあげることにしました。", "I decided to give him another chance.", 3, "decide to ...。"],
      ["その言葉で少し気が楽になりました。", "Those words made me feel a little better.", 3, "make 人 feel ...。"],
      ["何があっても、私はあなたの味方です。", "No matter what happens, I'm on your side.", 3, "No matter what happens。"],
      ["彼女が本当はどう感じているのか知りたいです。", "I want to know how she really feels.", 3, "how she feels は間接疑問。"],
      ["自分の気持ちを言葉にするのは簡単ではありません。", "It is not easy to put my feelings into words.", 3, "put feelings into words。"]
    ]
  }
].map(deck => ({
  ...deck,
  items: deck.items.map(([ja, en, level, hint], index) => ({
    ja,
    en,
    level,
    hint,
    key: `${deck.id}-${index}`
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
