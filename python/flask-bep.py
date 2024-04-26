#cd D:\Temp\projects\TTS
#python bep.py
#pip install Flask
#pip install flask-mysqldb
#pip install flask-cors
#pip install Flask Flask-JWT-Extended
#pip install Flask bcrypt
# http://localhost:5000/status
#Demo products

import os
import subprocess
import json
from flask import Flask, jsonify, send_file, request
from flask_cors import CORS
from flask_mysqldb import MySQL
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
import bcrypt

# Hash the password using bcrypt before inserting in DB
def hash_password(password):
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    return hashed_password.decode('utf-8')

# Verify the plain password against the password from DB
def verify_password(plain_password, hashed_password):
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))
    
app = Flask(__name__)

# MySQL configurations
app.config['MYSQL_HOST'] = 'localhost'	# Change this to your MySQL host
app.config['MYSQL_USER'] = 'root'    		# Change this to your MySQL username
app.config['MYSQL_PASSWORD'] = ''	# Change this to your MySQL password
app.config['MYSQL_DB'] = 'db_cart'		# Change this to your MySQL database name
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)
app.config['JWT_SECRET_KEY'] = 'your_secret_key'  # Change this to a random secret key
jwt = JWTManager(app)
CORS(app)  # This will enable CORS for all routes in your Flask application


@app.route('/status')
def status():
    status = 'ok'
    if status == 'ok':
        return jsonify({'status': "ok"})
    else:
        return jsonify({'status': "Error"})

@app.route('/products')
@jwt_required()
def get_all_products():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM products")
        products = cur.fetchall()
        cur.close()

        if products:
            formatted_products = [{
                'id': product['id'],
                'price': product['price'],
                'description': product['description'],
                'image': product['image'],
                'name': product['name']
            } for product in products]
            return jsonify(formatted_products)
        else:
            return jsonify({'status': 'Not found'})
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/create', methods=['POST'])
@jwt_required()
def create_product():
    try:
        data = request.json
        price = data.get('price')
        description = data.get('description')
        image = data.get('image')
        name = data.get('name')
        
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO products (price, description, image, name) VALUES (%s, %s, %s, %s)", (price, description, image, name))
        mysql.connection.commit()
        cur.close()

        return jsonify({'status': 'ok'})
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/delete', methods=['POST'])
@jwt_required()
def delete_product():
    try:
        data = request.get_json()
        product_id = data[0].get('id')
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM products WHERE id = %s", (product_id,))
        if cur.rowcount == 0:
            return jsonify({'status': 'not found'})

        mysql.connection.commit()
        cur.close()
        return jsonify({'status': 'ok'})
    except Exception as e:
        return jsonify({'error': str(e)})
        
@app.route('/update', methods=['PUT'])
@jwt_required()
def update_product():
    try:
        id = request.json.get('id')
        price = request.json.get('price')
        description = request.json.get('description')
        image = request.json.get('image')
        name = request.json.get('name')
        cur = mysql.connection.cursor()
        cur.execute("UPDATE products SET price = %s, description = %s, image = %s, name = %s WHERE id = %s", (price, description, image, name, id))
        if cur.rowcount == 0:
            return jsonify({'status': 'not found'})

        mysql.connection.commit()
        cur.close()
        return jsonify({'status': 'ok'})
    except Exception as e:
        return jsonify({'error': str(e)})
        
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    cur = mysql.connection.cursor()
    cur.execute("SELECT password FROM users WHERE email = %s", (email,))
    passwordDb = cur.fetchone()
    cur.close()

    if passwordDb:
        if verify_password(password, passwordDb['password']):
            access_token = create_access_token(identity=email)
            return jsonify(token=access_token)
        else:
            return jsonify({'status': 'Invalid email or password.'})
    else:
        return jsonify({'status': 'Invalid email or password.'})

if __name__ == '__main__':
    app.run(debug=True)