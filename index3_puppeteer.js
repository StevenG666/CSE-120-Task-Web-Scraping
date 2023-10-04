// Import library for Web Scraping and Write File
import fs from "fs"
import puppeteer from "puppeteer";

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
        "https://www.themuse.com/search/",
        {
            waitUntil: "domcontentloaded",
        }
    );

    try {
        // Select all tables within the specified class
        const tableHandles = await page.$$("#main-content > article > div > div");

        // Initialize Data-Containing Array
        const allItems = [];

        // Loop through tables
        for (const tableHandle of tableHandles) {
            try {
                // Scraping Data
                const title = await tableHandle.$("div > div.JobCard_contentContainer__afyc1 > div:nth-child(2) > h2");
                if(title) {
                    // Name
                    const titleText = await title.evaluate((h2) => h2.textContent.trim());

                    // Application Link
                    const appLink = await tableHandle.$("div > div.JobCard_linkContainer__VX4kk > a:nth-child(1)");
                    const appLinkText = await appLink.evaluate((a) => a.href)
                    
                    // Job Description Link 
                    const desLink = await tableHandle.$("div > div.JobCard_linkContainer__VX4kk > a:nth-child(2)");
                    const desLinkText = await desLink.evaluate((a) => a.href)

                    // Company Name & Location
                    const NameLocate = await tableHandle.$("div > div.JobCard_contentContainer__afyc1 > div:nth-child(2) > div.JobCard_companyLocation__KBfg2");
                    const NameLocateText = await NameLocate.evaluate((div) => div.textContent.trim());


                    /*
                    const linkText = await title.evaluate((a) => a.href);
                    
                    // Organization
                    const org = await tableHandle.$("td:nth-child(3)");
                    const orgText = await org.evaluate((td) => td.textContent.trim());

                    // Program
                    const program = await tableHandle.$("td:nth-child(4)");
                    const programText = await program.evaluate((td) => td.textContent.trim());

                    // Location
                    const location = await tableHandle.$("td:nth-child(5)");
                    const locationText = await location.evaluate((td) => td.textContent.trim());
                    */

                    // Push all info into array 
                    allItems.push({titleText, appLinkText, desLinkText, NameLocateText});

                } else {
                    console.error("ID element not found in this div.");
                }
            } catch (error) {
                console.error("Error while extracting data from a table:", error.message);
            }
        }

        // Display the result in console
        console.log(allItems);

        
        // Save the result to JSON file
        const jsonData = JSON.stringify(allItems, null, 2);
        fs.writeFileSync("results3_puppeteer.json", jsonData, "utf-8", (err) => {
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