from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from config import selenium_config
from utils import save_to_json


def generate_url():
    # Get user input for job title and location
    user_job_title = input("Enter the job title to search for: ").replace(" ", "-").lower()
    user_location = input("Enter the location to search in: ").replace(" ", "-").lower()

    # Construct the URL
    base_url = "https://www.stepstone.de/work"
    search_url = f"{base_url}/{user_job_title}/in-{user_location}?radius=30&searchOrigin=Resultlist_top-search&rsearch=1"

    print(f"Searching URL: {search_url}")
    return search_url


def job_url_to_title(desired_url, json_path):
    driver = selenium_config()
    try:
        # Open the desired URL
        driver.get(desired_url)
        # Wait for the elements to load
        WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.CLASS_NAME, "res-1foik6i"))
        )
        # Get the url of the jobs in this page
        link_element = driver.find_elements(By.CLASS_NAME, "res-1foik6i")

        #Dict of url: title
        url_title = {}
        for link in link_element:
            job_link = link.get_attribute("href")
            job_title = link.find_element(By.CLASS_NAME, "res-nehv70")
            url_title[job_link] = job_title.text

        save_to_json(url_title, json_path)
        print(f"Scraped {len(url_title)} jobs. Results saved to 'data/url_title.json'.")

    finally:
        # Quit the browser
        driver.quit()