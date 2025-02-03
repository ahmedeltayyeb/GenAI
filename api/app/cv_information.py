from flask import Blueprint, jsonify, request, session
from flask_pymongo import PyMongo
from . import mongo

cvinfo = Blueprint('cvinfo', __name__)

@cvinfo.route('/create', methods=['POST'])
def create_cv():
    data = request.get_json()
    user_id = data.get('user_id')

    if not user_id:
        return jsonify({"error": "Unauthorized. No user id provided"}), 401

    
    user_info = {
        "user_id": user_id,
        "name": 'default' if data.get('name') is None else data.get('name'),
        "age": '0'  if data.get('age') is None else data.get('age'),
        "description": 'default' if data.get('description') is None else data.get('description'),
        "country": 'default' if data.get('country') is None else data.get('country'),
        "education": 'default' if data.get('education') is None else data.get('education'),
        "institution": 'default' if data.get('institution') is None else data.get('institution'),
        "degree": 'default' if data.get('degree') is None else data.get('degree'),
        "experience": 'default' if data.get('experience') is None else data.get('experience'),
        "skills": 'default' if data.get('skills') is None else data.get('skills'),
        "languages": 'default' if data.get('languages') is None else data.get('languages'),
        "categories": 'default' if data.get('categories') is None else data.get('categories') 
    }

    # Insert CV data into the database
    cv_collection = mongo.db.cvInformations  # Access the 'cvInformations' collection
    
    cv_collection.delete_many({"user_id": user_id})

    cv_collection.insert_one(user_info)

    return jsonify({"message": "CV info added  successfully"}), 200

@cvinfo.route('/edit', methods=['PUT'])
def edit_cv():
    data = request.get_json()
    user_id = data.get('user_id')

    if not user_id:
        return jsonify({"error": "Unauthorized. No user id provided."}), 401

    # Get the updated CV data from the request
    update_data = {key: value for key, value in data.items() if key != 'user_id'}
   

    # Access the 'cvInformations' collection
    cv_collection = mongo.db.cvInformations

    # Find and update the CV data associated with the user
    result = cv_collection.update_one({"user_id": user_id}, {"$set": update_data})

    return jsonify({"message": "CV information updated successfully"}), 200

@cvinfo.route('/get', methods=['POST'])
def get_cv():
    data = request.get_json()
    user_id = data.get('user_id')

    cv_collection = mongo.db.cvInformations

    user = cv_collection.find_one({"user_id": user_id})
    user = {key: value for key, value in user.items() if key != '_id'}

    if user:
        return jsonify(user), 200
    else: return jsonify({"error": "User not found"}), 404
