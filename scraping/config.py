from selenium import webdriver
from selenium.webdriver.chrome.service import Service


def selenium_config():
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument(
        "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    )

    # Define the path to your chromedriver
    chromedriver_path = "/Users/ahmedeltayyeb/Desktop/chromedriver"

    # Create a Service object
    service = Service(chromedriver_path)

    # Initialize WebDriver with options and service
    driver = webdriver.Chrome(service=service, options=chrome_options)

    return driver