from scraping import generate_job_url_list, generate_url, job_url_to_title, job_url_to_content
from config import selenium_config

PARAMETER_FILE = "params.yaml"


def scrape_job():
    driver = selenium_config()
    try:
        url = generate_url()
        job_links = generate_job_url_list(url, driver)
        title = job_url_to_title(job_links, "data/url_title.json")

        # URL will be based on the url of the job, which the user wants to generate a cv for.
        # This should only be for the LLM whihc generates the CV.
        # Url used is just for testing
        content = job_url_to_content("https://www.stepstone.de/jobs--Cloud-Software-Engineer-IoT-Data-Streaming-for-AI-m-w-d-m-f-d-Heilbronn-Schwarz-Corporate-Solutions--11657118-inline.html"
                           , driver, "data/job_content.json")
        
        return {
            "title": title,
            "company": content["Company name"],
            "full_part": content["Full or Part time?"],
            "date": content["Date published"],
            "description": content["Content of job description"]
        }
    finally:
        driver.quit()

if __name__ == "__main__":
    scrape_job()
