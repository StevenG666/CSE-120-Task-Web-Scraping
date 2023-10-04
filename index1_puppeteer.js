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
        "https://www.jpl.nasa.gov/edu/intern/apply/",
        {
            waitUntil: "domcontentloaded",
        }
    );

    try {
        // Select all tables within the specified class
        const parentDiv = await page.$(".wysiwyg_content");
        const tableHandles = await parentDiv.$$("table");
        
        // Initialize Data-Containing Array
        const allItems = [];

        // Loop through tables
        for (const tableHandle of tableHandles) {
            try {
                // Extract data from rows within each table
                const rows = await tableHandle.$$("tbody tr");

                // Loop through rows in a table
                for (const row of rows) {
                    // Make sure if name is valid, otherwise, move on
                    const nameElement = await row.$("td:nth-child(1) a");
                    if (nameElement) {
                    // Scrap the data
                    const name = await nameElement.evaluate((a) => a.innerText.trim());
                    const link = await nameElement.evaluate((a) => a.href);
                    const academicLevel = await row.$eval("td:nth-child(2)", (td) => td.textContent.trim());
                    const session = await row.$eval("td:nth-child(3)", (td) => td.textContent.trim());
                        // Store all data into the array
                        allItems.push({ name, link, academicLevel, session });
                    } else {
                        console.error("Name element not found in this row.");
                    }
                }
            } catch (error) {
                console.error("Error while extracting data from a table:", error.message);
            }
        }

        // Display the result in console
        console.log(allItems);

        // Save the result to JSON file
        const jsonData = JSON.stringify(allItems, null, 2);
        fs.writeFileSync("results1_puppeteer.json", jsonData, "utf-8", (err) => {
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


    /*
    try {
    price = await page.evaluate(
        (el) => el.querySelector(".a-price > .a-offscreen").textContent,
        producthandle
    );
    } catch (error) {}

    try {
    img = await page.evaluate(
        (el) => el.querySelector(".s-image").getAttribute("src"),
        producthandle
    );
    } catch (error) {}
    */