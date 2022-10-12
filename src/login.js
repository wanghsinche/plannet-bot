const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const { loginURL, myGroupURL } = require('./constant');

const login = async (notify) => {
  notify('try to login')
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setRequestInterception(true);
  page.on('request', request => {
    if (request.resourceType() === 'image' && request.url().startsWith('https://open.weixin.qq.com/connect/qrcode/')) {
        notify(request.url() + '  expired at 60s later')
    }
    request.continue()
  });
  await page.goto(loginURL);
  await page.screenshot({path: 'login.png'});
  
  await page.waitForSelector('.user-avatar', {timeout: 60000})

  await page.goto(myGroupURL)

  await page.screenshot({path: 'main.png'});
  
  const cookie = await page.cookies()
  
  const cookieStr = cookie.map(el=>`${el.name}=${el.value}`).join(';')
  
  notify('your cookie '+cookieStr)

  fs.writeFileSync(path.resolve(process.cwd(), 'cookie.txt'), cookieStr);

  await browser.close()
  notify('login successed')
};

module.exports = {
  login
}
