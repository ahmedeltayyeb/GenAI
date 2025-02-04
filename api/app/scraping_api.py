from flask import Flask, request, Blueprint, jsonify
from scraping.scrape_main import scrape_job

scrape = Blueprint('scrape', __name__)

@scrape.route("/job", methods=['POST'])
def search_job():
    input = request.get_json()
    content = scrape_job(input.get('search'), input.get('location'))
    return jsonify(content), 200

