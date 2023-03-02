const fs = require('fs');
const puppeteer = require('puppeteer');
const { executablePath } = require('puppeteer')
let automation = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/usr/bin/chromium-browser',
    args: [
      '--enable-software-rasterizer',
      '--enable-features=WebGL2ComputeRenderingContext',
      '--no-sandbox',
      '--enable-gpu-sandbox',
      '--enable-dev-shm-usage',
      '--enable-gl-drawing-for-tests',
      '--use-gl=egl',
    ]
  });
  console.log("Opening new page")
  const page = await browser.newPage();

  await page.goto('chrome://gpu');
  console.log("Opening link")
  const ul = await (await page.evaluateHandle(`document.querySelector("body > info-view").shadowRoot.querySelector("div:nth-child(3) > ul")`)).asElement();
  const text = await page.evaluate((ul) => {
    return Array.from(ul.children).map(li => li.textContent)
  }, ul)
  const webGPU = text.slice(-3)
  console.log(`Status: `)
  console.log(webGPU)
  await page.screenshot({ path: 'webgl-screenshot.png' });
  await browser.close();
};
automation();