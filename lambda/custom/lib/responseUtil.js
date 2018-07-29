const data = require('./jokeList');

/**
   Thesea are favorite interjections from the SML reference.
   https://developer.amazon.com/docs/custom-skills/speechcon-reference-interjections-english-us.html
**/
const RIM_SHOTS = [
    '<say-as interpret-as="interjection">bada bing bada boom</say-as>',
    '<say-as interpret-as="interjection">bam</say-as>',
    '<say-as interpret-as="interjection">bazinga</say-as>',
    '<say-as interpret-as="interjection">booya</say-as>',
    '<say-as interpret-as="interjection">meow</say-as>',
];

/** 
  Function that return a random rim shot interjection but only some of the time, so it comes as a surprise to the user.
**/
const getRimShot = function() {
    const threshhold = .07;
    let result = '';
    if(Math.random() < threshhold) {
        const index = Math.floor(Math.random() * RIM_SHOTS.length);
        result += RIM_SHOTS[index];
    }
    return result;
};

/**
    Get a random item from the joke list.
**/
const getRandomItem = function() {
    return data[Math.floor(Math.random() * data.length)];
}

module.exports = {
    getRandomItem: getRandomItem,
    getRimShot: getRimShot
}