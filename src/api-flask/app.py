from flask import Flask, jsonify
from flask_cors import CORS
from faker import Faker
import random

app = Flask(__name__)
CORS(app)

fake = Faker()

def generate_user():
    user = {
        "name": fake.first_name(),
        "surname": fake.last_name(),
        "country": fake.country(),
        "photo": f"https://randomuser.me/api/portraits/{random.choice(['men', 'women'])}/{random.randint(1, 99)}.jpg"
    }

    # Simular datos incompletos en 20% de los usuarios
    if random.random() < 0.2:
        field_to_remove = random.choice(list(user.keys()))
        del user[field_to_remove]

    return user

@app.route('/api/users')
def get_users():
    users = [generate_user() for _ in range(75)]
    return jsonify(users)

if __name__ == '__main__':
    app.run(debug=True, port=5000)