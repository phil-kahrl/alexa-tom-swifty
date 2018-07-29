/**
    Main event handler for the Tom Swifty Alexa skill.
    This handler lives in an AWS Lambda function where it will be invoked
    from the Alexa gateway for the skill.

**/
'use strict';
// To build and test your own copy of the app, replace the APP_ID here with your app Id from the Alexa developer console.
const APP_ID = 'amzn1.ask.skill.fbde9b42-37bf-4133-9830-05d24727a1cd';
const Alexa = require('alexa-sdk');
const responseUtil = require('./lib/responseUtil');
const keywordResponseBuilder = require('./lib/keywordResponseBuilder');
const {SKILL_NAME, HELP_MESSAGE, HELP_REPROMPT, HELP_CONTENT, CARD_TITLE, STOP_MESSAGES, NEXT_PROMPTS, MAX_HISTORY_SIZE } 
= require('./lib/constants')

/**
    Helper function to get a random stop message.
**/
const getStopMessage = function() {
    const index = Math.floor(Math.random() * STOP_MESSAGES.length);
    return STOP_MESSAGES[index];
};

/**
    Helper function to get a random next prompt
**/
const getNextPrompt = function() {
    const index = Math.floor(Math.random() * NEXT_PROMPTS.length);
    return NEXT_PROMPTS[index];
};

/**
    Helper function to build a response from a response builder and an item.
    Input spec:
        response - An alexa responseBuilder object.
        item - A joke object
**/
const constructResponse = function(response, item){
    response.speak(item.speech + '. ' + responseUtil.getRimShot() + ' <break time="2s"/> ' + getNextPrompt() ).listen(getStopMessage());
    response.cardRenderer(CARD_TITLE, item.cardOutput);
}

/**
    Helper function to determine if an item is in the history. 
**/
const isItemInList = function(item, history){
    let found = false;
    history.forEach( (i) => {
        if(i.speech === item.speech) found = true;
    });
    return found;
}

/**
    Register the handlers so that the the input event will be routed based on the intent.
**/
exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

/**
    Map of handler functions to Intent Names.
    Custom intents for this skill can be found in the InteractionModel.json

**/
const handlers = {
    'LaunchRequest': function () {
        this.attributes.history = [];
        this.emit('GetRandomItemIntent');
    },
    'GetRandomItemIntent': function () {
        if(this.attributes.history.length > MAX_HISTORY_SIZE) this.attributes.history = [];
        let randomItem = responseUtil.getRandomItem();
        while(isItemInList(randomItem, this.attributes.history)) {
            let randomItem = responseUtil.getRandomItem();
        } 
        this.attributes.history.push(randomItem);
        constructResponse(this.response, randomItem);
        this.emit(':responseReady');
    },
    'ConfirmIntent': function () {
        this.emit('GetRandomItemIntent');
    },
    'AMAZON.NextIntent': function () {
        this.emit('GetRandomItemIntent');
    },
   'AMAZON.HelpIntent': function () {
        this.response.speak(HELP_MESSAGE).listen(HELP_REPROMPT);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(getStopMessage());
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(getStopMessage());
        this.emit(':responseReady');
    },
    'GetByKeyword': function () {
        console.log("KEYWORD: " + this.event.request.intent.slots.keyword.value);
        let response =  keywordResponseBuilder(this.event.request.intent.slots.keyword.value);
        const item =response.item;
        this.attributes.history.push(item);
        if(!response.found){
            item.speech = " I don't know one for " + this.event.request.intent.slots.keyword.value + ", but here is one you might like. " + item.speech;
        }
        constructResponse(this.response, item);
        this.emit(':responseReady');
    },
    'RepeatIntent': function() {
        if(this.attributes.history.length > 0) {
           const lastItem = this.attributes.history[this.attributes.history.length - 1];
           constructResponse(this.response, lastItem);
           this.emit(':responseReady');
        } else {
            this.response.speak('There is nothing to repeat');
            this.response.cardRenderer('Nothing to repeat', "I haven't given you a joke yet");
            this.emit(':responseReady');
        }
    },
    'Unhandled' : function() {
        this.response.speak("Sorry I didn't get that");
        this.emit(':responseReady');
    }
};
