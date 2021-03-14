const toxicity = require('@tensorflow-models/toxicity')
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
const fs = require('fs')
const emojiStrip = require('emoji-strip')


//import * as toxicity from '@tensorflow-models/toxicity';


// The minimum prediction confidence.
const threshold = 0.9;
 
// Load the model. Users optionally pass in a threshold and an array of
// labels to include.
toxicity.load(threshold).then(model => {
  const sentences = ['you suck', 'Vamooossss ',
  ' Focused ',
  ' You are greatest of all time ',
  ' Champion ',
  ' You are greatest of all time ',
  ' KING OF CHAMPIONS LEAGUE IS BACKKKK ',
  ' This is a friendly reminder to not beat your sons ',
  ' SIUUUUUUUM',
  ' Cristiano aiuuuuum',
  ' Skills ',
  ' VAMOS CARALHOOOO ',
  ' Forza Cris',
  ' domani facci cantare ',
  ' Vamos Porto ',
  ' Portaci la coppa',
  ' SIIIIIIUUUUUUUUU ',
  ' Fai gol',
  ' Portaci la Champions cristiano ',
  ' Fuori le palle e portaci a casa questa coppa ',
  ' 51 x 53 ',
  " Seeking a pretty female to star in my PODCAST You don't have to be local to Los Angeles County",
  ' shoot me a dm',
  ' 2x8 ',
  ' Vamooossss ',
  ' You are greatest of all time ',
  ' Focused ',
  ' Skills ',
  ' You are greatest of all time ',
  ' Champion ',
  ' KING OF CHAMPIONS LEAGUE IS BACKKKK ',
  ' This is a friendly reminder to not beat your sons ',
  ' SIUUUUUUUM',
  ' Cristiano aiuuuuum',
  ' Portaci la coppa',
  ' VAMOS CARALHOOOO ',
  ' Fai gol',
  ' SIIIIIIUUUUUUUUU ',
  ' Vamos Porto ',
  ' vamos ',
  ' impara l italiano',
  ' FOCUSED ON THE CHAMPIONS',
  ' Fenerbah e ',
  ' STAY STRONG ',
  ' Ti aspecto',
  ' Ti aspecto chitemmuort 5 al fanta',
  ' Come back stronger as always ',
  ' ti aspecto',
  ' Abisi sevsin ',
  ' Never lose hope king ',
  ' You re amazing and the best',
  ' this would never change',
  ' Primooo',
  ' Acontece bora ganhar do Porto ',
  ' Kiiiiiiiiiiiiiiiiiiiiiing CR7 ',
  ' CR7 ',
  ' Merih de ligt',
  ' Come to Besiktas ',
  ' Ti aspecto',
  ' turk takimi tractor azarbayjan ',
  ' Il migliore cristiano',
  ' Wow',
  ' CR7 Pessi',
  ' Who is still single here ',
  ' Who is single ',
  ' Daje ',
  ' TI ASPECTIAMO ',
  ' Unlucky mate ',
  ' Leccami sium',
  ' Volta pra madrid',
  ' Vamos cristiano ',
  ' We are proud of you son',
  ' you represent us well',
  ' Ti aspectoq',
  ' Lov You ',
  ' Vamooossss ',
  ' Skills ',
  ' Focused ',
  ' You are greatest of all time ',
  ' KING OF CHAMPIONS LEAGUE IS BACKKKK ',
  ' This is a friendly reminder to not beat your sons ',
  ' SIUUUUUUUM',
  ' Champion ',
  ' Cristiano aiuuuuum',
  ' VAMOS CARALHOOOO ',
  ' SIIIIIIUUUUUUUUU ',
  ' Fai gol',
  ' Vamos Porto ',
  ' Forza Cris',
  ' domani facci cantare ',
  ' Portaci la Champions cristiano ',
  ' Fuori le palle e portaci a casa questa coppa ',
  ' 2x8 ',
  " Seeking a pretty female to star in my PODCAST You don't have to be local to Los Angeles County",
  ' shoot me a dm',
  ' 51 x 53 ',
  ' You are greatest of all time ',
  ' Come back stronger as always ',
  ' STAY STRONG '];
  
 

model.classify(sentences).then(predictions => {
    
    // for(i=0;i<predictions.length;i++){
    //     console.log(JSON.stringify(predictions[i].label))
    //     console.log(JSON.stringify(predictions[i].results))
    // }
    console.log(JSON.stringify(predictions))
    
    });
});


 

/*   



 `predictions` is an array of objects, one for each prediction head,
    that contains the raw probabilities for each input along with the
    final prediction in `match` (either `true` or `false`).
    If neither prediction exceeds the threshold, `match` is `null`.
 


console.log(JSON.parse(predictions));
    
    prints:
    {
      "label": "identity_attack",
      "results": [{
        "probabilities": [0.9659664034843445, 0.03403361141681671],
        "match": false
      }]
    },
    {
      "label": "insult",
      "results": [{
        "probabilities": [0.08124706149101257, 0.9187529683113098],
        "match": true
      }]
    },
    
*/
/*
https://www.kdnuggets.com/2020/03/tensorflow-keras-tokenization-text-data-prep.html
https://github.com/tensorflow/tfjs-models/blob/master/toxicity/demo/index.js
https://github.com/conversationai/conversationai.github.io/blob/master/crowdsourcing_annotation_schemes/toxicity_with_subattributes.md
*/