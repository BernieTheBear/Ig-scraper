const toxicityMod = require('@tensorflow-models/toxicity')
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
const fs = require('fs')
const emojiStrip = require('emoji-strip')


//import * as toxicity from '@tensorflow-models/toxicity';


// The minimum prediction confidence.
const threshold = 0.9;
let trueToxicCount=0;
let falseToxicCount=0;
let unclassifiedComments=0;

const sentences = [' POST NUM 1 Ohhh love',
'Coloca no enjoei que j quero',
'Lblblb',
'MIRACULOUSSS',
'Bitch',
'Lb3x3',
'Lbbbl',
'INSTANTLY FIRST CBCBCBCBCBCB ',
'Loser ',
'Spit on me',
'like ',
'if i should deIete my IG ',
'first',
'Oh to be rich',
];

 
// Load the model. Users optionally pass in a threshold and an array of
// labels to include.

async function makePrediction(comments){

    let model = await toxicityMod.load(threshold)
    let predictions = await model.classify(comments)
    let arrayOfPredictions = []
    for(i=0;i<predictions.length;i++){
      arrayOfPredictions.push((predictions[i]))
    }
    let toxicityObj = arrayOfPredictions[6]
    let results = toxicityObj.results
    return results
}
  async function runAI(data){
    let results = await makePrediction(data)
    tallyResults(results)
  }

  /*This function takes raw prediction results and abstracts out the 'true' and 'false' values by using the 'Match' property on each nested object
    Ex. results[i].match will either be 'true' or 'false' depending on what the model classified the comment as  */
  function tallyResults(results){
    for(i=0;i<results.length;i++){
       if(results[i].match == true){
          trueToxicCount+=1
       } else if(results[i].match == false){
         falseToxicCount+=1
       } else {
         unclassifiedComments+=1 //for comments where match = null -> meaning unclassified as toxic or not
       }

    }
    let toxicPercentage =  (trueToxicCount / results.length)
    let nonToxicPercentage = (falseToxicCount / results.length)
   
    // console.log('Toxic Percentage: ' + toxicPercentage + '% over ' + trueToxicCount +'/'+ results.length + ' total comments')
    // console.log('Non Toxic Percentage: ' + nonToxicPercentage + '% over '+ falseToxicCount +'/'+ results.length + ' total comments')
    // console.log('Total unclassified: ' + unclassifiedComments + ' out of ' + results.length + ' total comments')

    //encapsulate results into an object and return
    let calculatedResults = {
       toxicPercentage: toxicPercentage,
       nonToxicPercentage: nonToxicPercentage,
       unclassifiedComments: unclassifiedComments
    }
    return calculatedResults;  //return out to be used in app.js
  }
  
  
  //runAI(sentences) -> for testing by running from this file directly
  
  
  module.exports = {
      runAI: runAI
  }



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
    
 
/* STRUCTURE OF arrayOfPredictions is:
    [
    '{"label":"identity_attack","results":[
        {"probabilities":{"0":0.9659663438796997,"1":0.034033700823783875},"match":false},
        {"probabilities":{"0":0.9921950101852417,"1":0.00780494324862957},"match":false},
        {"probabilities":{"0":0.9999512434005737,"1":0.000048760874051367864},"match":false}
    ]}',

    '{"label":"insult","results":[
        {"probabilities":{"0":0.0812470093369484,"1":0.9187529683113098},"match":true},
        {"probabilities":{"0":0.9633523225784302,"1":0.036647673696279526},"match":false},
        {"probabilities":{"0":0.999562680721283,"1":0.0004372781259007752},"match":false}]}',

    '{"label":"obscene","results":[
        {"probabilities":{"0":0.3993155360221863,"1":0.6006844639778137},"match":null},{"probabilities":{"0":0.9984427094459534,"1":0.0015573396813124418},"match":false},{"probabilities":{"0":0.999913215637207,"1":0.00008679015445522964},"match":false}]}',
    '{"label":"severe_toxicity","results":[{"probabilities":{"0":0.9970394968986511,"1":0.0029604362789541483},"match":false},{"probabilities":{"0":0.999996542930603,"1":0.000003515783646435011},"match":false},{"probabilities":{"0":1,"1":4.7531660385402574e-8},"match":false}]}',
    '{"label":"sexual_explicit","results":[{"probabilities":{"0":0.7053253650665283,"1":0.2946746349334717},"match":null},{"probabilities":{"0":0.9995667338371277,"1":0.0004332040261942893},"match":false},{"probabilities":{"0":0.9999327659606934,"1":0.00006722353282384574},"match":false}]}',
    '{"label":"threat","results":[{"probabilities":{"0":0.910673975944519,"1":0.08932600915431976},"match":false},{"probabilities":{"0":0.9976200461387634,"1":0.002379966201260686},"match":false},{"probabilities":{"0":0.9998364448547363,"1":0.0001634958607610315},"match":false}]}',
    '{"label":"toxicity","results":[{"probabilities":{"0":0.031176742166280746,"1":0.9688233137130737},"match":true},{"probabilities":{"0":0.9092447757720947,"1":0.0907551497220993},"match":false},{"probabilities":{"0":0.9989499449729919,"1":0.0010500926291570067},"match":false}]}'
  ]

*/




/*
https://www.kdnuggets.com/2020/03/tensorflow-keras-tokenization-text-data-prep.html
https://github.com/tensorflow/tfjs-models/blob/master/toxicity/demo/index.js
https://github.com/conversationai/conversationai.github.io/blob/master/crowdsourcing_annotation_schemes/toxicity_with_subattributes.md
https://stackoverflow.com/questions/11922383/how-can-i-access-and-process-nested-objects-arrays-or-json
*/