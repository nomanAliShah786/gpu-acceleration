
const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
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
  console.log("New link")
  console.log("Takeing ss")

  const screenshotBuffer=await page.screenshot({ path: 'images/webgl-screenshot.png' });
  console.log("ss done")
  
  // Write the data to a file outside the Docker container
  const filePath = 'images/webgl-screenshot.png'; // Replace with your desired file path
  fs.writeFileSync(filePath, screenshotBuffer);
  console.log("writing done")
  
  // await page.waitForTimeout(100000);
await browser.close();
})();