const SKILL_NAME = 'Tom Swifty';
const HELP_MESSAGE = 'Say "next" to hear a joke, or cancel to exit';
const HELP_REPROMPT = 'What can I help you with?';
const HELP_CONTENT = 'You can say "next" to hear a joke or "stop" to exit.';
const CARD_TITLE = "Here's a Tom Swifty";
const STOP_MESSAGES = [
    'Goodbye!', 
    'Goodbye', 
    'See you later', 
    'Bye',
    'Aloha', 
    'Going so soon? Bye!', 
    'Nice talking to you',
    'Talk to you later',
    'Come back soon',
    '<say-as interpret-as="interjection">as you wish</say-as>',
    '<say-as interpret-as="interjection">aw man</say-as>',
    '<say-as interpret-as="interjection">arrivederci</say-as>',
    '<say-as interpret-as="interjection">au revoir</say-as>',
    '<say-as interpret-as="interjection">boo hoo</say-as>',
    '<say-as interpret-as="interjection">bummer</say-as>',
    '<say-as interpret-as="interjection">okey dokey</say-as>',
];

const NEXT_PROMPTS = [
    'Another?',
    'Another',
    'Anyone want another?',
    'Would you like to hear another?',
    'Would you like another?',
    'More?',
    'Want more?'
]

// The max history size for a session is set to 80% the size of the complete joke list
const MAX_HISTORY_SIZE = Math.floor(require('./jokeList').length * .8)

module.exports = {
    SKILL_NAME,
    HELP_MESSAGE,
    HELP_REPROMPT,
    HELP_CONTENT,
    CARD_TITLE,
    STOP_MESSAGES,
    NEXT_PROMPTS,
    MAX_HISTORY_SIZE
}