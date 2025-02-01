from flask import Flask, request, Blueprint

scrape = Blueprint('scrape', __name__)

@scrape.route("/job", methods=['POST'])
def search_job():
    data = request.get_json()

