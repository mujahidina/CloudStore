from flask import Flask, request, jsonify, make_response
from flask_migrate import Migrate
from flask_restful import Resource, Api
from models import db, User, Folder, File, Share, StarredItem, TrashItem
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, unset_jwt_cookies
from flask_cors import CORS
from flask_bcrypt import Bcrypt

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cloudstore.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'
db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)

class UserRegister(Resource):
    def post(self):
        data = request.get_json()
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")
        image_url = data.get("image_url")

        hashed_password = bcrypt.generate_password_hash(password)

        new_user = User(
            username=username,
            email=email,
            password=hashed_password,
            image_url=image_url
            username=username,
            email=email,
            password=hashed_password,
            image_url=image_url
        )
        db.session.add(new_user)
        db.session.commit()

        access_token = create_access_token(identity=username)

        return jsonify({
            "id": new_user.id,
            "username": new_user.username,
            "access_token": access_token
        })

api.add_resource(UserRegister, "/user/register")

# Define other resources and routes here...

if __name__ == "__main__":
    app.run(debug=True)
