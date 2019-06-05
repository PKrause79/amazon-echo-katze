/********************************************
 * Project:     "Bespaße die Katze" - Amazon Echo Alexa Skill
 * Description: Backend handler (for Amazon AWS Serverless Lambda function) 
 * GitHub:      https://github.com/PKrause79/amazon-echo-katze
 * Author:      Patrick Krause / (c) 2019
 *******************************************/

/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = 'amzn1.ask.skill.09a5ea7f-b897-49cc-8b3a-6087ac63d926';  

const languageStrings = {
    // 'en-GB': {
    //     translation: {
    //         FACTS: [
    //             'Cat, come here!!',
    //             'Miau, miau, miauuuuuuu?',
    //             'Where is the bird? There! Catch the bird!',
    //             'Bsssssssssssssssss. Bssssssssssssssssssss.',
    //             'Miau <break time="3s"/> miauuuuuuuu <break time="3s"/> brrrrrrrrrr <break time="3s"/> tztztz.',
    //             'piep.                           piep.                      piep',
    //             'Cat! bssss, such a nice cat!',
    //             'Catch the mouse! There! There is the mouse!',
    //             'Faß! Faß! Los, faß!',
				// 'Wanna eat? Cat, come eat!',
				// 'Wanna cat sugar? So nice ...',
    //         ],
    //         SKILL_NAME: 'British the cat',
    //         GET_FACT_MESSAGE: "",
    //         HELP_MESSAGE: 'You can say call the cat, or, you can say exit... What can I help you with?',
    //         HELP_REPROMPT: 'What can I help you with?',
    //         STOP_MESSAGE: 'Goodbye!',
    //     },
    // },
    // 'en-US': {
    //     translation: {
    //         FACTS: [
    //             'Cat, come here!!',
    //             'Miau, miau, miauuuuuuu?',
    //             'Where is the bird? There! Catch the bird!',
    //             'Bsssssssssssssssssss. Bssssssssssssssssssss.',
    //             'Miau <break time="3s"/> miauuuuuuuu <break time="3s"/> brrrrrrrrrr <break time="3s"/> tztztz.',
    //             'piep.                           piep.                      piep',
    //             'Cat! bssss, such a nice cat!',
    //             'Catch the mouse! There! There is the mouse!',
    //             'Faß! Faß! Los, faß!',
				// 'Wanna eat? Cat, come eat!',
				// 'Wanna cat sugar? So nice ...',
    //         ],
    //         SKILL_NAME: 'American the cat',
    //         GET_FACT_MESSAGE: "",
    //         HELP_MESSAGE: 'You can say call the cat, or, you can say exit... What can I help you with?',
    //         HELP_REPROMPT: 'What can I help you with?',
    //         STOP_MESSAGE: 'Goodbye!',
    //     },
    // },
    'de-DE': {
        translation: {
            SENTENCES: [
                '<break time="2s"/>Katze, komm her! <break time="2s"/> Wie heißt Du denn? <emphasis level="strong">Bist Du ein feiner?</emphasis>  Nein? <amazon:effect name="whispered">Ich meinte, bist Du ein Schreiner?</amazon:effect> Ha ha! <voice name="Hans"><emphasis level="strong">HEY! Lass die Katze in Ruhe!</emphasis></voice>',
                '<break time="2s"/><audio src="soundbank://soundlibrary/animals/amzn_sfx_cat_meow_1x_01" /> <break time="3s"/> <audio src="soundbank://soundlibrary/animals/amzn_sfx_cat_angry_meow_1x_01" />Katze? Was war denn das! Eine Nachbarskatze? <audio src="soundbank://soundlibrary/animals/amzn_sfx_cat_angry_screech_1x_01" /> ',
                '<break time="2s"/><audio src="soundbank://soundlibrary/animals/amzn_sfx_bird_chickadee_chirps_01" /> Wo ist der Piepmatz? <break time="1s"/><emphasis level="strong">Kuck mal!</emphasis> Hier drin ist er! <break time="1s"/> <amazon:effect name="whispered">Los, lauf hinterher!</amazon:effect> <break time="1s"/>Nein? Katze, was stimmt mit Dir nicht? Ach ja, Du bist ja schließlich kein <emphasis level="moderate">Hund</emphasis>, ha ha ha!',
                '<break time="2s"/><audio src="soundbank://soundlibrary/animals/amzn_sfx_dog_med_bark_2x_01" /> <audio src="soundbank://soundlibrary/animals/amzn_sfx_dog_med_bark_1x_01" /> <voice name="Hans"> <break time="1s"/> Ich bin ein fürchterlicher Piranja Pudel und Du solltest Dich vor mir fürchten! </voice> ',
                '<break time="2s"/><audio src="soundbank://soundlibrary/animals/amzn_sfx_rat_squeak_2x_01" /> <break time="2s"/> <audio src="soundbank://soundlibrary/animals/amzn_sfx_rat_squeaks_01"/> <break time="2s"/> <audio src="soundbank://soundlibrary/animals/amzn_sfx_rat_squeak_2x_01" />',
                '<break time="2s"/><emphasis level="strong"><prosody pitch="x-high">piep.<break time="3s"/>piep.<break time="2s"/>piep </prosody></emphasis> <break time="1s"/><audio src="soundbank://soundlibrary/animals/amzn_sfx_crow_caw_1x_01" /> <break time="1s"/> <audio src="soundbank://soundlibrary/animals/amzn_sfx_crow_caw_1x_01" /><break time="2s"/> <audio src="soundbank://soundlibrary/animals/amzn_sfx_crow_caw_1x_02"/> <amazon:effect name="whispered">wo ist das Vögelchen?</amazon:effect> <break time="2s"/> FANG DEN VOGEL, JETZT! <break time="2s"/> Nein? Na dann nicht!',
                '<break time="2s"/>Katze! Ja so ein feiner! Lass uns "beweg Dich nicht" spielen, OK?<break time="1s"/>! Also los: beweg Dich ab jetzt nicht für 5 Sekunden!',
                '<break time="2s"/><audio src="soundbank://soundlibrary/animals/amzn_sfx_rat_squeaks_01"/><break time="2s"/> <audio src="soundbank://soundlibrary/animals/amzn_sfx_rat_squeak_2x_01" /> Hol die Maus! Da! Da ist die Maus, such! Aber bring sie bitte nicht mit ins Bett! Und am besten auch nicht ins Wohnzimmer! Am besten bringst Du sie gar nicht erst mit ins Haus, dann kriegst Du 100 Punkte! OK?',
                '<break time="2s"/><amazon:effect name="whispered">Katze guck mal, da ist eine Maus!</amazon:effect> <break time="2s"/>FASS! FASS! LOS, fass die Maus! Beiß sie, fass - mach sie fertig! <break time="3s"/>Nein? Was ist bloß los mit Dir? Naja, dann bist Du halt eine <emphasis level="strong">gute</emphasis> Katze - wenn Du die anderen Tiere nicht quälst! <amazon:effect name="whispered">Fein hast Du das gemacht!</amazon:effect>',
				'<break time="2s"/><emphasis level="strong">Essen?</emphasis> <break time="2s"/> Katze, <emphasis level="strong">ESSEN?</emphasis> Ha ha ha, das war nur ein lustiger Witz - zum Glück bist Du ja nicht drauf reingefallen! Heute gibt es nichts zu essen.',
				'<break time="2s"/><amazon:effect name="whispered">Katze, willst Du ein Bonbon?</amazon:effect> Hmmm? <amazon:effect name="whispered">Oder ein Leckerli?</amazon:effect> Kriegst Du aber nicht, ha ha ha!',
                '<break time="2s"/><audio src="soundbank://soundlibrary/animals/amzn_sfx_cat_purr_01" /> <break time="1s"/> <audio src="soundbank://soundlibrary/animals/amzn_sfx_cat_purr_03" /> <break time="2s"/> <audio src="soundbank://soundlibrary/animals/amzn_sfx_cat_purr_01" /> <audio src="soundbank://soundlibrary/animals/amzn_sfx_cat_purr_02" /> <break time="2s"/> <audio src="soundbank://soundlibrary/animals/amzn_sfx_cat_purr_meow_01" />'
            ],
            SKILL_NAME: 'Bespaße die Katze',
            HELP_MESSAGE: 'Du kannst sagen, „Bespaße die Katze“, oder du kannst „Beenden“ sagen... Wie kann ich dir helfen?',
            HELP_REPROMPT: 'Wie kann ich Dir helfen?',
            STOP_MESSAGE: 'Miau miao - auf Wiedersehen!',
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
        
        // get a random cat call from the list
        // use this.t() to get corresponding language data
        const sentenceArray = this.t('SENTENCES');
        const sentenceIndex = Math.floor(Math.random() * sentenceArray.length);
        const sentence = sentenceArray[sentenceIndex];

        // Create speech output
        this.emit(
            ':tellWithCard', 
            sentence, 
            this.t('SKILL_NAME'), 
            'Die Katze wurde gerade bespaßt und ist nun vermutlich sehr glücklich!'
            ); 
            
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
