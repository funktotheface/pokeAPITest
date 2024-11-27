const wordElement = document.getElementById('word');
const alphabetContainer = document.getElementById('alphabet-container');
const wrongLettersElement = document.getElementById('wrong-letters-list');
const guessesLeftElement = document.getElementById('guesses-left');
const pokemonImage = document.getElementById('pokemon-image');
const messageElement = document.getElementById('message');
const playAgainButton = document.getElementById('play-again');
const randomId = Math.floor(Math.random() * 150) + 1; // First 150 Pokémon

let randomWord = '';
let randomImage = '';
let correctLetters = [];
let wrongLetters = [];
let guessesLeft = 10;

// Fetch a random Pokémon from the API
function fetchPokemon() {
  
  fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}/`)
    .then(response => response.json())
    .then(data => {
      randomWord = data.name.toLowerCase();
      randomImage = data.sprites.front_default;
      initializeGame();
    })
    .catch(error => console.error('Error fetching Pokémon:', error));
}

// Initialize the game
function initializeGame() {
  correctLetters = [];
  wrongLetters = [];
  guessesLeft = 10;
  // pokemonImage.style.display = 'none';
  messageElement.innerText = '';
  playAgainButton.style.display = 'none';
  guessesLeftElement.innerText = guessesLeft;
  wrongLettersElement.innerText = '';
  displayWord();
  createAlphabetButtons();
}

// Display the word with guessed letters
function displayWord() {
  wordElement.innerHTML = randomWord
    .split('')
    .map(letter => (correctLetters.includes(letter) ? letter : '_'))
    .join(' ');

  if (wordElement.innerText.replace(/\s/g, '') === randomWord) {
    messageElement.innerText = 'Congratulations! You guessed the Pokémon!';
    pokemonImage.src = randomImage;
    // pokemonImage.style.display = 'block';
    // Play Pokémon cry this uses the pokemoncries website and the randomId to get the cry
    const audio = new Audio(`https://pokemoncries.com/cries-old/${randomId}.mp3`);
    audio.play();
    endGame();
  }
}

// Create alphabet buttons
function createAlphabetButtons() {
  alphabetContainer.innerHTML = '';
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  alphabet.split('').forEach(letter => {
    const button = document.createElement('button');
    button.innerText = letter;
    button.classList.add('letter-button');
    button.addEventListener('click', () => handleGuess(letter, button));
    alphabetContainer.appendChild(button);
  });
}

// Handle a letter guess
function handleGuess(letter, button) {
  button.disabled = true;
  if (randomWord.includes(letter)) {
    correctLetters.push(letter);
    displayWord();
  } else {
    wrongLetters.push(letter);
    guessesLeft--;
    guessesLeftElement.innerText = guessesLeft;
    wrongLettersElement.innerText = wrongLetters.join(', ');
    if (guessesLeft === 0) {
      messageElement.innerText = `Game Over! The Pokémon was "${randomWord}".`;
      endGame();
    }
  }
}

// End the game
function endGame() {
  document.querySelectorAll('.letter-button').forEach(button => {
    button.disabled = true;
  });
  playAgainButton.style.display = 'inline';
}

// Add event listener for Play Again button
playAgainButton.addEventListener('click', () => {
  fetchPokemon();
});

// Start the game
fetchPokemon();

//                                                    ,iit1;.
//                                                  :fGGGGGGCf;.
//                                                 ;LCfffLCGG08i
//                                                ,GCfffttLGG08C:
//                                                :GLfLftttLCGGC;
//                                                ,Ltftt11ttLC11i
//                                                 1t11ii1t1fLtfi:
//                                                 ,t1i11111fCL11G1:,
//                                                  iL111t1tti;iLGGGGLt;,
//                                              ,it1fGLtt1i;:,itfCGGGG00Gf;.
//                                            :tLGftfCL1i:,::;1tLCCCGGGGGG0L,
//       .;;;;;;;;::::,,,,....               10GCttffCCffttttffLLCCCCCCCLG00Ci
//       .tCCCCGGG000000GGGGCCC1           .tLGCLfffCGGGCffLLLLLLLLLfLCLCGGGGGi
//        iCCCCCCGGG000000888880:          i0ffffff00800CfLLLLLftff1tfLtLCCLCCL.
//        ,LCCCCCGGGG00000000088t         iCGL1ittfG0000CtLfLLftf11ii1t1fLtLCG0i
//         1CCCCCCGGGGG000000008C.     .;f0GLLi;ttfC0000LtffLt1fCLLt111;iifLCGGG:
//         :LCCCCCCGGGG0000000000;    ,fCGCCffi:tfLLG000L1ttf1tLCCCCLLLLtitfttfLf:
//         .tCCCCCCGGGG0000000008f.,:itf11ii;;;:1fftfCCL11ti11tfLLLLLLCGGtLCCftttt,
//          ;CGCCGCGGGGG000000000GtfLCLfi;;;;:,,i11i1iiiitt1iiii1tfffffLCLLffLftft:
//          .tLLLLCCCGGGG000000000tii1111;::;;:,;iii;;i1tt1iiiiiii1tfffLLLLLtfffLf:
//           ...,,,::;;ii11ttfLLLCti1t11iii;:;:,;;;::;iiii;;;;:;;;:::;;11fffLfffft.
//            ..            .....,.itLLLft1i;:,.                ... .....:,,,,:::.
//                 ................,:;:,,...
