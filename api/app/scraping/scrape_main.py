from scraping import generate_job_url_list, generate_url, job_url_to_title, job_url_to_content
from config import selenium_config

PARAMETER_FILE = "params.yaml"


def scrape_job(search, location):
    driver = selenium_config()
    try:
        url = generate_url(search, location)
        job_links = generate_job_url_list(url, driver)
        titles = job_url_to_title(job_links, "data/url_title.json")

        # URL will be based on the url of the job, which the user wants to generate a cv for.
        # This should only be for the LLM whihc generates the CV.
        # Url used is just for testing
        contents = {}
        
        for i in range(len(titles)):
            contents[i] = job_url_to_content(titles[i]
                           , driver, "data/job_content.json")
        
        
        result = {}
        for i in range(len(titles)):
            result[i] = {
                "title": contents[i]["Company name"],
                "company": contents[i]["Company name"],
                "full_part": contents[i]["Full or Part time?"],
                "date": contents[i]["Date published"],
                "description": contents[i]["Content of job description"]
            }

        return result
    finally:
        driver.quit()

if __name__ == "__main__":
    scrape_job()
