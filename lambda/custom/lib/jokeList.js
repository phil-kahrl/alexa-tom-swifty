/**

Exports the list of jokes after validation.
Each element of the list should have the following

speech - The text which will be spoken for the output.
cardOutput - The text which will appear on the card for devices with a screen
keyword - Used to lookup the joke by the KEYWORDS intent from the interaction model.

**/

const data = require('../data/jokes');
data.forEach( (item) => {
	if( !(item.speech && item.cardOutput && item.keyword)){
		throw new Error(`Error in line: ${JSON.stringify(item)} , required member is missing`);
	}
})

module.exports = data

