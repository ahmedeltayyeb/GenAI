from flask import Flask, request, jsonify, Blueprint,session
from flask_pymongo import PyMongo
from . import mongo

auth = Blueprint('auth', __name__)

# Signup Route
@auth.route('/signup', methods=['POST'])
def signup():
    users_collection = mongo.db.users  # Access the 'users' collection
    data = request.get_json()  # Get JSON data from the request
    username = data.get('username')
    password = data.get('password')

    # Validate input
    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    # Check if the user already exists
    if users_collection.find_one({"username": username}):
        return jsonify({"error": "User already exists"}), 409

    # Insert the new user into the database without hashing the password
    result = users_collection.insert_one({"username": username, "password": password})
    user_id = str(result.inserted_id)

    return jsonify({"message": "User signed up successfully", "user_id": user_id}), 200


# Login Route
@auth.route('/login', methods=['POST'])
def login():
    users_collection = mongo.db.users  # Access the 'users' collection
    data = request.get_json()  # Get JSON data from the request
    username = data.get('username')
    password = data.get('password')

    # Validate input
    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    # Check if the user exists
    user = users_collection.find_one({"username": username})
    if not user:
        return jsonify({"error": "Invalid username or password"}), 401

    # Verify the password (simple comparison)
    if user['password'] != password:
        return jsonify({"error": "Invalid username or password"}), 401


    return jsonify({"user_id": str(user['_id'])}), 200

@auth.route('/delete_account', methods=['DELETE'])
def delete_account():
    
    data = request.get_json()
    user_id = data.get('user_id')

    if not user_id:
        return jsonify({"error": "Unauthorized. Please log in first."}), 401

    users_collection = mongo.db.users  # Access the 'users' collection
    cv_collection = mongo.db.cvInformations  # Access the 'cvInformations' collection

    # Delete user account
    users_collection.delete_one({"_id": user_id})
    
    # Optionally, delete the user's CV information
    cv_collection.delete_many({"user_id": user_id})

    return jsonify({"message": "Account deleted successfully"}), 200    
