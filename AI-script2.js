const toxicityMod = require('@tensorflow-models/toxicity')
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
const fs = require('fs')
const emojiStrip = require('emoji-strip')


//import * as toxicity from '@tensorflow-models/toxicity';


// The minimum prediction confidence.
const threshold = 0.9;
 
// Load the model. Users optionally pass in a threshold and an array of
// labels to include.
toxicityMod.load(threshold).then(model => {
  const sentences = ['you suck', 'Vamooossss ',
  ' Focused','loser','dummy','beautiful','you are great',
  ];
  
  /* 6th object is toxicity object
     to get results use .results on the toxicityObject
  */
    model.classify(sentences).then(predictions => {
        let arrayOfPredictions = []
        
        for(i=0;i<predictions.length;i++){
          arrayOfPredictions.push((predictions[i]))
      }
      let toxicityObj = arrayOfPredictions[6]
      let results = toxicityObj.results
      console.log(results)
      
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