from flask import Flask, jsonify
from flask_cors import CORS
from faker import Faker
import random

app = Flask(__name__)
CORS(app)  # Permite peticiones desde el frontend

fake = Faker()

def generate_user():
    return {
        "name": fake.first_name(),
        "surname": fake.last_name(),
        "country": fake.country(),
        "photo": f"https://randomuser.me/api/portraits/{random.choice(['men', 'women'])}/{random.randint(1, 99)}.jpg"
    }

@app.route('/api/users')
def get_users():
    users = [generate_user() for _ in range(75)]
    return jsonify(users)

if __name__ == '__main__':
    app.run(debug=True, port=5000)