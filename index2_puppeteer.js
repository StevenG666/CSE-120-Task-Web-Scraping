// Import library for Web Scraping and Write File
import fs from "fs"
import puppeteer from "puppeteer";
//const fs = require("fs");
//const puppeteer = require("puppeteer");

const getData = async () => {
    /* Launch the Chrome Browser with Details
    - don't display broswer
    - set window size to full screen
    - website remembers you
    */
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
        userDataDir: "./tmp",
    });

    // Open a new page to get page promise
    const page = await browser.newPage();

    // Go to the link
    await page.goto(
        "https://scholarships360.org/scholarships/stem-scholarships/",
        {
            waitUntil: "domcontentloaded",
        }
    );

    try {
        // Select all tables within the specified class
        const parentDiv = await page.$(".s360-post-scholarships-main-list.redesign");
        const divHandles = await parentDiv.$$("div");
        
        // Initialize Data-Containing Array
        const allItems = [];

        // Loop through tables
        for (const divHandle of divHandles) {
            try {
                
                // SCraping Data
                const name = await divHandle.$("div > div > h5 > a");
                if (name) {
                    // Name & Application Link
                    const nameText = await name.evaluate((a) => a.textContent.trim());
                    const linkText = await name.evaluate((a) => a.href)

                    // Platform Offered
                    const platOffer = await divHandle.$("div > div > p");
                    const platOfferText = await platOffer.evaluate((p) => p.textContent.trim());

                    // Award Amount
                    const award = await divHandle.$("div > div > div > div:nth-child(1) > div:nth-child(1) > span.re-scholarship-card-info-value")
                    const awardText = await award.evaluate((span) => span.textContent.trim());

                    // Deadline
                    const deadline = await divHandle.$("div > div > div > div:nth-child(1) > div:nth-child(2) > span.re-scholarship-card-info-value")
                    const deadlineText = await deadline.evaluate((span) => span.textContent.trim());

                    // Push all info into array
                    allItems.push({nameText, linkText, platOfferText, awardText, deadlineText});
                    
                } else {
                    console.error("Name element not found in this div.");
                }
            } catch (error) {
                console.error("Error while extracting data from a table:", error.message);
            }
        }

        // Display the result in console
        console.log(allItems);

        
        // Save the result to JSON file
        const jsonData = JSON.stringify(allItems, null, 2);
        fs.writeFileSync("results2_puppeteer.json", jsonData, "utf-8", (err) => {
            if (err) {
                console.error("Error appending data to the file:", err);
            } else {
                console.log("Data appended to results.json");
            }
        });
        
    } catch (error) {
        console.error("Error while scraping:", error.message);
    } finally {
        await browser.close();
    }
};

getData();