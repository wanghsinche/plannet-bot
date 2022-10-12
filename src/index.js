const puppeteer = require('puppeteer');
const { loginURL } = require('./constant');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setRequestInterception(true);
  let qrcodeURL = null
  page.on('request', request => {
    if (request.resourceType() === 'image' && request.url().startsWith('https://open.weixin.qq.com/connect/qrcode')) {
        qrcodeURL = request.url()
    }
  });
  await page.goto(loginURL);
  
  await page.screenshot({path: 'example.png'});
  
  console.log(qrcodeURL)

  await page.waitForNavigation()
  await page.screenshot({path: 'example2.png'});


})();

