# import yaml
from scraping import job_url_to_title, generate_url

PARAMETER_FILE = "params.yaml"


def main():
    # with open(PARAMETER_FILE, "r") as file:
    #     params = yaml.safe_load(file)

    url = generate_url()
    job_url_to_title(url, "data/url_title")


if __name__ == "__main__":
    main()
