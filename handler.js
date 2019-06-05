/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * Alexa Skill by Patrick Krause / 2017
 * based on https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = 'amzn1.ask.skill.09a5ea7f-b897-49cc-8b3a-6087ac63d926';  

const languageStrings = {
    'en-GB': {
        translation: {
            FACTS: [
                'Cat, come here!!',
                'Miau, miau, miauuuuuuu?',
                'Where is the bird? There! Catch the bird!',
                'Bsssssssssssssssss. Bssssssssssssssssssss.',
                'Miau <break time="3s"/> miauuuuuuuu <break time="3s"/> brrrrrrrrrr <break time="3s"/> tztztz.',
                'piep.                           piep.                      piep',
                'Cat! bssss, such a nice cat!',
                'Catch the mouse! There! There is the mouse!',
                'Faß! Faß! Los, faß!',
				'Wanna eat? Cat, come eat!',
				'Wanna cat sugar? So nice ...',
            ],
            SKILL_NAME: 'British the cat',
            GET_FACT_MESSAGE: "",
            HELP_MESSAGE: 'You can say call the cat, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        },
    },
    'en-US': {
        translation: {
            FACTS: [
                'Cat, come here!!',
                'Miau, miau, miauuuuuuu?',
                'Where is the bird? There! Catch the bird!',
                'Bsssssssssssssssssss. Bssssssssssssssssssss.',
                'Miau <break time="3s"/> miauuuuuuuu <break time="3s"/> brrrrrrrrrr <break time="3s"/> tztztz.',
                'piep.                           piep.                      piep',
                'Cat! bssss, such a nice cat!',
                'Catch the mouse! There! There is the mouse!',
                'Faß! Faß! Los, faß!',
				'Wanna eat? Cat, come eat!',
				'Wanna cat sugar? So nice ...',
            ],
            SKILL_NAME: 'American the cat',
            GET_FACT_MESSAGE: "",
            HELP_MESSAGE: 'You can say call the cat, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        },
    },
    'de-DE': {
        translation: {
            FACTS: [
                'Katze, komm her! Wie heißt Du denn? Bist Du ein feiner? Nein? Ich meinte, bist Du ein Schreiner? Hahaha! lass Dich nicht verarschen.',
                'Miau, miau, miauuuuuuu? Hallo, aufgepasst! Katze? Du scheinst nicht sehr schlau zu sein!',
                'Wo ist der Piepmatz? Kuck mal! Da ist er! Los, lauf hinterher! Nein? Ach ja stimmt, Du bist ja schließlich kein Hund, hahaha!',
                'Bssssssssssssssss. Bssssssssssssssssssss.',
                'Miau <break time="3s"/> miauuuuuuuu <break time="3s"/> brrrrrrrrrr <break time="3s"/> tztztz.',
                'piep.                           piep.                      piep - wo ist das Mäuschen? Fang die Maus, los! Mach schon! Nein? Na los jetzt!',
                'Katze! bssss, ja so ein feiner! Lass uns spielen beweg Dich nicht, also los: beweg Dich ab jetzt nicht für 5 Sekunden!',
                'Hol die Maus! Da! Da ist die Maus, such! Aber bring sie bitte nicht mit ins Bett! Und am besten auch nicht ins Wohnzimmer! Am besten bringst Du sie gar nicht erst mit ins Haus, dann kriegst Du 100 Punkte! OK?',
                'Faß! Faß! Los, faß! Beiß, fass, mach sie fertig! Nein? Dann bist Du eine gute Katze - wenn Du die anderen Tiere nicht quälst! Fein hast Du das gemacht!',
				'Essen? Katze, ESSEN! Hahaha das war nur ein lustiger Witz - zum Glück bist Du nicht drauf reingefallen!',
				'Willst Du ein Bonbon? Hmmm? Oder ein Leckerli? Kriegst Du aber nicht, hahaha!',
            ],
            SKILL_NAME: 'Sprich mit der Katze',
            GET_FACT_MESSAGE: '',
            HELP_MESSAGE: 'Du kannst sagen, „Sprich mit der Katze“, oder du kannst „Beenden“ sagen... Wie kann ich dir helfen?',
            HELP_REPROMPT: 'Wie kann ich dir helfen?',
            STOP_MESSAGE: 'Auf Wiedersehen!',
        },
    },
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewCatIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random cat call from the list
        // Use this.t() to get corresponding language data
        const catArr = this.t('FACTS');
        const catIndex = Math.floor(Math.random() * catArr.length);
        const randomCat = catArr[catIndex];

        // Create speech output
        const speechOutput = this.t('GET_FACT_MESSAGE') + randomCat;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomCat);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};