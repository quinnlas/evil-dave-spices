

/*
  {
    guess: { red, yellow, orange, brown }, // undefined is OK
    numCorrect: 0
  }
*/
const responses = [
  {
    guess: {
      red: 1, yellow: 1, orange: 1, brown: 1
    },
    numCorrect: 2
  },
  {
    guess: { red: 1, yellow: 0, orange: 2, brown: 2 },
    numCorrect: 2
  },
  {
    guess: { red: 3, yellow: 2, orange: 3, brown: 2 },
    numCorrect: 0
  },
  {
    guess: { red: 0, yellow: 0, orange: 0, brown: 1 },
    numCorrect: 1
  }
]

const colors = ['red', 'yellow', 'orange', 'brown']
const combinations = []

function generateCombinations() {
  for (let red = 1; red <= 3; red++) {
    for (let yellow = 1; yellow <= 3; yellow++) {
      for (let orange = 1; orange <= 3; orange++) {
        for (let brown = 1; brown <= 3; brown++) {
          const newCombo = { red, yellow, orange, brown }
          
          // determine if this is valid given the info we already have
          const isValid = responses.every(response => {
            const numMatching = colors.filter(c => response.guess[c] === newCombo[c]).length
            return numMatching === response.numCorrect
          })

          if (isValid) combinations.push(newCombo)
        }
      }
    }
  }
}
generateCombinations()

const possibleGuesses = []

// similar to combinations, but we can also guess 0 of any color
function generatePossibleGuesses() {
  for (let red = 0; red <= 3; red++) {
    for (let yellow = 0; yellow <= 3; yellow++) {
      for (let orange = 0; orange <= 3; orange++) {
        for (let brown = 0; brown <= 3; brown++) {
          possibleGuesses.push({ red, yellow, orange, brown })
        }
      }
    }
  }
}
generatePossibleGuesses()

function determineBestGuess() {
  let bestGuesses
  let bestWorstResponseScore = Infinity
  for (let guess of possibleGuesses) {
    // console.log('Guessing', guess)

    let worstResponseScore = 0
    for (let possibleResponse of [0,1,2,3,4]) {
      // console.log('Got response', possibleResponse)
      // determine the score of the response (how many combinations are left)
      // note that we already eliminated combinations for the real responses
      const responseScore = combinations.filter(combo => {
        const numCorrect = colors.filter(color => guess[color] === combo[color]).length
        return numCorrect === possibleResponse
      }).length

      if (responseScore > worstResponseScore) worstResponseScore = responseScore

      // console.log(`Left with ${responseScore} possibilities`)
    }
    
    if (worstResponseScore < bestWorstResponseScore) {
      bestGuesses = [guess]
      bestWorstResponseScore = worstResponseScore
    } else if (worstResponseScore === bestWorstResponseScore) {
      bestGuesses.push(guess)
    }
  }
  
  console.log('Best guesses are:', bestGuesses)
}

determineBestGuess()

console.log(`${combinations.length} combinations left:`, combinations)
