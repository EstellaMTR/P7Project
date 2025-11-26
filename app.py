from flask import Flask, jsonify, request, render_template, redirect
from flask_socketio import SocketIO, emit, join_room
import uuid
from datetime import datetime, timedelta

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'

socketio = SocketIO(app, cors_allowed_origins="*")

# ...existing code...

chat_sessions = {}
chat_messages = {}



# ROUTES:
# I dont think this function is necessary :)
@app.after_request
def add_headers(response):
    response.headers['Cache-Control'] = 'no-store'
    return response

@app.route('/')
def home():
    return(render_template('index.html'))

@app.route('/chat')
def chat():
    return(render_template('/users/chat/chat.html'))

@app.route('/login')
def login():
    return(render_template('/volunteers/login/login.html'))

@app.route('/resources')
def resources():
    return(render_template('/resources/resources.html'))

@app.route('/storyOverview')
def storyOverview():
    return(render_template('/resources/storyOverview.html'))

@app.route('/stories')
def stories():
    return(render_template('/resources/stories.html'))

@app.route('/articleOverview')
def articleOverview():
    return(render_template('/resources/articleOverview.html'))

@app.route('/articles')
def articles():
    return(render_template('/resources/articles.html'))

@app.route('/info')
def info():
    return(render_template('/users/info/info.html'))

@app.route('/volunteer-chat')
def volunteerChat():
    return(render_template('/volunteers/chat/chat.html'))

@app.route('/waiting')
def waiting():
    return(render_template('/volunteers/waiting/waiting.html'))

@app.route('/active_sessions')
def get_active_sessions():
    """Return a list of currently active sessions that do not yet have a volunteer."""
    available = [
        {"session_id": sid, "user_id": details["user_id"]}
        for sid, details in chat_sessions.items()
        if details["volunteer_id"] is None and 
        details["expires_at"] > datetime.now()  # Also check not expired
    ]
    return jsonify(available)


# SOCKET.IO EVENTS:

@socketio.on("user_connect")
def handle_user_connect(data):
    session_id = str(uuid.uuid4())

    chat_sessions[session_id] = {
        'user_id': data['user_id'],
        'volunteer_id': None,
        'created_at': datetime.now(),
        'expires_at': datetime.now() + timedelta(minutes=30)
    }
    chat_messages[session_id] = []

    join_room(session_id)   # ⬅ IMPORTANT FIX

    emit("session_created", {"session_id": session_id})
    print("Anonymous user started session:", session_id)


@socketio.on("user_message")
def handle_user_message(data):
    session_id = data['session_id']

    message = {
        'sender': 'user',
        'text': data['text'],
        'timestamp': datetime.now().isoformat()
    }

    chat_messages[session_id].append(message)

    # Send to volunteer only, NOT back to user
    emit("new_message", message, room=session_id, skip_sid=request.sid)
    print("User message in session", session_id, ":", data['text'])


@socketio.on("volunteer_connect")
def handle_volunteer_connect(data):
    """
    Volunteer joins a chat session.
    """
    session_id = data["session_id"]
    
    # Update the session to mark volunteer as connected
    if session_id in chat_sessions:
        chat_sessions[session_id]["volunteer_id"] = request.sid
    
    join_room(session_id)
    print("Volunteer joined session:", session_id)
    emit("volunteer_joined", {"message": "Volunteer has joined the chat."}, room=session_id)


@socketio.on('volunteer_message')
def handle_volunteer_message(data):
    session_id = data.get('session_id')
    message_text = data.get('text')
    
    # Store the message
    message = {
        'sender': 'volunteer',
        'text': message_text,
        'timestamp': datetime.now().isoformat()
    }
    
    if session_id in chat_messages:
        chat_messages[session_id].append(message)
    
    # Send to user only, NOT back to volunteer
    emit('new_message', message, room=session_id, skip_sid=request.sid)
    print("Volunteer message in session", session_id, ":", message_text)


# CLEANUP OLD MESSAGES PERIODICALLY 
def cleanup_old_sessions():
    """Delete messages older than 24 hours."""
    now = datetime.now()
    expired = []

    for session_id, details in chat_sessions.items():
        # CORRECTED KEY:
        if now - details["created_at"] > timedelta(hours=24):
            expired.append(session_id)

    for s in expired:
        del chat_sessions[s]
        del chat_messages[s]

    print("Cleaned up:", expired)


if __name__ == '__main__':
    socketio.run(app, debug=True)
