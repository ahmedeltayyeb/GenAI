from flask import Blueprint, jsonify, request, session
from flask_pymongo import PyMongo
from . import mongo

cvinfo = Blueprint('cvinfo', __name__)

@cvinfo.route('/create', methods=['POST'])
def create_cv():
    # Get user_id from session
    user_id = session.get('user_id')
    if not user_id:
        # If user_id is not in session, redirect to login
        return jsonify({"error": "Unauthorized. Please log in first.", "user_id": user_id}), 401

    # Get CV data from the request
    data = request.get_json()

    

    # Add the user_id to the CV data

    # Insert CV data into the database
    cv_collection = mongo.db.cvInformations  # Access the 'cvInformations' collection
    cv_collection.insert_one(data)

    return jsonify({"message": "CV created successfully"}), 201
@cvinfo.route('/edit_cv', methods=['PUT'])
def edit_cv():
    # Get user_id from session
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"error": "Unauthorized. Please log in first."}), 401

    # Get the updated CV data from the request
    data = request.get_json()

    # Validate the input data
   

    # Access the 'cvInformations' collection
    cv_collection = mongo.db.cvInformations

    # Find and update the CV data associated with the user
    result = cv_collection.update_one({"user_id": user_id}, {"$set": data})

    

    return jsonify({"message": "CV information updated successfully"}), 200