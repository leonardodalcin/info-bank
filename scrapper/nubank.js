const puppeteer = require('puppeteer');
const fs = require('fs');

async function run() {
    const browser = await puppeteer.launch({
        headless: false
      });

    const page = await browser.newPage();

    const cpf = "123";
    const password = "123";

    await page.goto('https://conta.nubank.com.br/#/login');
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.87 Safari/537.36');

    await page.click('#username');
    await page.keyboard.type(cpf);

    await page.click('#input_001');
    await page.keyboard.type(password);

    await page.click('body > navigation-base > div.appbody > div > main > div.nu-box.ng-scope > div > div.form-group.credentials > form > button');

    let selectorImage = 'body > navigation-base > div.appbody > div > main > div.nu-box.ng-scope.qr-scan > div > div.mfa.qr-scan > div.qr-field > div.qr-code > img';
    await page.waitForSelector(selectorImage);




    
    

    // const parseDataUrl = (dataUrl) => {
    //     const matches = dataUrl.match(/^data:(.+);base64,(.+)$/);
    //     if (matches.length !== 3) {
    //       throw new Error('Could not parse data URL.');
    //     }
    //     return { mime: matches[1], buffer: Buffer.from(matches[2], 'base64') };
    //   };

    // const getDataUrlThroughCanvas = async (selector) => {
    //     // Create a new image element with unconstrained size.
    //     const originalImage = document.querySelector(selector);
    //     const image = document.createElement('img');
    //     image.src = originalImage.src;
      
    //     // Create a canvas and context to draw onto.
    //     const canvas = document.createElement('canvas');
    //     const context = canvas.getContext('2d');
    //     canvas.width = image.width;
    //     canvas.height = image.height;
      
    //     // Ensure the image is loaded.
    //     await new Promise((resolve) => {
    //       if (image.complete || (image.width) > 0) resolve();
    //       image.addEventListener('load', () => resolve());
    //     });
      
    //     context.drawImage(image, 0, 0);
    //     return canvas.toDataURL();
    //   };

    // try {
    //   const dataUrl = await page.evaluate(getDataUrlThroughCanvas, selectorImage);
    //   const { buffer } = parseDataUrl(dataUrl);
    //   fs.writeFileSync('qr-code-auth.png', buffer, 'base64');
    // } catch (error) {
    //   console.log(error);
    // }

    browser.close();
}

run();