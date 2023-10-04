# CSE-120-Task-Web-Scraping

## Description
The repository is about implementing web scraping libraries that are native to Node.js to extract information about professional opportunities from various online websites, eventually stored in the JSON files. Two libraries will be used to scrape data on three website examples.

## Processes of Execution of the Project
### (Currently Only) Puppeteer Library
1. Open a node.js file in an IDE (ie. VS Code)
2. Make sure the package.json file is in the same directory as the node.js file
3. Navigate to the current working directory through CLI/terminal
4. type "node {name}.js" in the terminal
5. Expected Behaviors:
   1. The file will launch and open a Google Chrome browser with the corresponding website content and close immediately
   2. The information is scraped from outside sources and displays the nested structures of relevant data in the terminal window
   3. It will create a new JSON file containing all the data if there isn't one in the directory. Otherwise, it will rewrite the data
   4. NOTE: one file only extracts data from one website and stores it in a separate JSON file. 

## Website Example Details
### Example 1: NASA Jet Propulsion Laboratory Internship: https://www.jpl.nasa.gov/edu/intern/apply
#### Relevant Data Extracted (Format: JSON variable name --> actual meaning:
- name --> title of internship
- link --> application link to internship
- academic level --> academic level (undergraduate/graduate)
- session --> time of internship program

### Example 2: Top 142 STEM Scholarship in October 2023: https://scholarships360.org/scholarships/stem-scholarships/
#### Relevant Data Extracted (Format: JSON variable name --> actual meaning:
- nameText --> title of scholarship
- linkText --> application link to scholarship
- platOfferText --> scholarship platform
- awardText --> scholarship award amount
- deadlineText --> deadline of the application

### Example 3: The Muse Job Search Website: https://www.themuse.com/search/
#### Relevant Data Extracted (Format: JSON variable name --> actual meaning:
- titleText --> title of job
- appLinkText --> application link to the job
- desLinkText --> job description link about the job
- NameLocateText --> name of the company AND location of the company

## Ethical Considerations
- DID NOT extract a tremendous amount of data which potentially affects the performance of website servers.
- Extracted the information only for educational purposes.
- The JSON data contained only public information, there was no personal/sensitive data.
