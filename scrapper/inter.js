const puppeteer = require('puppeteer');

async function run() {
  let account = "123";

    const browser = await puppeteer.launch({
        headless: false
      });
    const page = await browser.newPage();

    await page.goto('https://internetbanking.bancointer.com.br/login.jsf');

    await page.click('#loginv20170605');
    await page.keyboard.type(account);
    
    await page.click('#panelPrincipal > div.grid-40.mobile-grid-50.tablet-grid-40 > input')

    await page.waitForSelector('#panelGeralv20170605 > div.grid-30.mobile-grid-100.tablet-grid-50.topo20.topo30-tablet > h1 > a');

    await page.click('#panelGeralv20170605 > div.grid-30.mobile-grid-100.tablet-grid-50.topo20.topo30-tablet > h1 > a');
    

    await page.waitForSelector("#tecladoNormal div input[value='a']");
    

    await page.click("#tecladoNormal > div.grid-100.mobile-grid-100.tablet-grid-100.grid-parent.prefix-10.tablet-prefix-10.mobile-prefix-10 > input:nth-child(1)");

    await page.waitForSelector("#tecladoNormal div input[value='J']");
    await page.click("#tecladoNormal div input[value='J']");


    await page.click("#j_idt52");
    

    // await page.click('#input_001');
    // await page.keyboard.type('');
    
    // await page.click('body > navigation-base > div.appbody > div > main > div.nu-box.ng-scope > div > div.form-group.credentials > form > button');
    

    // console.log(await page.content());
    // await page.screenshot({path: 'screenshot.png'});


    // let listLength = await page.evaluate((sel) => {
    //     return document.querySelector(sel).innerText.trim();
    //   }, '#acc_body > div.wrapper > div.site_wrapper.account__wrapper > main > div > section.userposts-header > nav > ul > li.tabs-menu__item.tabs-menu__item--is-active.published');


    //   console.log(listLength);
  browser.close();
}

run();