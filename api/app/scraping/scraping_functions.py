import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from .utils import save_to_json


def generate_url(user_job_title, user_location):
    '''
    generates a url based on the user input for the job title and location
    '''

    # Construct the URL
    base_url = "https://www.stepstone.de/work"
    search_url = f"{base_url}/{user_job_title}/in-{user_location}?radius=30&searchOrigin=Resultlist_top-search&rsearch=1"
    print(f"Searching URL: {search_url}")
    return search_url


def generate_job_url_list(desired_url, driver):
    '''
    takes the desired_url from generate_url() and returns the top 25 search results
    '''
    # Open the desired URL
    driver.get(desired_url)
    # Wait for the elements to load
    WebDriverWait(driver, 25).until(
        EC.presence_of_all_elements_located((By.CLASS_NAME, "res-1foik6i"))
    )
    # Get the url of the jobs in this page
    link_elements = driver.find_elements(By.CLASS_NAME, "res-1foik6i")

    links = []
    for link in link_elements:
         links.append(link.get_attribute("href"))
    return {"links": links, "link_elements": link_elements}


def job_url_to_title(job_links, json_path):
        '''
        Takes the link_elements from generate_job_url_list() and returns the job titles with the urls of the jobs in a json file
        '''
        #Dict of url: title
        url_title = {}
        for link in job_links:
            job_link = link.get_attribute("href")
            job_title = link.find_element(By.CLASS_NAME, "res-nehv70")
            url_title[job_link] = job_title.text

        #save_to_json(url_title, json_path)
        print(f"Scraped {len(url_title)} jobs. Results saved to 'data/url_title.json'.")
        return url_title

def job_url_to_content(job_link, driver, json_path):
    '''
    Takes the link of the job which the user wants to generate the CV and/or cover letter for and produces an output whihc could be used by the LLM
    '''
    print(job_link)
    try:
        driver.get(job_link)
    except:
        print(f"Error navigating to URL: {job_link}")

    # Wait for the elements to load
    WebDriverWait(driver, 20).until(
        EC.presence_of_all_elements_located((By.CLASS_NAME, "job-ad-display-11k0r7z"))
    )
    

    # Scrape job details
    #company_name = driver.find_element(By.CSS_SELECTOR, "#JobAdContent > div > div > div > div > div > div > div > div.js-listing-header.job-ad-display-kyg8or > article > div > div.job-ad-display-n10qeq > div > div.job-ad-display-1t26un2 > div > ul > li.at-listing__list-icons_company-name.job-ad-display-1f4i9zs > a > span.job-ad-display-11k0r7z > span").text
    #full_part = driver.find_element(By.CSS_SELECTOR, "#JobAdContent > div > div > div > div > div > div > div > div.js-listing-header.job-ad-display-kyg8or > article > div > div.job-ad-display-n10qeq > div > div.job-ad-display-1t26un2 > div > ul > li.at-listing__list-icons_work-type.job-ad-display-1f4i9zs > span > span.job-ad-display-11k0r7z > span").text
    #published = driver.find_element(By.CSS_SELECTOR,"#JobAdContent > div > div > div > div > div > div > div > div.js-listing-header.job-ad-display-kyg8or > article > div > div.job-ad-display-n10qeq > div > div.job-ad-display-1t26un2 > div > ul > li.at-listing__list-icons_date.job-ad-display-1f4i9zs > span > span.job-ad-display-11k0r7z > span").text
    #published = published[11:]
    company_name = ""
    full_part = ""
    date = ""
    try:
        company_name = WebDriverWait(driver, 3).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, "#JobAdContent > div > div > div > div > div > div > div > div.js-listing-header.job-ad-display-kyg8or > article > div > div.job-ad-display-n10qeq > div > div.job-ad-display-1t26un2 > div > ul > li.at-listing__list-icons_company-name.job-ad-display-1f4i9zs > a > span.job-ad-display-11k0r7z > span"))
        ).text
    except: print("Error pulling the company name")
    
    try:
        full_part = WebDriverWait(driver, 3).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, "#JobAdContent > div > div > div > div > div > div > div > div.js-listing-header.job-ad-display-kyg8or > article > div > div.job-ad-display-n10qeq > div > div.job-ad-display-1t26un2 > div > ul > li.at-listing__list-icons_work-type.job-ad-display-1f4i9zs > span > span.job-ad-display-11k0r7z > span"))
        ).text
    except: print("Error pulling the full/part time")

    try:
        date = WebDriverWait(driver, 3).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, "#JobAdContent > div > div > div > div > div > div > div > div.js-listing-header.job-ad-display-kyg8or > article > div > div.job-ad-display-n10qeq > div > div.job-ad-display-1t26un2 > div > ul > li.at-listing__list-icons_date.job-ad-display-1f4i9zs > span > span.job-ad-display-11k0r7z > span"))
        ).text
        date = date[11:]
    except: print("Error pulling the publish date")

    # Scrape the job description
    spans = driver.find_elements(By.CLASS_NAME, "job-ad-display-1cat3iu")
    all_texts = [span.text for span in spans]
    content = "\n".join(all_texts)

    content_dict = {
        "url": job_link,
        "Company name" : company_name,
        "Full or Part time?" : full_part,
        "Date published" : date,
        "Content of job description": content
    }

    #save_to_json(content_dict, json_path)
    return content_dict
