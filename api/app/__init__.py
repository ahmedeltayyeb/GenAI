from flask import Flask
from flask_pymongo import PyMongo

mongo = PyMongo()

def create_app():
    app = Flask(__name__)

    from .auth import auth
    from .cv_information import cvinfo
    app.register_blueprint(auth, url_prefix='/auth')  # Routes under /auth
    app.register_blueprint(cvinfo, url_prefix='/cvinfo')

    # MongoDB Configuration
    app.config["MONGO_URI"] = "mongodb://localhost:27017/GenAi"  # Replace with your MongoDB URI if using Atlas
    app.secret_key = "your_secret_key"  # Required for session management
    mongo.init_app(app)

    return app