'use strict';
var Alexa = require('alexa-app');
var APP_ID = "amzn1.ask.skill.a4ce9317-3c13-4170-abeb-4553a75b7c76";
var app = new Alexa.app('tuner');
var notes = require('./notes');

app.launch(function(req, res) {
    var prompt = 'Time to tune.  What note should we tune.';
    console.log("launch skill");
    res.say(prompt).reprompt(prompt).shouldEndSession(false);
});
           
app.intent('TuneIntent', '',
 function (req, res) {
     var spokenNote;
     var note;

     if (req.slot('Note')) {
         spokenNote = req.slot('Note').toLowerCase().substring(0,1);
         note = notes[spokenNote];
     }
     if (!note) {
         var reprompt = 'What note should we tune?';
         var prompt = 'I didn\'t understand which note.  What note should we tune?';
         res.say(prompt).reprompt(reprompt).shouldEndSession(false);
     } else {
         var audiourl = 'https://dags.io/tune/' + note + '-note.mp3';
         res.say('Playing note ' + note + '.  <audio src="' + audiourl + '" />').shouldEndSession(false);
     }
 }
);

app.intent('TuneAllIntent', '',
 function (req, res) {
     res.say('Let\'s Tune.  <audio src="https://dags.io/tune/all-notes.mp3" /> ' ).send();
 }
);

app.intent('AMAZON.HelpIntent', '',
 function (req, res) {
     res.say('Ask me to tune all.  To tune a specific note, aske me to tune x.  X can be any of the standard notes on a 6 string guitar.').shouldEndSession(false);
 }
);

app.intent('AMAZON.StopIntent', '',
 function (req, res) {
     res.say('Goodbye.').send();
 }
);

app.post = function(req, res, type, exception) {
    if (exception) {
        return res.clear().say("Oops, something went wrong.  Please try again.").send();
    }
};

module.exports = app;
