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
  const sentences = [];
  sentences = readFileFunc()
  model.classify(sentences).then(predictions => {
   
    console.log(JSON.parse(predictions));
    });
});

async function readFileFunc(){
    fs.readFile('comments.txt','utf-8',(err,data)=>{
        
        let noSymbols = symStripFunc(data)    //non alphanumeric symbols removed
        let noEmojis = emojiStrip(noSymbols)  //removes emojis, might be redundant because symStringFunc did it but just as a double measure.
        let commaSplitArray = noEmojis.split(",") //seperates comments at ',' and puts them in array
        let emptiesRemovedArray = commaSplitArray.filter( elem => elem !== " ") //removes all empty comments left from removing emojis
        //console.log(emptiesRemovedArray)
        return emptiesRemovedArray
    })
    return emptiesRemovedArray
}
/* Text processing function
    THis removes all symbols that are not alphanumeric and in doing so, removes all emojis
*/
const symStripFunc = (dataIn)=>{
    let tempString = dataIn.replace(/[^a-z0-9/',]/gmi, " ").replace(/\s+/g, " ");
    //let tempString2 = tempString.replace(/[\,]+/g,"");
    let tempString2 = tempString.replace(/,+/g,',');
    return tempString2
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
    
*/
/*
https://www.kdnuggets.com/2020/03/tensorflow-keras-tokenization-text-data-prep.html
https://github.com/tensorflow/tfjs-models/blob/master/toxicity/demo/index.js
https://github.com/conversationai/conversationai.github.io/blob/master/crowdsourcing_annotation_schemes/toxicity_with_subattributes.md
*/