from flask import Flask, request, jsonify, make_response
from flask_migrate import Migrate
from flask_restful import Resource, Api, reqparse
from models import db, User, File, Folder, Share, StarredItem, TrashItem
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, create_access_token, unset_jwt_cookies
from flask_cors import CORS, cross_origin
from flask_bcrypt import Bcrypt
import cloudinary
import cloudinary.uploader
import cloudinary.api
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cloudstore.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.json.compact = False

app.secret_key = 'secret key'
app.config['JWT_SECRET_KEY'] = "b'\x03\xa3\x8c\xb3\n\xf4\x16aFh\xc5'"

db.init_app(app)

migrate = Migrate(app, db)
api = Api(app)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)

# Cloudinary configuration
cloudinary.config(
    cloud_name='your_cloud_name',
    api_key='your_api_key',
    api_secret='your_api_secret'
)

class UserRegister(Resource):
    @cross_origin()
    def post(self):
        data = request.get_json()
        print(data)
        username = data.get("username")
        email = data.get("email")
        password = str(data.get("password"))
        image_url = data.get("image_url")

        print(f"This is {data}")

        # check if the user exists
        user_exists = User.query.filter(User.username == username).first()

        if user_exists:
            return jsonify({"Error": "User exists"})

        # creating encrypted passwords
        hashed_password = bcrypt.generate_password_hash(password)

        access_token = create_access_token(identity=username)
        # User.access_token = access_token

        new_user = User(
            username=username,
            email=email,
            password=hashed_password,
            image_url=image_url
        )
        db.session.add(new_user)
        db.session.commit()

        return jsonify({
            "id": new_user.id,
            "username": new_user.username,
            "access_token": access_token
        })

api.add_resource(UserRegister, "/user/register")


class UserLogin(Resource):
    def post(self):
        data = request.get_json()
        print(data)

        email = data.get("email")
        password = str(data.get("password"))

        user = User.query.filter_by(email=email).first()

        if user is None:
            return jsonify({'error': 'Unauthorized'}), 401

        if not bcrypt.check_password_hash(user.password, password):
            return jsonify({'error': 'Unauthorized, incorrect password'}), 401

        access_token = create_access_token(identity=email)
        user.access_token = access_token

        return jsonify({
            "id": user.id,
            "email": user.email,
            "access_token": user.access_token,
        })

api.add_resource(UserLogin, "/user/login")


class Logout(Resource):
    @jwt_required()
    def post(self):
        unset_jwt_cookies()
        return {"message": "Successfully logged out"}

api.add_resource(Logout, "/user/logout")


class Users(Resource):
    def get(self):
        users = [user.to_dict(only=('id', 'username', 'email', "image_url")) for user in User.query.all()]
        print("im a user", users)
        return make_response(jsonify(users), 200)

api.add_resource(Users, "/users")


class UserByID(Resource):
    def get(self, id):
        user = User.query.filter(User.id == id).first()

        if user:
            return make_response(jsonify(user.to_dict(only=("id", "username", "email", "image_url"))), 200)

    def patch(self, id):
        data = request.get_json()

        user = User.query.filter(User.id == id).first()

        for attr in data:
            setattr(user, attr, data.get(attr))

        db.session.add(user)
        db.session.commit()

        return make_response(user.to_dict(only=("id", "email", "username", "files", "folders",)), 200)

    def delete(self, id):
        user = User.query.filter(User.id == id).first()

        if user:
            db.session.delete(user)
            db.session.commit()
            return make_response("", 204)
        else:
            return make_response(jsonify({"error": "User not found"}), 404)

api.add_resource(UserByID, "/users/<int:id>")


class Folders(Resource):
    def post(self):
        data = request.get_json()

        try:
            new_folder = Folder(
                folder_name=data.get('folder_name'),
                parent_folder_id=data.get('parent_folder_id'),
                user_id=data.get('user_id'),
            )
            db.session.add(new_folder)
            db.session.commit()

        except ValueError:
            return make_response(jsonify({"error": ["validation errors"]}))

        return make_response(new_folder.to_dict(only=("parent_folder_id", "user_id", "user.username", "folder_name")), 201)

api.add_resource(Folders, "/folders")


class FolderByUser(Resource):
    def get(self, id):
        folders = [folder.to_dict(only=("id", "folder_name", "user_id", "user.username")) for folder in Folder.query.filter(Folder.user_id == id)]

        return make_response(folders, 200)

api.add_resource(FolderByUser, "/foldersuser/<int:id>")


class FolderByID(Resource):
    def get(self, id):
        folder = Folder.query.filter(Folder.id == id).first()

        if folder:
            return make_response(jsonify(folder.to_dict(only=("id", "folder_name", "user_id", "user.username"))), 200)
        else:
            return make_response(jsonify({"error": "Folder not found"}))

    def patch(self, id):
        data = request.get_json()

        folder = Folder.query.filter(Folder.id == id).first()

        for attr in data:
            setattr(folder, attr, data.get(attr))

        db.session.add(folder)
        db.session.commit()

        return make_response(folder.to_dict(only=("id", "folder_name", "user_id", "user.username")), 200)

    def delete(self, id):
        folder = Folder.query.filter(Folder.id == id).first()

        if folder:
            db.session.delete(folder)
            db.session.commit()
            return make_response("", 204)
        else:
            return make_response(jsonify({"error": "User not found"}), 404)

api.add_resource(FolderByID, "/folders/<int:id>")


