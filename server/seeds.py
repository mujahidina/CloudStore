from models import User, Folder, File
from app import app, db
from datetime import datetime, timedelta

def seed_data():
    with app.app_context():

        print('deleting existing data...')
        db.session.query(File).delete()
        db.session.query(Folder).delete()
        db.session.query(User).delete()
        db.session.commit() 

        print('creating users....')
        user1 = User(username='user1', email='user1@gmail.com', password='password1', image_url="https://i.scdn.co/image/ab6761610000e5ebebfd16a3bca87c31c1e20576")
        user2 = User(username='user2', email='user2@gmail.com', password='password2', image_url = "https://www.essence.com/wp-content/uploads/2022/12/GettyImages-1428769836-scaled.jpg")
        db.session.add(user1)
        db.session.add(user2)
        db.session.commit()

        print('creating folders....')
        now = datetime.utcnow()

        categories = {
            "Today": now,
            "Yesterday": now - timedelta(days=1),
            "Earlier this week": now - timedelta(days=now.weekday() + 1),
            "Earlier this month": now.replace(day=1) - timedelta(days=1),
            "Earlier this year": now.replace(month=1, day=1) - timedelta(days=1),
            "Never": now - timedelta(days=365 * 2),  # Two years ago
        }

        # Helper function to create folders
        def create_folder(name, created_at, user_id):
            folder = Folder(folder_name=name, created_at=created_at, user_id=user_id)
            db.session.add(folder)
            db.session.commit()
            return folder

        # Create folders for each category for both users
        for category, date in categories.items():
            create_folder(f"Folder {category}", date, user1.id)
            create_folder(f"Folder {category}", date, user2.id)

        print('creating files....')
        folder1 = db.session.query(Folder).filter_by(folder_name='Folder Today', user_id=user1.id).first()
        folder2 = db.session.query(Folder).filter_by(folder_name='Folder Yesterday', user_id=user1.id).first()
        folder3 = db.session.query(Folder).filter_by(folder_name='Folder Today', user_id=user2.id).first()

        file1 = File(filename='file1.txt', file_type='text', size=1024, path='/path/to/file1.txt', folder_id=folder1.id, user_id=user1.id)
        file2 = File(filename='file2.txt', file_type='text', size=2048, path='/path/to/file2.txt', folder_id=folder2.id, user_id=user2.id)
        file3 = File(filename='file3.txt', file_type='text', size=4096, path='/path/to/file3.txt', folder_id=folder3.id, user_id=user1.id)
        db.session.add(file1)
        db.session.add(file2)
        db.session.add(file3)
        db.session.commit()

if __name__ == '__main__':
    seed_data()


# from models import  User, Folder, File
# from app import app, db

# def seed_data():
#    with app.app_context():
    
#      # Delete existing data
#     print('deleting existing data...')
#     db.session.query(File).delete()
#     db.session.query(Folder).delete()
#     db.session.query(User).delete()
#     db.session.commit() 
         
#     print('creating users....')
#     user1 = User(username='user1', email='user1@gmail.com', password='password1',image_url="https://i.scdn.co/image/ab6761610000e5ebebfd16a3bca87c31c1e20576")
#     user2 = User(username='moringa', email='user2@gmail.com', password='password2',image_url = "https://www.essence.com/wp-content/uploads/2022/12/GettyImages-1428769836-scaled.jpg")
#     db.session.add(user1)
#     db.session.add(user2)
#     db.session.commit()
#     with app.app_context():
#         # Delete existing data
#         print('deleting existing data...')
#         db.session.query(File).delete()
#         db.session.query(Folder).delete()
#         db.session.query(User).delete()
#         db.session.commit()

#         # Create new data
#         print('creating users...')
#         user1 = User(username='user1', email='user1@gmail.com', password='password1')
#         user2 = User(username='user2', email='user2@gmail.com', password='password2')
#         db.session.add(user1)
#         db.session.add(user2)
#         db.session.commit()

#         print('creating folders...')
#         folder1 = Folder(folder_name='Folder 1', user_id=user1.id)
#         folder2 = Folder(folder_name='Folder 2', user_id=user1.id)
#         folder3 = Folder(folder_name='Folder 3', user_id=user2.id)
#         db.session.add(folder1)
#         db.session.add(folder2)
#         db.session.add(folder3)
#         db.session.commit()

#         print('creating files...')
#         file1 = File(filename='file1.txt', file_type='text', size=1024, path='/path/to/file1.txt', folder_id=folder1.id, user_id=user1.id)
#         file2 = File(filename='file2.txt', file_type='text', size=2048, path='/path/to/file2.txt', folder_id=folder2.id, user_id=user1.id)
#         file3 = File(filename='file3.txt', file_type='text', size=4096, path='/path/to/file3.txt', folder_id=folder3.id, user_id=user2.id)
#         db.session.add(file1)
#         db.session.add(file2)
#         db.session.add(file3)
#         db.session.commit()

# if __name__ == '__main__':
#     seed_data()

