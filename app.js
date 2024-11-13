const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = 3000;

// const axios = require("axios");
const cheerio = require("cheerio");
const axios =require("axios")
async function fetchSportsNews() {
    try {
        const response = await axios.get("https://indianexpress.com/section/sports/");
        const html = response.data;
        const $ = cheerio.load(html);

        const articles = [];
        $(".articles").each((index, element) => {
            const title = $(element).find(".title").text();
            const p = $(element).find("p").text();
            

            articles.push({ title,p});
        });

        return articles;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}






// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Define a route to render the scraped news
app.get('/', async (req, res) => {
  const url = "https://indianexpress.com/section/sports/";

  // Scrape data
  const articles=await fetchSportsNews();
 
 

  

  // Render the 'index' template with articles data
  res.render('index', { articles });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
