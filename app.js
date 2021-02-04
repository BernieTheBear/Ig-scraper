/* RESOURCES 
  https://www.selenium.dev/selenium/docs/api/dotnet/html/Methods_T_OpenQA_Selenium_Chrome_ChromeDriver.htm


  //finding elements
  https://www.selenium.dev/selenium/docs/api/dotnet/html/Methods_T_OpenQA_Selenium_Chrome_ChromeDriver.htm
  https://www.selenium.dev/documentation/en/getting_started_with_webdriver/locating_elements/


  https://www.codota.com/code/javascript/functions/selenium-webdriver/By/className


Immediatley invoked function such as this below, need a semi colon on the thing you are requiring
(async function example(){})();
"For me, when I do Immediately invoked function, I need to put ; at the end of require()."

https://www.youtube.com/watch?v=khwV5IWng-I&ab_channel=GaurAssociates



https://sqa.stackexchange.com/questions/26422/how-to-get-href-attribute-value-using-selenium-java
https://stackoverflow.com/questions/20888592/gettext-method-of-selenium-chrome-driver-sometimes-returns-an-empty-string

https://www.guru99.com/locate-by-link-text-partial-link-text.html

SELECT - accessing values in dropdown
**** https://stackoverflow.com/questions/26041791/how-to-select-a-dropdown-value-in-selenium-webdriver-using-node-js
https://www.guru99.com/select-option-dropdown-selenium-webdriver.html
https://www.browserstack.com/guide/select-class-in-selenium


*/



// /* Simple working ex.*/
// var webdriver = require('selenium-webdriver');
// require('chromedriver')

// const test = async()=>{
//   var driver = new webdriver.Builder().forBrowser('chrome').build();
//   await driver.get('http://google.com')
//   await driver.sleep(100)
//   driver.quit();
// }
// test()
//-------------------------

// const webdriver = require('selenium-webdriver');
// const {By} = require('selenium-webdriver');
// //webdriver.Options.setExperimentalOption('detach',true)

// (async function example(){
//     let driver = await new webdriver.Builder().forBrowser('chrome').build();
//     try{
//       await driver.get('https://www.megamillions.com/Winning-Numbers/Previous-Drawings.aspx')
//       let element =(await driver.findElement(By.className('prevDrawingList'))).getText();
//       console.log('This is a test' + element)
//        //driver.sleep(100)
      
//     } catch(err){
//         console.log(err)
//     } finally {
//         //await driver.quit()
//     }
// })();


//=========================================================================
//const webDriver = require('selenium-webdriver');
const {By,Builder,Key,util,withTagName,cssSelector,Select, WebDriver} = require('selenium-webdriver');
const { elementIsDisabled } = require('selenium-webdriver/lib/until');

(async() =>{
    let driver = await new Builder().forBrowser('chrome').build();
   await driver.get('https://google.com')
   await driver.findElement(By.name('q')).sendKeys('megamillions',Key.RETURN);
  
   
   //google search mega millions, click megamillions
   let div = await driver.findElement(By.className('yuRUbf'))
   let t = await (await div.findElement(By.css('a'))).getAttribute('href')
   await driver.get(t)


   //from megamillions home page, targeted 'past winning number' to retrieve href, and navigate to it
   let homeWinnerBanner = await driver.findElement(By.className('homeWinnerLeft'))
   let pastWinningNumButton = await (await homeWinnerBanner.findElement(By.className('button fi btnPastWin'))).getAttribute('href')
   await driver.get(pastWinningNumButton)

  //from past winning page, select both date boxes with clicking
  let startDate = await (await driver.findElement(By.id('drawsStartDate'))).click()
  let dateBoxdropDown = await driver.findElement(By.css('#drawsStartDate_root > div > div > div > div > div.picker__header > select > option:nth-child(1)'))
  dateBoxdropDown.click();
  console.log(dateBoxdropDown.getAttribute('innerText'))
  
   //dateBoxdropDown.findElement()> .picker__select--year > option:nth-child(1)'))
  //dateBox.click()
  

})().then((t)=>{
    console.log(t);
}).catch((err)=>{
  console.log(err)
});

