# tom-swifty Alexa Skill

WARNING:  This repo may contain poor attempts at humor and should not be viewed by persons with a low tolerance for bad jokes.

## What it does

This repo is the source code for the Alexa skill on Amazon:

https://www.amazon.com/phil_kahrl-Tom-Swifty/dp/B07BR14GVL/

This is a voice skill that tells "Tom Swifty" puns.  The skill returns a randomly selected joke
or does a lookup by intent from the user on the punchline of the joke. 

For instance "Tom Muttered" will return the joke "'I don't know what kind of dog that is', Tom muttered."

Intent lookups are done by mapping keywords from the punchline of each pun to the pun itself.
The keywords are built into the InteractionModel.json file so that they can be recognized through natural language.

After each joke, the user will be prompted if they want to hear another joke.  The skill will exit at the end of the listen
interval after the next prompt, or on Stop or Cancel intents.

The application does joke de-duplication at the session level.

Common prompts including the ones for Goodbye and Next intents are pulled randomly from a set.

A Repeat intent will repeat the last joke from the current session.

## Building, testing and deploying.

Building, testing and deploying can all be done by the command line using the ASK CLI:
https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html

An AWS developer account is needed to build and test using the Alexa developer console with the ASK CLI.
The above documentation describes how to setup credentials and configure the ASK CLI, as well as how to test
in development.

## Adding new jokes.

New jokes can be added to the data file: /lambda/custom/jokes.js

New jokes should also add the keyword to the custom type KEYWORDS in the InteractionModel.json so that the lookup 
will work using speech recognition.

Pull requests for new jokes are always welcome!  No offensive content, please.

## Application Container

Skill endpoint is hosted on AWS Lambda using NodeJS