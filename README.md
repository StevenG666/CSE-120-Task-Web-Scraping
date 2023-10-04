# CSE-120-Task-Web-Scraping

## Description
The repository is about implementing web scraping libraries that are native to Node.js to extract information about professional opportunities from various online websites, eventually store in the JSON files. Two libraries will be used to scrape data on three website examples.

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
