from .scraping_functions import generate_job_url_list, generate_url, job_url_to_title, job_url_to_content
from .config import selenium_config

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
        cnt = 0
        for link in job_links:
            contents[cnt] = job_url_to_content(link.get_attribute("href")
                           , driver, "data/job_content.json")
            cnt += 1;
        
        
        result = {}
        cnt = 0
        for title in titles.values():
            result[cnt] = {
                "title": title,
                "company": contents[cnt]["Company name"],
                "full_part": contents[cnt]["Full or Part time?"],
                "date": contents[cnt]["Date published"],
                "description": contents[cnt]["Content of job description"]
            }
            cnt += 1

        return result
    finally:
        driver.quit()

if __name__ == "__main__":
    scrape_job()
