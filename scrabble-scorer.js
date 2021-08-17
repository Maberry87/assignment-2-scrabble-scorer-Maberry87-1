// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require('readline-sync');

const oldPointStructure = {
	1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
	2: ['D', 'G'],
	3: ['B', 'C', 'M', 'P'],
	4: ['F', 'H', 'V', 'W', 'Y'],
	5: ['K'],
	8: ['J', 'X'],
	10: ['Q', 'Z']
};

const vowels = ['A', 'E', 'I', 'O', 'U', 'a', 'e', 'i', 'o', 'u'];

function transform(oldPointingSystem) {
	let newStructure = {};
	for (item in oldPointingSystem) {
		for (i = 0; i < oldPointingSystem[item].length; i++) {
			let letter = oldPointingSystem[item][i].toLowerCase();
			newStructure[letter] = Number(item);
		}
	}
	return newStructure;
}

let newPointStructure = transform(oldPointStructure);
newPointStructure[' '] = 0;

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = '';

	for (let i = 0; i < word.length; i++) {
		for (const pointValue in oldPointStructure) {
			if (oldPointStructure[pointValue].includes(word[i])) {
				letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
			}
		}
	}
	return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~0123456789]/;
function initialPrompt() {
	let userWord = input.question(
		"Let's play some scrabble! \nEnter a word to score: "
	);
	while (specialChars.test(userWord)) {
		userWord = input.question(
			"Let's play some scrabble! Enter a word to score: "
		);
	}
	return userWord;
}

function simpleScore(word) {
	let points = 0;
	for (let i = 0; i < word.length; i++) {
		if (word[i] === ' ') {
			points = points + 0;
		} else {
			points = points + 1;
		}
	}
	return points;
}
console.log("***")
function vowelBonusScore(word) {
	let points = 0;
	
	for (let i = 0; i < word.length; i++) {
		if (vowels.includes(word[i])) {
			points = points + 3;
		} else if (word[i] === ' ') {
			points = points + 0;
		} else {
			points = points + 1;
		}
	}
	return points;
}

function scrabbleScore(word) {
	word = word.toLowerCase();
	let points = 0;
	for (i = 0; i < word.length; i++) {
		points = points + newPointStructure[word[i]];
	}
	return points;
}

let simple = {
	name: 'Simple Score',
	description: 'Each letter is worth 1 point.',
	scoringFunction: simpleScore
};

let vowelBonus = {
	name: 'Bonus Vowels',
	description: 'Vowels are 3 pts, consonants are 1 pt.',
	scoringFunction: vowelBonusScore
};

let scrabble = {
	name: 'Scrabble',
	description: 'The traditional scoring algorithm.',
	scoringFunction: scrabbleScore
  };

const scoringAlgorithms = [ simple, vowelBonus, scrabble ];


function scorerPrompt(word) {
	let scoreType = input.question(
		'Choose a scoring algorithm! \n0 - Simple: One point per character \n1 - Vowel Bonus: Vowels are worth 3 points \n2 - Scrabble: Uses scrabble point system \nEnter 0, 1, or 2: '
	);

	while (isNaN(scoreType) || scoreType > 2 || scoreType < 0) {
		scoreType = input.question(
			'\nChoose a scoring algorithm! \n\n0 - Simple: One point per character \n1 - Vowel Bonus: Vowels are worth 3 points \n2 - Scrabble: Uses scrabble point system \nEnter 0, 1, or 2: '
		);
	}
	return console.log(
		`Score for '${word}': ${scoringAlgorithms[scoreType].scoringFunction(word)}`
	);
}

function runProgram() {
	scorerPrompt(initialPrompt());
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

