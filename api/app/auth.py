from flask import Flask, request, jsonify, Blueprint,session
from flask_pymongo import PyMongo

app = Flask(__name__)

# MongoDB Configuration
app.config["MONGO_URI"] = "mongodb://localhost:27017/GenAi"  # Replace with your MongoDB URI if using Atlas
app.secret_key = "your_secret_key"  # Required for session management
mongo = PyMongo(app)

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

    return jsonify({"message": "User signed up successfully", "user_id": user_id}), 201


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

    # Retrieve the user ID
    session['user_id'] = str(user['_id'])


    return jsonify({"message": f"Welcome, {username}!"}), 200

@auth.route('/create', methods=['POST'])
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
@auth.route('/edit_cv', methods=['PUT'])
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

@auth.route('/logout', methods=['POST'])
def logout():
    # Clear the session
    session.clear()
    return jsonify({"message": "Logged out successfully"}), 200
@auth.route('/delete_account', methods=['DELETE'])
def delete_account():
    # Get user_id from session
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"error": "Unauthorized. Please log in first."}), 401

    users_collection = mongo.db.users  # Access the 'users' collection
    cv_collection = mongo.db.cvInformations  # Access the 'cvInformations' collection

    # Delete user account
    users_collection.delete_one({"_id": user_id})
    # Optionally, delete the user's CV information
    cv_collection.delete_many({"user_id": user_id})

    # Clear the session after account deletion
    session.clear()
    return jsonify({"message": "Account deleted successfully"}), 200    
# Register Blueprint
app.register_blueprint(auth)

if __name__ == '__main__':
    app.run(debug=True)