class Files(Resource):
    def post(self):
        data = request.get_json()
        file = request.files['file']

        # Handle file upload to Cloudinary
        try:
            uploaded_file = cloudinary.uploader.upload(file)
            file_url = uploaded_file['url']
            file_public_id = uploaded_file['public_id']
        except Exception as e:
            return make_response(jsonify({"error": str(e)}), 500)

        try:
            new_file = File(
                filename=data.get('filename'),
                file_type=data.get("file_type"),
                size=data.get("size"),
                path=file_url,  # Use the Cloudinary URL of the uploaded file
                public_id=file_public_id,  # Store the public ID for future reference
                folder_id=data.get("folder_id"),
                user_id=data.get('user_id')
            )
            db.session.add(new_file)
            db.session.commit()

        except ValueError:
            return make_response(jsonify({"error": ["validation errors"]}))

        return make_response(new_file.to_dict(only=("filename", "file_type", "user.username", "folder_id", "path", "size", "user_id")), 201)

api.add_resource(Files, "/files")


class FileByFolder(Resource):
    def get(self, id):
        files = [file.to_dict(only=("id", "filename", "file_type", "size", "path", "user.username")) for file in File.query.filter(File.folder_id == id)]

        return make_response(files, 200)

api.add_resource(FileByFolder, "/filefolder/<int:id>")


class FileByUser(Resource):
    def get(self, id):
        files = [file.to_dict(only=("id", "filename", "file_type", "size", "path", "user.username")) for file in File.query.filter(File.user_id == id)]

        return make_response(files, 200)

api.add_resource(FileByUser, "/fileuser/<int:id>")


class FileByID(Resource):
    def get(self, id):
        file = File.query.filter(File.id == id).first()

        if file:
            return make_response(jsonify(file.to_dict(only=("id", "filename", "file_type", "size", "path", "user.username"))), 200)
        else:
            return make_response(jsonify({"error": "Folder not found"}))

    def patch(self, id):
        data = request.get_json()

        file = File.query.filter(File.id == id).first()

        for attr in data:
            setattr(file, attr, data.get(attr))

        db.session.add(file)
        db.session.commit()

        return make_response(file.to_dict(only=("id", "filename", "file_type", "size", "path", "user.username")), 200)

    def delete(self, id):
        file = File.query.filter(File.id == id).first()

        if file:
            try:
                # Delete the file from Cloudinary
                cloudinary.uploader.destroy(file.public_id)
            except Exception as e:
                return make_response(jsonify({"error": str(e)}), 500)
            
            db.session.delete(file)
            db.session.commit()
            return make_response("", 204)
        else:
            return make_response(jsonify({"error": "File not found"}), 404)

api.add_resource(FileByID, "/files/<int:id>")


class Shares(Resource):
    def post(self):
        data = request.get_json()

        try:
            new_share = Share(
                shared_with=data.get("shared_with"),
                shared_by=data.get("shared_by"),
                file_id=data.get("file_id")
            )
            db.session.add(new_share)
            db.session.commit()

        except ValueError:
            return make_response(jsonify({"error": ["validation errors"]}))

        return make_response(new_share.to_dict(), 201)

api.add_resource(Shares, "/shares")


class SharesByUser(Resource):
    def get(self, user_id):
        shares = [share.to_dict() for share in Share.query.filter(Share.shared_with == user_id)]

        return make_response(shares, 200)

api.add_resource(SharesByUser, "/shares/<int:user_id>")


class Stars(Resource):
    def post(self):
        data = request.get_json()

        try:
            new_star = StarredItem(
                file_id=data.get("file_id"),
                user_id=data.get("user_id")
            )
            db.session.add(new_star)
            db.session.commit()

        except ValueError:
            return make_response(jsonify({"error": ["validation errors"]}))

        return make_response(new_star.to_dict(), 201)

api.add_resource(Stars, "/stars")


class StarsByUser(Resource):
    def get(self, user_id):
        stars = [star.to_dict() for star in StarredItem.query.filter(StarredItem.user_id == user_id)]

        return make_response(stars, 200)

api.add_resource(StarsByUser, "/stars/<int:user_id>")


class Trash(Resource):
    def post(self):
        data = request.get_json()

        try:
            new_trash_item = TrashItem(
                file_id=data.get("file_id"),
                user_id=data.get("user_id")
            )
            db.session.add(new_trash_item)
            db.session.commit()

        except ValueError:
            return make_response(jsonify({"error": ["validation errors"]}))

        return make_response(new_trash_item.to_dict(), 201)

api.add_resource(Trash, "/trash")


class TrashByUser(Resource):
    def get(self, user_id):
        trash_items = [trash_item.to_dict() for trash_item in TrashItem.query.filter(TrashItem.user_id == user_id)]

        return make_response(trash_items, 200)

api.add_resource(TrashByUser, "/trash/<int:user_id>")




# class RecentFolders(Resource):
#     def get(self, user_id):
#         today = datetime.utcnow()
#         yesterday = today - timedelta(days=1)
#         start_of_week = today - timedelta(days=today.weekday())

#         folders = F.query.filter_by(user_id=user_id).all()

#         recents = {
#             'Today': [],
#             'Yesterday': [],
#             'Earlier this week': [],
#             'More': []
#         }

#         for folder in folders:
#             if folder.created_at >= today.replace(hour=0, minute=0, second=0, microsecond=0):
#                 recents['Today'].append(folder)
#             elif folder.created_at >= yesterday.replace(hour=0, minute=0, second=0, microsecond=0):
#                 recents['Yesterday'].append(folder)
#             elif folder.created_at >= start_of_week.replace(hour=0, minute=0, second=0, microsecond=0):
#                 recents['Earlier this week'].append(folder)
#             else:
#                 recents['More'].append(folder)

#         return jsonify({category: [folder.serialize() for folder in folders] for category, folders in recents.items()})

# api.add_resource(RecentFolders, '/api/recent/<int:user_id>')



if __name__ == '__main__':
    app.run(port=5555, debug=True)
