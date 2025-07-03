const AnimalQuizApp = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [playerName, setPlayerName] = useState('');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(100);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [stickers, setStickers] = useState([]);
  const [stickerBook, setStickerBook] = useState([]);

  // Animal quiz data - 15 levels with increasing difficulty
  const quizData = {
    1: [
      { question: "What sound does a cow make?", options: ["Meow", "Moo", "Bark", "Roar"], correct: 1, image: "🐄" },
      { question: "Which animal is the king of the jungle?", options: ["Elephant", "Tiger", "Lion", "Bear"], correct: 2, image: "🦁" },
      { question: "What do cats like to drink?", options: ["Coffee", "Milk", "Juice", "Soda"], correct: 1, image: "🐱" },
      { question: "Which animal hops?", options: ["Dog", "Rabbit", "Fish", "Bird"], correct: 1, image: "🐰" },
      { question: "What color is a zebra?", options: ["Blue", "Red", "Black and white", "Green"], correct: 2, image: "🦓" },
      { question: "Which animal lives in water?", options: ["Cat", "Dog", "Fish", "Rabbit"], correct: 2, image: "🐠" },
      { question: "What do bees make?", options: ["Milk", "Honey", "Eggs", "Butter"], correct: 1, image: "🐝" },
      { question: "Which animal is very tall?", options: ["Mouse", "Ant", "Giraffe", "Frog"], correct: 2, image: "🦒" },
      { question: "What do birds use to fly?", options: ["Legs", "Wings", "Tail", "Nose"], correct: 1, image: "🐦" },
      { question: "Which animal gives us wool?", options: ["Cow", "Pig", "Sheep", "Horse"], correct: 2, image: "🐑" }
    ],
    2: [
      { question: "How many legs does a spider have?", options: ["6", "8", "10", "4"], correct: 1, image: "🕷️" },
      { question: "Which animal changes colors?", options: ["Dog", "Chameleon", "Cat", "Horse"], correct: 1, image: "🦎" },
      { question: "What do pandas eat?", options: ["Meat", "Bamboo", "Fish", "Berries"], correct: 1, image: "🐼" },
      { question: "Which bird cannot fly?", options: ["Eagle", "Penguin", "Sparrow", "Owl"], correct: 1, image: "🐧" },
      { question: "How many humps does a camel have?", options: ["1 or 2", "3", "4", "5"], correct: 0, image: "🐪" },
      { question: "Which animal is known for being slow?", options: ["Cheetah", "Rabbit", "Turtle", "Horse"], correct: 2, image: "🐢" },
      { question: "What do elephants use to pick things up?", options: ["Trunk", "Tail", "Ears", "Feet"], correct: 0, image: "🐘" },
      { question: "Which animal sleeps upside down?", options: ["Cat", "Bat", "Dog", "Fish"], correct: 1, image: "🦇" },
      { question: "What type of animal is a dolphin?", options: ["Fish", "Mammal", "Bird", "Reptile"], correct: 1, image: "🐬" },
      { question: "Which animal has a pouch?", options: ["Lion", "Kangaroo", "Tiger", "Bear"], correct: 1, image: "🦘" }
    ],
    3: [
      { question: "How fast can a cheetah run?", options: ["30 mph", "50 mph", "70 mph", "90 mph"], correct: 2, image: "🐆" },
      { question: "Which animal has the longest neck?", options: ["Horse", "Giraffe", "Elephant", "Camel"], correct: 1, image: "🦒" },
      { question: "What do koalas mainly eat?", options: ["Bamboo", "Eucalyptus", "Grass", "Fruit"], correct: 1, image: "🐨" },
      { question: "Which animal can regenerate its tail?", options: ["Cat", "Dog", "Lizard", "Bird"], correct: 2, image: "🦎" },
      { question: "How long do elephants live?", options: ["20 years", "40 years", "60 years", "80 years"], correct: 2, image: "🐘" },
      { question: "Which animal has the best eyesight?", options: ["Human", "Eagle", "Cat", "Dog"], correct: 1, image: "🦅" },
      { question: "What is a group of lions called?", options: ["Pack", "Herd", "Pride", "Flock"], correct: 2, image: "🦁" },
      { question: "Which animal never forgets?", options: ["Mouse", "Elephant", "Cat", "Dog"], correct: 1, image: "🐘" },
      { question: "How many chambers does a cow's stomach have?", options: ["1", "2", "3", "4"], correct: 3, image: "🐄" },
      { question: "Which animal can sleep for 3 years?", options: ["Bear", "Snail", "Turtle", "Frog"], correct: 1, image: "🐌" }
    ]
    // Additional levels would continue with increasing complexity...
  };

  // Available stickers that can be purchased
  const availableStickers = [
    { id: 1, emoji: "🐶", name: "Happy Dog", cost: 10 },
    { id: 2, emoji: "🐱", name: "Cute Cat", cost: 10 },
    { id: 3, emoji: "🦁", name: "Brave Lion", cost: 15 },
    { id: 4, emoji: "🐘", name: "Wise Elephant", cost: 20 },
    { id: 5, emoji: "🦒", name: "Tall Giraffe", cost: 15 },
    { id: 6, emoji: "🐼", name: "Cuddly Panda", cost: 25 },
    { id: 7, emoji: "🦋", name: "Pretty Butterfly", cost: 12 },
    { id: 8, emoji: "🐠", name: "Colorful Fish", cost: 8 },
    { id: 9, emoji: "🦜", name: "Talking Parrot", cost: 18 },
    { id: 10, emoji: "🦘", name: "Jumping Kangaroo", cost: 22 }
  ];

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === getCurrentQuestions()[currentQuestion].correct;
    
    setTimeout(() => {
      if (isCorrect) {
        setScore(score + 1);
        setTotalPoints(totalPoints + (currentLevel * 2)); // More points for higher levels
      }
      
      if (currentQuestion < 9) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const getCurrentQuestions = () => {
    return quizData[Math.min(currentLevel, 3)] || quizData[3]; // Use level 3 for higher levels as demo
  };

  const buySticker = (sticker) => {
    if (totalPoints >= sticker.cost) {
      setTotalPoints(totalPoints - sticker.cost);
      setStickerBook([...stickerBook, sticker]);
    }
  };

  const nextLevel = () => {
    setCurrentLevel(currentLevel + 1);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setCurrentScreen('game');
  };

  const restartLevel = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setCurrentScreen('game');
  };

  // Welcome Screen
  if (currentScreen === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-400 to-green-400 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full text-center">
          <div className="text-6xl mb-4">🦁🐘🦒</div>
          <h1 className="text-3xl font-bold text-purple-600 mb-4">Animal Facts Quiz!</h1>
          <p className="text-gray-600 mb-6">Learn amazing facts about animals while having fun!</p>
          
          <div className="mb-6">
            <label className="block text-left text-purple-600 font-semibold mb-2">What's your name?</label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full p-3 border-2 border-purple-300 rounded-xl text-lg focus:border-purple-500 focus:outline-none"
              placeholder="Enter your name here"
            />
          </div>
          
          <button
            onClick={() => playerName.trim() && setCurrentScreen('menu')}
            disabled={!playerName.trim()}
            className="w-full bg-purple-500 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Let's Start! 🚀
          </button>
        </div>
      </div>
    );
  }

  // Main Menu Screen
  if (currentScreen === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-400 to-pink-400 p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-3xl p-6 shadow-2xl mb-4">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-purple-600">Hi {playerName}! 👋</h2>
              <div className="flex justify-center items-center mt-2">
                <Star className="text-yellow-500 mr-2" size={24} />
                <span className="text-xl font-bold text-yellow-600">{totalPoints} points</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setCurrentScreen('game')}
              className="w-full bg-green-500 text-white p-4 rounded-2xl text-xl font-bold hover:bg-green-600 transition-colors flex items-center justify-center"
            >
              <Play className="mr-3" size={24} />
              Play Quiz - Level {currentLevel}
            </button>

            <button
              onClick={() => setCurrentScreen('shop')}
              className="w-full bg-blue-500 text-white p-4 rounded-2xl text-xl font-bold hover:bg-blue-600 transition-colors flex items-center justify-center"
            >
              <Award className="mr-3" size={24} />
              Sticker Shop
            </button>

            <button
              onClick={() => setCurrentScreen('stickers')}
              className="w-full bg-pink-500 text-white p-4 rounded-2xl text-xl font-bold hover:bg-pink-600 transition-colors flex items-center justify-center"
            >
              <Book className="mr-3" size={24} />
              My Sticker Book ({stickerBook.length})
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Game Screen
  if (currentScreen === 'game') {
    const questions = getCurrentQuestions();
    const currentQ = questions[currentQuestion];

    if (showResult) {
      const passed = score >= 7;
      return (
        <div className="min-h-screen bg-gradient-to-b from-yellow-400 to-orange-400 flex flex-col items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full text-center">
            <div className="text-6xl mb-4">{passed ? "🎉" : "😊"}</div>
            <h2 className="text-3xl font-bold mb-4 text-purple-600">
              {passed ? "Awesome Job!" : "Good Try!"}
            </h2>
            <p className="text-xl mb-4">You got {score} out of 10 questions right!</p>
            <p className="text-lg mb-6 text-green-600 font-semibold">
              You earned {currentLevel * 2 * score} points! ⭐
            </p>
            
            <div className="space-y-3">
              {passed ? (
                <button
                  onClick={nextLevel}
                  className="w-full bg-green-500 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  Next Level! 🚀
                </button>
              ) : (
                <button
                  onClick={restartLevel}
                  className="w-full bg-blue-500 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-blue-600 transition-colors"
                >
                  Try Again! 💪
                </button>
              )}
              
              <button
                onClick={() => setCurrentScreen('menu')}
                className="w-full bg-purple-500 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-purple-600 transition-colors"
              >
                Back to Menu
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-b from-green-400 to-blue-400 p-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl p-4 mb-4 shadow-lg">
            <div className="flex justify-between items-center">
              <span className="text-purple-600 font-bold">Level {currentLevel}</span>
              <span className="text-purple-600 font-bold">Question {currentQuestion + 1}/10</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
              <div 
                className="bg-purple-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / 10) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="bg-white rounded-3xl p-6 shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{currentQ.image}</div>
              <h3 className="text-xl font-bold text-purple-600">{currentQ.question}</h3>
            </div>

            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 rounded-xl text-lg font-semibold transition-all ${
                    selectedAnswer === null
                      ? 'bg-purple-100 hover:bg-purple-200 text-purple-700'
                      : selectedAnswer === index
                        ? index === currentQ.correct
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        : index === currentQ.correct
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Shop Screen
  if (currentScreen === 'shop') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-400 to-purple-400 p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl p-4 mb-4 shadow-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-purple-600">Sticker Shop</h2>
              <div className="flex items-center">
                <Star className="text-yellow-500 mr-1" size={20} />
                <span className="font-bold text-yellow-600">{totalPoints}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {availableStickers.map(sticker => (
              <div key={sticker.id} className="bg-white rounded-2xl p-4 shadow-lg">
                <div className="text-center">
                  <div className="text-4xl mb-2">{sticker.emoji}</div>
                  <h3 className="font-semibold text-purple-600 mb-2">{sticker.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{sticker.cost} points</p>
                  <button
                    onClick={() => buySticker(sticker)}
                    disabled={totalPoints < sticker.cost || stickerBook.some(s => s.id === sticker.id)}
                    className={`w-full py-2 px-3 rounded-lg font-semibold text-sm ${
                      stickerBook.some(s => s.id === sticker.id)
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : totalPoints >= sticker.cost
                          ? 'bg-green-500 text-white hover:bg-green-600'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {stickerBook.some(s => s.id === sticker.id) ? 'Owned' : 'Buy'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setCurrentScreen('menu')}
            className="w-full bg-purple-500 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-purple-600 transition-colors"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  // Sticker Book Screen
  if (currentScreen === 'stickers') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-400 to-green-400 p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl p-4 mb-4 shadow-lg">
            <h2 className="text-xl font-bold text-purple-600 text-center">
              {playerName}'s Sticker Book 📚
            </h2>
          </div>

          {stickerBook.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="text-4xl mb-4">📖</div>
              <p className="text-gray-600 mb-4">Your sticker book is empty!</p>
              <p className="text-sm text-gray-500">Play quizzes to earn points and buy stickers!</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-4 mb-4 shadow-lg">
              <div className="grid grid-cols-3 gap-4">
                {stickerBook.map((sticker, index) => (
                  <div key={index} className="text-center p-3 bg-yellow-100 rounded-xl">
                    <div className="text-3xl mb-1">{sticker.emoji}</div>
                    <p className="text-xs font-semibold text-purple-600">{sticker.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => setCurrentScreen('menu')}
            className="w-full bg-purple-500 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-purple-600 transition-colors"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default AnimalQuizApp;