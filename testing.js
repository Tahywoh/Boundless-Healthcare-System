function modifyWords (words) {
	let desired = [], desiredWords
	
	let newWords = words.toLowerCase().split(' ')
	
	for(let i = 0; i < newWords.length; i++) {
		let subWord = newWords[i].split('')
		subWord[0] = subWord[0].toUpperCase()
		subWord = subWord.join('')
		desired.push(subWord)
	}
	desired[0] = desired[0].toLowerCase()
	desiredWords = desired.join('-')
	console.log(desiredWords)
	return desiredWords
}
modifyWords('This is tHe soluTion to jalasem exercise')