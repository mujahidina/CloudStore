

users = []

# Join user to chat
def user_join(id, username, room, host, presenter):
    user = {'id': id, 'username': username, 'room': room, 'host': host, 'presenter': presenter}
    users.append(user)
    return user

# User leaves chat
def user_leave(id):
    index = next((index for index, user in enumerate(users) if user['id'] == id), None)
    if index is not None:
        return users.pop(index)

# Get users in a room
def get_users(room):
    return [user for user in users if user['room'] == room]
