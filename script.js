const { useState, useEffect } = React;

// Icon components using emojis (replacing lucide-react icons)
const StarIcon = () => React.createElement('span', { className: 'inline-block text-yellow-500' }, '⭐');
const TrophyIcon = () => React.createElement('span', { className: 'inline-block' }, '🏆');
const BookIcon = () => React.createElement('span', { className: 'inline-block' }, '📚');
const HomeIcon = () => React.createElement('span', { className: 'inline-block' }, '🏠');
const PlayIcon = () => React.createElement('span', { className: 'inline-block' }, '▶️');
const AwardIcon = () => React.createElement('span', { className: 'inline-block' }, '🏅');
const HeartIcon = () => React.createElement('span', { className: 'inline-block text-red-500' }, '❤️');

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
    ],
    4: [
      { question: "Which animal has three hearts?", options: ["Octopus", "Elephant", "Whale", "Shark"], correct: 0, image: "🐙" },
      { question: "How many teeth does a shark have?", options: ["32", "100", "300+", "50"], correct: 2, image: "🦈" },
      { question: "Which animal can live without water the longest?", options: ["Camel", "Kangaroo rat", "Penguin", "Polar bear"], correct: 1, image: "🐭" },
      { question: "What is a baby kangaroo called?", options: ["Cub", "Pup", "Joey", "Kit"], correct: 2, image: "🦘" },
      { question: "Which animal has the strongest bite?", options: ["Lion", "Crocodile", "Shark", "Hippo"], correct: 1, image: "🐊" },
      { question: "How many bones do sharks have?", options: ["200", "100", "50", "0"], correct: 3, image: "🦈" },
      { question: "Which animal can't stick out its tongue?", options: ["Dog", "Cat", "Crocodile", "Lizard"], correct: 2, image: "🐊" },
      { question: "What color is a polar bear's skin?", options: ["White", "Pink", "Black", "Brown"], correct: 2, image: "🐻‍❄️" },
      { question: "Which animal has rectangular pupils?", options: ["Cat", "Goat", "Dog", "Horse"], correct: 1, image: "🐐" },
      { question: "How many species of penguins exist?", options: ["10", "17", "25", "30"], correct: 1, image: "🐧" }
    ],
    5: [
      { question: "Which animal has blue blood?", options: ["Octopus", "Fish", "Whale", "Dolphin"], correct: 0, image: "🐙" },
      { question: "How long is an elephant pregnant?", options: ["9 months", "12 months", "18 months", "22 months"], correct: 3, image: "🐘" },
      { question: "Which animal sleeps the most?", options: ["Cat", "Sloth", "Koala", "Brown bat"], correct: 3, image: "🦇" },
      { question: "What percentage of their lives do cats spend sleeping?", options: ["50%", "60%", "70%", "80%"], correct: 2, image: "🐱" },
      { question: "Which animal has the most powerful jaw muscles?", options: ["Lion", "Crocodile", "Hyena", "Shark"], correct: 2, image: "🦈" },
      { question: "How many chambers does a fish heart have?", options: ["1", "2", "3", "4"], correct: 1, image: "🐠" },
      { question: "Which animal can hold its breath the longest?", options: ["Whale", "Dolphin", "Cuvier's beaked whale", "Seal"], correct: 2, image: "🐋" },
      { question: "What is the largest living bird?", options: ["Eagle", "Ostrich", "Albatross", "Condor"], correct: 1, image: "🐦" },
      { question: "Which animal has the best memory?", options: ["Elephant", "Dolphin", "Chimpanzee", "Crow"], correct: 0, image: "🐘" },
      { question: "How many eyes does a bee have?", options: ["2", "3", "4", "5"], correct: 3, image: "🐝" }
    ]
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
    { id: 10, emoji: "🦘", name: "Jumping Kangaroo", cost: 22 },
    { id: 11, emoji: "🐙", name: "Smart Octopus", cost: 30 },
    { id: 12, emoji: "🦈", name: "Cool Shark", cost: 28 },
    { id: 13, emoji: "🐺", name: "Wild Wolf", cost: 25 },
    { id: 14, emoji: "🦅", name: "Majestic Eagle", cost: 35 },
    { id: 15, emoji: "🐯", name: "Fierce Tiger", cost: 40 }
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
    return quizData[Math.min(currentLevel, 5)] || quizData[5]; // Use level 5 for higher levels
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
    return React.createElement('div', {
      className: 'min-h-screen bg-gradient-to-b from-blue-400 to-green-400 flex flex-col items-center justify-center p-4'
    }, 
      React.createElement('div', {
        className: 'bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full text-center'
      },
        React.createElement('div', { className: 'text-6xl mb-4' }, '🦁🐘🦒'),
        React.createElement('h1', { className: 'text-3xl font-bold text-purple-600 mb-4' }, 'Animal Facts Quiz!'),
        React.createElement('p', { className: 'text-gray-600 mb-6' }, 'Learn amazing facts about animals while having fun!'),
        
        React.createElement('div', { className: 'mb-6' },
          React.createElement('label', { className: 'block text-left text-purple-600 font-semibold mb-2' }, 'What\'s your name?'),
          React.createElement('input', {
            type: 'text',
            value: playerName,
            onChange: (e) => setPlayerName(e.target.value),
            className: 'w-full p-3 border-2 border-purple-300 rounded-xl text-lg focus:border-purple-500 focus:outline-none',
            placeholder: 'Enter your name here'
          })
        ),
        
        React.createElement('button', {
          onClick: () => playerName.trim() && setCurrentScreen('menu'),
          disabled: !playerName.trim(),
          className: 'w-full bg-purple-500 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors'
        }, 'Let\'s Start! 🚀')
      )
    );
  }

  // Main Menu Screen
  if (currentScreen === 'menu') {
    return React.createElement('div', {
      className: 'min-h-screen bg-gradient-to-b from-purple-400 to-pink-400 p-4'
    },
      React.createElement('div', { className: 'max-w-md mx-auto' },
        React.createElement('div', { className: 'bg-white rounded-3xl p-6 shadow-2xl mb-4' },
          React.createElement('div', { className: 'text-center mb-4' },
            React.createElement('h2', { className: 'text-2xl font-bold text-purple-600' }, `Hi ${playerName}! 👋`),
            React.createElement('div', { className: 'flex justify-center items-center mt-2' },
              React.createElement(StarIcon),
              React.createElement('span', { className: 'text-xl font-bold text-yellow-600 ml-2' }, `${totalPoints} points`)
            )
          )
        ),

        React.createElement('div', { className: 'space-y-4' },
          React.createElement('button', {
            onClick: () => setCurrentScreen('game'),
            className: 'w-full bg-green-500 text-white p-4 rounded-2xl text-xl font-bold hover:bg-green-600 transition-colors flex items-center justify-center'
          },
            React.createElement(PlayIcon),
            React.createElement('span', { className: 'ml-3' }, `Play Quiz - Level ${currentLevel}`)
          ),

          React.createElement('button', {
            onClick: () => setCurrentScreen('shop'),
            className: 'w-full bg-blue-500 text-white p-4 rounded-2xl text-xl font-bold hover:bg-blue-600 transition-colors flex items-center justify-center'
          },
            React.createElement(AwardIcon),
            React.createElement('span', { className: 'ml-3' }, 'Sticker Shop')
          ),

          React.createElement('button', {
            onClick: () => setCurrentScreen('stickers'),
            className: 'w-full bg-pink-500 text-white p-4 rounded-2xl text-xl font-bold hover:bg-pink-600 transition-colors flex items-center justify-center'
          },
            React.createElement(BookIcon),
            React.createElement('span', { className: 'ml-3' }, `My Sticker Book (${stickerBook.length})`)
          )
        )
      )
    );
  }

  // Game Screen
  if (currentScreen === 'game') {
    const questions = getCurrentQuestions();
    const currentQ = questions[currentQuestion];

    if (showResult) {
      const passed = score >= 7;
      return React.createElement('div', {
        className: 'min-h-screen bg-gradient-to-b from-yellow-400 to-orange-400 flex flex-col items-center justify-center p-4'
      },
        React.createElement('div', { className: 'bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full text-center' },
          React.createElement('div', { className: 'text-6xl mb-4' }, passed ? "🎉" : "😊"),
          React.createElement('h2', { className: 'text-3xl font-bold mb-4 text-purple-600' }, 
            passed ? "Awesome Job!" : "Good Try!"
          ),
          React.createElement('p', { className: 'text-xl mb-4' }, `You got ${score} out of 10 questions right!`),
          React.createElement('p', { className: 'text-lg mb-6 text-green-600 font-semibold' }, 
            `You earned ${currentLevel * 2 * score} points! ⭐`
          ),
          
          React.createElement('div', { className: 'space-y-3' },
            passed ? (
              React.createElement('button', {
                onClick: nextLevel,
                className: 'w-full bg-green-500 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-green-600 transition-colors'
              }, 'Next Level! 🚀')
            ) : (
              React.createElement('button', {
                onClick: restartLevel,
                className: 'w-full bg-blue-500 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-blue-600 transition-colors'
              }, 'Try Again! 💪')
            ),
            
            React.createElement('button', {
              onClick: () => setCurrentScreen('menu'),
              className: 'w-full bg-purple-500 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-purple-600 transition-colors'
            }, 'Back to Menu')
          )
        )
      );
    }

    return React.createElement('div', {
      className: 'min-h-screen bg-gradient-to-b from-green-400 to-blue-400 p-4'
    },
      React.createElement('div', { className: 'max-w-md mx-auto' },
        // Header
        React.createElement('div', { className: 'bg-white rounded-2xl p-4 mb-4 shadow-lg' },
          React.createElement('div', { className: 'flex justify-between items-center' },
            React.createElement('span', { className: 'text-purple-600 font-bold' }, `Level ${currentLevel}`),
            React.createElement('span', { className: 'text-purple-600 font-bold' }, `Question ${currentQuestion + 1}/10`)
          ),
          React.createElement('div', { className: 'w-full bg-gray-200 rounded-full h-3 mt-2' },
            React.createElement('div', {
              className: 'bg-purple-500 h-3 rounded-full transition-all duration-300',
              style: { width: `${((currentQuestion + 1) / 10) * 100}%` }
            })
          )
        ),

        // Question
        React.createElement('div', { className: 'bg-white rounded-3xl p-6 shadow-2xl' },
          React.createElement('div', { className: 'text-center mb-6' },
            React.createElement('div', { className: 'text-6xl mb-4' }, currentQ.image),
            React.createElement('h3', { className: 'text-xl font-bold text-purple-600' }, currentQ.question)
          ),

          React.createElement('div', { className: 'space-y-3' },
            ...currentQ.options.map((option, index) =>
              React.createElement('button', {
                key: index,
                onClick: () => handleAnswerSelect(index),
                disabled: selectedAnswer !== null,
                className: `w-full p-4 rounded-xl text-lg font-semibold transition-all ${
                  selectedAnswer === null
                    ? 'bg-purple-100 hover:bg-purple-200 text-purple-700'
                    : selectedAnswer === index
                      ? index === currentQ.correct
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : index === currentQ.correct
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                }`
              }, option)
            )
          )
        )
      )
    );
  }

  // Shop Screen
  if (currentScreen === 'shop') {
    return React.createElement('div', {
      className: 'min-h-screen bg-gradient-to-b from-pink-400 to-purple-400 p-4'
    },
      React.createElement('div', { className: 'max-w-md mx-auto' },
        React.createElement('div', { className: 'bg-white rounded-2xl p-4 mb-4 shadow-lg' },
          React.createElement('div', { className: 'flex justify-between items-center' },
            React.createElement('h2', { className: 'text-xl font-bold text-purple-600' }, 'Sticker Shop'),
            React.createElement('div', { className: 'flex items-center' },
              React.createElement(StarIcon),
              React.createElement('span', { className: 'font-bold text-yellow-600 ml-1' }, totalPoints)
            )
          )
        ),

        React.createElement('div', { className: 'grid grid-cols-2 gap-4 mb-4' },
          ...availableStickers.map(sticker =>
            React.createElement('div', { key: sticker.id, className: 'bg-white rounded-2xl p-4 shadow-lg' },
              React.createElement('div', { className: 'text-center' },
                React.createElement('div', { className: 'text-4xl mb-2' }, sticker.emoji),
                React.createElement('h3', { className: 'font-semibold text-purple-600 mb-2' }, sticker.name),
                React.createElement('p', { className: 'text-sm text-gray-600 mb-3' }, `${sticker.cost} points`),
                React.createElement('button', {
                  onClick: () => buySticker(sticker),
                  disabled: totalPoints < sticker.cost || stickerBook.some(s => s.id === sticker.id),
                  className: `w-full py-2 px-3 rounded-lg font-semibold text-sm ${
                    stickerBook.some(s => s.id === sticker.id)
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : totalPoints >= sticker.cost
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`
                }, stickerBook.some(s => s.id === sticker.id) ? 'Owned' : 'Buy')
              )
            )
          )
        ),

        React.createElement('button', {
          onClick: () => setCurrentScreen('menu'),
          className: 'w-full bg-purple-500 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-purple-600 transition-colors'
        }, 'Back to Menu')
      )
    );
  }

  // Sticker Book Screen
  if (currentScreen === 'stickers') {
    return React.createElement('div', {
      className: 'min-h-screen bg-gradient-to-b from-blue-400 to-green-400 p-4'
    },
      React.createElement('div', { className: 'max-w-md mx-auto' },
        React.createElement('div', { className: 'bg-white rounded-2xl p-4 mb-4 shadow-lg' },
          React.createElement('h2', { className: 'text-xl font-bold text-purple-600 text-center' }, 
            `${playerName}'s Sticker Book 📚`
          )
        ),

        stickerBook.length === 0 ? (
          React.createElement('div', { className: 'bg-white rounded-2xl p-8 shadow-lg text-center' },
            React.createElement('div', { className: 'text-4xl mb-4' }, '📖'),
            React.createElement('p', { className: 'text-gray-600 mb-4' }, 'Your sticker book is empty!'),
            React.createElement('p', { className: 'text-sm text-gray-500' }, 'Play quizzes to earn points and buy stickers!')
          )
        ) : (
          React.createElement('div', { className: 'bg-white rounded-2xl p-4 mb-4 shadow-lg' },
            React.createElement('div', { className: 'grid grid-cols-3 gap-4' },
              ...stickerBook.map((sticker, index) =>
                React.createElement('div', { key: index, className: 'text-center p-3 bg-yellow-100 rounded-xl' },
                  React.createElement('div', { className: 'text-3xl mb-1' }, sticker.emoji),
                  React.createElement('p', { className: 'text-xs font-semibold text-purple-600' }, sticker.name)
                )
              )
            )
          )
        ),

        React.createElement('button', {
          onClick: () => setCurrentScreen('menu'),
          className: 'w-full bg-purple-500 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-purple-600 transition-colors'
        }, 'Back to Menu')
      )
    );
  }

  return null;
};

// Render the app
ReactDOM.render(React.createElement(AnimalQuizApp), document.getElementById('root'));
