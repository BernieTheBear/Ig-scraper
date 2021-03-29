
const scraper = require('./insta-scrape-test.js')
const AI = require('./AI-script2.js')
const express = require('express')
const fs = require('fs')
const emojiStrip = require('emoji-strip');
const e = require('express');
const { until } = require('selenium-webdriver');
const { run } = require('./insta-scrape-test.js');
const AIScript2 = require('./AI-script2.js');



var UN ='SentiScrape';
var PW ='kirklandExpo';



//REQUEST ROUTING
const app = express()

// respond with sentiment rating when url with specific celeb choice is requested
    // app.get(`search/${celebChoice}`, function (req, res) {
    //     sentimentRating = scraper.main_scrape_func(UN,PW,celebChoice)
    //     res.JSON()//return sentiment rating
    //   })


//MAIN SCRAPE FUNCTION
const celebChoice = 'kyliejenner'

//scraper.runScraper(UN,PW,celebChoice)
async function getAndProcessComments (UN,PW,celebChoice){
    
    let data = await scraper.runScraper(UN,PW,celebChoice)
    cleanedComments = cleanComments(data)
    console.log(cleanedComments)
    let results = await AI.runAI(cleanedComments)
    return(JSON.stringify(results))
}
async function run2(){
    let r = await getAndProcessComments(UN,PW,celebChoice)
    return r
}
console.log(run2())
// async function test(cleanedComments){
//     let results = await AI.runAI(cleanedComments)
//     console.log(JSON.stringify(results))
// }
// test(cleanedComments)



/* COMMENT PREPROCESSING BEFORE PASSING TO AI */
function cleanComments(comments){
    let noSymbols = symStripFunc(JSON.stringify(comments))    //non alphanumeric symbols removed
    let noEmojis = emojiStrip(noSymbols)  //removes emojis, might be redundant because symStringFunc did it but just as a double measure.
    let commaSplitArray = noEmojis.split(",") //seperates comments at ',' and puts them in array
    let emptiesRemovedArray = commaSplitArray.filter( elem => elem !== " ") //removes all empty comments left from removing emojis
    //console.log(emptiesRemovedArray)
    return(emptiesRemovedArray)
}
/* Text processing function This removes all symbols that are not alphanumeric and in doing so, removes all emojis*/
function symStripFunc (dataIn) {
        let tempString = dataIn.replace(/[^a-z0-9/',]/gmi, " ").replace(/\s+/g, " ");
        //let tempString2 = tempString.replace(/[\,]+/g,"");
        let tempString2 = tempString.replace(/,+/g,',');
        return tempString2
}







/* COMMENT PREPROCESSING BEFORE PASSING TO AI  -> this needs to go in AI script*/
    // fs.readFile('comments.txt','utf-8',(err,data)=>{
        
    //     let noSymbols = symStripFunc(data)    //non alphanumeric symbols removed
    //     let noEmojis = emojiStrip(noSymbols)  //removes emojis, might be redundant because symStringFunc did it but just as a double measure.
    //     let commaSplitArray = noEmojis.split(",") //seperates comments at ',' and puts them in array
    //     let emptiesRemovedArray = commaSplitArray.filter( elem => elem !== " ") //removes all empty comments left from removing emojis
    //     console.log(emptiesRemovedArray)
    // })
    // /* Text processing function
    //     THis removes all symbols that are not alphanumeric and in doing so, removes all emojis
    // */
    // const symStripFunc = (dataIn)=>{
    //     let tempString = dataIn.replace(/[^a-z0-9/',]/gmi, " ").replace(/\s+/g, " ");
    //     //let tempString2 = tempString.replace(/[\,]+/g,"");
    //     let tempString2 = tempString.replace(/,+/g,',');
    //     return tempString2
    // }
    






/* RESOURCES AND NOTES 
https://github.com/nizaroni/emoji-strip
https://stackoverflow.com/questions/6456864/why-does-node-js-fs-readfile-return-a-buffer-instead-of-string
https://stackoverflow.com/questions/19245897/regex-to-remove-multiple-comma-and-spaces-from-string-in-javascript
https://stackoverflow.com/questions/20864893/replace-all-non-alpha-numeric-characters-new-lines-and-multiple-white-space-wi
https://stackoverflow.com/questions/40101734/regex-to-add-a-new-line-break-after-each-bracket
https://stackoverflow.com/questions/19245897/regex-to-remove-multiple-comma-and-spaces-from-string-in-javascript
https://salesforce.stackexchange.com/questions/301150/remove-multiple-commas-between-two-strings
https://nodejs.org/en/knowledge/file-system/how-to-read-files-in-nodejs/
*/