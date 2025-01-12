from flask import Blueprint
from flask import request

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    if username == 'tiago' and password == '123':
        return 'Welcome'
    else: return 'Invalid credentials'