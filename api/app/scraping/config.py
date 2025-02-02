from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

def selenium_config():
    '''
    Configuration to be able to use selenium.
    Important: change the path of the chrome driver.
    '''
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-notifications")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-popup-blocking")
    chrome_options.add_argument(
        "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    )

    # Define the path to your chromedriver
    # Download chrome driver from: https://googlechromelabs.github.io/chrome-for-testing/#stable, based on your version.
    #chromedriver_path = "/Users/ahmedeltayyeb/Downloads/chromedriver-mac-arm64/chromedriver"

    # Create a Service object
    #service = Service(chromedriver_path)

    # Initialize WebDriver with options and service
    #driver = webdriver.Chrome(service=service, options=chrome_options)

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

    return driver
