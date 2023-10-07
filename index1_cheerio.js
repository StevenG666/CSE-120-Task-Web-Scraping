import * as cheerio from 'cheerio';
import axios from "axios";
import fs from "fs";

// The URL of Google's internship listings page
const url = 'https://www.jpl.nasa.gov/edu/intern/apply/';

// Function to fetch and scrape the data
async function ScrapeData() {
  try {
    const response = await axios.get(url);

    // Load the HTML content into Cheerio
    const $ = cheerio.load(response.data);

    // Select the elements containing internship listings
    const tables = $('.wysiwyg_content > table');

    // Create an array to store the results
    const internships = [];

    // Iterate through each internship listing
    tables.each((index, element) => {
      //const titleElement = $(element).find('.gc-card__title');
      //const linkElement = titleElement.find('a');

      const rows = $('tbody > tr');

      rows.each((r_index, r_element) => {
        // Title & Link
        const title = $(r_element).find('td:nth-child(1) > a'); 
        const titleText = title.text().trim();
        const linkText = title.attr('href');

        // Academic Level
        const academiclevel = $(r_element).find("td:nth-child(2)");
        const academicText = academiclevel.text().trim();

        // Session
        const session = $(r_element).find("td:nth-child(3)");
        const sessionText = session.text().trim();

        // Format data into the array
        internships.push({
          title:titleText,
          link:linkText,
          Alevel: academicText,
          session: sessionText
        });
      });
    });
    
    for(let i=0; i<internships.length; i++){
      internships[i].title = internships[i].title.split('\n')[0];
      console.log(internships[i].title);
    }
    
    // Print out the result
    console.log(internships)
    
    // Save result into the JSON file
    const jsonData = JSON.stringify(internships, null, 2);
    fs.writeFileSync("results1_cheerio.json", jsonData, "utf-8", (err) => {
        if (err) {
            console.error("Error appending data to the file:", err);
        } else {
            console.log("Data appended to results.json");
        }
      })
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Call the scraping function
ScrapeData();
