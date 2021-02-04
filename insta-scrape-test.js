/* RESOURCES 
https://www.reddit.com/r/learnpython/comments/bdpjz1/is_it_possible_to_scrape_instagram_comments_for/
https://www.bestproxyreviews.com/instagram-scraper/
https://stackoverflow.com/questions/59824750/scraping-all-comments-under-an-instagram-post 
https://github.com/arc298/instagram-scraper
https://stackoverflow.com/questions/26400943/selenium-webdriver-how-to-select-records-from-table-by-fetching-excel-input?rq=1
https://stackoverflow.com/questions/41405697/how-to-extract-instagram-data

https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_By.html

https://www.youtube.com/watch?v=iJGvYBH9mcY&ab_channel=PythonSimplified



SLEEP
https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/ie_exports_Driver.html#sleep
  Ex.   await driver.sleep(5000)


  Attribute selectors
  5.8 Attribute selectors
CSS 2.1 allows authors to specify rules that match elements which have certain attributes defined in the source document.
https://www.w3.org/TR/CSS2/selector.html#adjacent-selectors

*/




const {By,Builder,Key,util,withTagName,cssSelector,Select, WebDriver,until} = require('selenium-webdriver');
const { elementIsDisabled } = require('selenium-webdriver/lib/until');

(async() =>{
    let driver = await new Builder().forBrowser('chrome').build();
  
    await driver.get('https://instagram.com');
    await driver.sleep(2000)

    const username = await driver.wait(until.elementLocated(By.name('username')),3000);
    username.sendKeys('bhurnalcodes') 
    
    const password = await driver.wait(until.elementLocated(By.name('password')),5000);
    password.sendKeys('s15koukie39') 

    await driver.sleep(2000)
    const loginButton = await driver.wait(until.elementLocated(By.className('sqdOP  L3NKy   y3zKF')),3000);
    loginButton.click();

    //to clear save login info by clicking "not now"
    await driver.sleep(2000)
    const saveLoginInfoButton =  await driver.wait(until.elementLocated(By.className('cmbtv')),3000);
    await saveLoginInfoButton.click();

    //to clear turn on post notif button
    await driver.sleep(2000)
    const postNotifButton =  await driver.wait(until.elementLocated(By.className('aOOlW   HoLwm ')),3000);
    await postNotifButton.click();
    

    //once logged in, go directly to celeb profile via url. 
    /* The other option here is the manually enter the celebs name in the search bar and click the first result. I tried this and it was tricky 
        This was the code. It would enter the celeb name and then hit enter, then enter again, this would go to the actual celebs page

            // const searchButton =  await driver.wait(until.elementLocated(By.className('XTCLo x3qfX')));
            // await searchButton.sendKeys('Kim Kardashian',Key.RETURN)
            // driver.sleep(1000)
            // await searchButton.sendKeys(Key.RETURN)
            // //await searchButton.sendKeys(Key.RETURN)
            // //await searchButton.sendKeys(Key.RETURN)
    */
    await driver.sleep(3000)
    await driver.get('https://www.instagram.com/kimkardashian/');
    

    //clicking first post
    await driver.sleep(2000)
    const z = await driver.findElement(By.css('#react-root > section > main > div > div._2z6nI > article > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(1)'))
    z.click()
    

    //clicking load more
    await driver.sleep(2300)
    const loadMore = await driver.findElement(By.xpath('/html/body/div[5]/div[2]/div/article/div[3]/div[1]/ul/li/div'))
    loadMore.click();

    await driver.sleep(2300)
    loadMore.click();
  
    await driver.sleep(2300)
    loadMore.click();

    await driver.sleep(2300)
    loadMore.click();





 
    
  
})().then((t)=>{
    console.log(t);
}).catch((err)=>{
  console.log(err)
});

