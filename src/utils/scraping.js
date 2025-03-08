const puppeteer = require("puppeteer");

(async () => {
  // Launch a new browser instance
  const browser = await puppeteer.launch();

  // Create a new page
  const page = await browser.newPage();

  // Navigate to the target website
  await page.goto("https://bet.hkjc.com/ch/marksix/results");

  // Scrape the desired data
  const pageTitle = await page.title();
  const pageContent = await page.content();

  // Log the scraped data
  console.log("Page Title:", pageTitle);
  console.log("Page Content:", pageContent);

  // Close the browser
  await browser.close();
})();
