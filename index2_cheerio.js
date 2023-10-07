import * as cheerio from 'cheerio';
import axios from "axios";
import fs from "fs";

// The URL of Google's internship listings page
const url = 'https://scholarships360.org/scholarships/stem-scholarships/';

// Function to fetch and scrape the data
async function ScrapeData() {
  try {
    const response = await axios.get(url);

    // Load the HTML content into Cheerio
    const $ = cheerio.load(response.data);

    // Select the elements containing internship listings
    const divs = $('.s360-post-scholarships-main-list.redesign > div');

    // Create an array to store the results
    const internships = [];

    // Iterate through each internship listing
    divs.each((index, element) => {
        // Title & Link
        const title = $(element).find("div > div > h5 > a");
        const titleText = title.text().trim();
        const linkText = title.attr('href');

        // Platform Offered
        const platOffer = $(element).find("div > div > p");
        const platOfferText = platOffer.text().trim();

        // Award Amount
        const award = $(element).find("div > div > div > div:nth-child(1) > div:nth-child(1) > span.re-scholarship-card-info-value");
        const awardText = award.text().trim();

        // Deadline
        const deadline = $(element).find("div > div > div > div:nth-child(1) > div:nth-child(2) > span.re-scholarship-card-info-value");
        const deadlineText = deadline.text().trim();

    // Format the data to the Array
    internships.push({
        title: titleText,
        link: linkText,
        platOffer: platOfferText,
        award: awardText,
        deadline: deadlineText
        });
    });   

    // Print out the result
    console.log(internships)

    // Save result into the JSON file
    const jsonData = JSON.stringify(internships, null, 2);
    fs.writeFileSync("results2_cheerio.json", jsonData, "utf-8", (err) => {
          if (err) {
              console.error("Error appending data to the file:", err);
          } else {
              console.log("Data appended to results.json");
          }
      });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Call the scraping function
ScrapeData();
