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

     //add {sharp|flat} optional ending
     //find wave file for each note
     //audio stream it
     //done
     if (req.slot('Note')) {
         console.log('incoming note = ' + req.slot('Note'));
         spokenNote = req.slot('Note').toLowerCase().substring(0,1);
         console.log('extracted note ' + spokenNote);
         note = notes[spokenNote];
     }
     if (!note) {
         var reprompt = 'What note should we tune.';
         var prompt = 'I didn\'t hear a note.  Tell me a note.';
         res.say(prompt).reprompt(reprompt).shouldEndSession(false);
         //return true;
     } else {
         res.say('Playing the note ' + note + '.  <audio src="https://dropofapin.com/tune/lowe.mp3" />').send();
         //return true;
     }
 }
);

app.post = function(req, res, type, exception) {
    if (exception) {
        return res.clear().say("Oops, something went wrong: " + exception).send();
    }
};

module.exports = app;
