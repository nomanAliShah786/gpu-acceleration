const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser',
    args: [
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
      '--enable-features=WebGL2ComputeRenderingContext',
      '--use-gl=desktop',
      '--ignore-gpu-blacklist',
      '--enable-webgl',
      '--enable-webgl2'
    ],
  });

  const page = await browser.newPage();

  // navigate to a webpage that uses WebGL or WebGL2
  await page.goto('https://webglreport.com/?v=1');
  // await page.waitForTimeout(1500)
  // take a screenshot to confirm WebGL and WebGL2 are enabled
  await page.screenshot({ path: 'webgl1.png' });

  // grab the class text and display it
  const classText = await page.$eval('.header', el => el.textContent);
  console.log(`Status: ${classText}`);

  // navigate to a webpage that uses WebGL or WebGL2
  await page.goto('https://webglreport.com/?v=2');
  // await page.waitForTimeout(1000)
  await page.screenshot({ path: 'webgl2.png' });

  // grab the class text and display it
  const classText2 = await page.$eval('.header', el => el.textContent);
  console.log(`Status: ${classText2}`);

  await browser.close();
})();
