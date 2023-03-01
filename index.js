const puppeteer = require('puppeteer');
const fs = require('fs');
const {executablePath}=require('puppeteer')


let automation=async() => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/usr/bin/chromium-browser',
    // executablePath:executablePath(),
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
  console.log("New link")
  const ul = await (await page.evaluateHandle(`document.querySelector("body > info-view").shadowRoot.querySelector("div:nth-child(3) > ul")`)).asElement();
  const text = await page.evaluate((ul)=>{
    return Array.from(ul.children).map(li=>li.textContent)
  },ul)

  const webGPU=text.slice(-3)
  console.log(webGPU)
 await page.screenshot({ path: 'webgl-screenshot.png' });
  
  // Write the data to a file outside the Docker container
  // const filePath = 'images/webgl-screenshot.png'; // Replace with your desired file path
  // fs.writeFileSync(filePath, screenshotBuffer);
  console.log("writing done")
  await browser.close();
};
automation();