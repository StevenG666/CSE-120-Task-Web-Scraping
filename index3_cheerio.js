import * as cheerio from 'cheerio';
import axios from "axios";
import fs from "fs";

// The URL of Google's internship listings page
const url = 'https://www.themuse.com/search/';

// Function to fetch and scrape the data
async function ScrapeData() {
  try {
    const response = await axios.get(url);

    // Load the HTML content into Cheerio
    const $ = cheerio.load(response.data);

    // Select the elements containing internship listings
    const divs = $('#main-content > article > div > div');

    // Create an array to store the results
    const internships = [];

    // Iterate through each internship listing
    divs.each((index, element) => {
        // Title
        const title = $(element).find("div > div.JobCard_contentContainer__afyc1 > div:nth-child(2) > h2");
        const titleText = title.text().trim();

        // Application and Description Link
        const applink = $(element).find("div > div.JobCard_linkContainer__VX4kk > a:nth-child(1)");
        const applinkText = applink.attr('href');
        const deslink = $(element).find("div > div.JobCard_linkContainer__VX4kk > a:nth-child(2)");
        const deslinkText = deslink.attr('href');

        // Company Name and Location
        const NameLocate = $(element).find("div > div.JobCard_contentContainer__afyc1 > div:nth-child(2) > div.JobCard_companyLocation__KBfg2");
        const NameLocateText = NameLocate.text().trim();

    // Format the data into the Array
    internships.push({
        title: titleText,
        applicationLink: applinkText,
        descriptionLink: deslinkText,
        CompanyNameLocation: NameLocateText
        });
    });   
    
    // Print out the result
    console.log(internships)

    // Save result into JSON file
    const jsonData = JSON.stringify(internships, null, 2);
    fs.writeFileSync("results3_cheerio.json", jsonData, "utf-8", (err) => {
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