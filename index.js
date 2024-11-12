const puppeteer = require("puppeteer");

const url = "https://indianexpress.com/section/sports/";

const main = async () => {
  console.log("loading browser");
  const browser = await puppeteer.launch();
  console.log("loading pages");
  const page = await browser.newPage();
  console.log("hitting url");

  await page.goto(url, { waitUntil: 'domcontentloaded' });
  console.log("page loaded");

  // Wait for the first article element to appear on the page
  await page.waitForSelector('article h2');

  const allArticles = await page.evaluate(() => {
    const articles = document.querySelectorAll('article');
    return Array.from(articles).slice(0, 3).map((article) => {
      const title = article.querySelector('img-context').querySelector('h2').innerText;
      const url = article.querySelector('img-context').querySelector('p').textContent; 
      return { title, url };
    });
  });

  console.log(allArticles);

  await browser.close();
};

main();
