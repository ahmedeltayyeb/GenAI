import json
import re
from openai import OpenAI
from flask import Blueprint, jsonify, request
from flask_pymongo import PyMongo
from . import mongo

client = OpenAI()

cvgen = Blueprint('cvgen', __name__)

@cvgen.route("/latex", methods=["POST"])
def cvLatex():
    data = request.get_json()
    
    with open('/home/tiagogiraldez/Documents/GenAI/api/app/prompt.txt', 'r') as file:
        prompt = file.read()

    prompt += "\nMy information\n"
    prompt += "name: "+data.get("name")+"\n"
    prompt += "age: "+data.get("age")+"\n"
    prompt += "description: "+data.get("description")+"\n"
    prompt += "country: "+data.get("country")+"\n"
    prompt += "education: "+data.get("education")+"\n"
    prompt += "institution: "+data.get("institution")+"\n"
    prompt += "degree: "+data.get("degree")+"\n"
    prompt += "experience: "+data.get("experience")+"\n"
    prompt += "skills: "+data.get("skills")+"\n"
    prompt += "languages: "+data.get("languages")+"\n"

    prompt += "Job title: " + data.get("title")+"\n"
    prompt += "Company: " + data.get("company")+"\n"
    prompt += "Job posting: " + data.get("description_job")

    #print(prompt)

    escaped_prompt = json.dumps(prompt).strip('"')

    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "user",
                "content": escaped_prompt
            }
        ]
    )
    
    response = completion.choices[0].message.content

    latex_pattern = r"```latex\n(.*?)\n```"

    latex_content = re.search(latex_pattern, response, re.DOTALL)

    if latex_content:
        latex_text = latex_content.group(1).replace("\\\\", "\\")
        
        with open("/home/tiagogiraldez/Documents/GenAI/api/app/cv.tex", "w") as file:
            file.write(latex_text)            
        
        return jsonify({"latex": latex_text}), 200
    else:
        return jsonify({"error": "No LaTeX found"}), 400
    
@cvgen.route("/pdf", methods=["POST"])
def cvPdf():
    return ""
