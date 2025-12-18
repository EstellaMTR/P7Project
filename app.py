from flask import Flask, jsonify, request, render_template
from flask_socketio import SocketIO, emit, join_room
import uuid
from datetime import datetime, timedelta

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'

socketio = SocketIO(app, cors_allowed_origins="*")

chat_sessions = {}
chat_messages = {}

@app.after_request
def add_headers(response):
    response.headers['Cache-Control'] = 'no-store'
    return response

# ROUTES

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
    now = datetime.now()
    available = []
    for sid, details in chat_sessions.items():
        if details.get("volunteer_id") is None and details.get("expires_at") and details["expires_at"] > now:
            available.append({"session_id": sid, "user_id": details.get("user_id")})
    return jsonify(available)


# SOCKET.IO EVENTS:

@socketio.on("user_connect")
def handle_user_connect(data):
    session_id = uuid.uuid4().hex
    user_id = data.get("user_id", "anon")
    now = datetime.now()
    chat_sessions[session_id] = {
        "user_id": user_id,
        "volunteer_id": None,
        "created_at": now,
        "expires_at": now + timedelta(minutes=180)
    }
    chat_messages[session_id] = []
    join_room(session_id)
    emit("session_created", {"session_id": session_id}, room=request.sid)
    print(f"[socket] user_connect -> created session {session_id} (socket {request.sid})")


@socketio.on("user_message")
def handle_user_message(data):
    session_id = data.get("session_id")
    text = data.get("text", "")
    if not session_id:
        print("[socket] user_message missing session_id", data)
        return
    if session_id not in chat_sessions:
        print("[socket] user_message unknown session", session_id)
        return
    message = {"sender": "user", "text": text, "timestamp": datetime.now().isoformat()}
    chat_messages.setdefault(session_id, []).append(message)
    # send to volunteers in room but NOT back to the sending user
    emit("new_message", message, room=session_id, skip_sid=request.sid)
    print(f"[socket] user_message -> session {session_id}: {text}")


@socketio.on("volunteer_connect")
def handle_volunteer_connect(data):
    session_id = data.get("session_id")
    if not session_id:
        print("[socket] volunteer_connect missing session_id", data)
        return
    if session_id not in chat_sessions:
        print("[socket] volunteer_connect unknown session", session_id)
        return
    chat_sessions[session_id]["volunteer_id"] = request.sid
    join_room(session_id)
    emit("volunteer_joined", {"message": "Volunteer has joined the chat."}, room=session_id)
    print(f"[socket] volunteer_connect -> volunteer {request.sid} joined session {session_id}")

@socketio.on("volunteer_message")
def handle_volunteer_message(data):
    session_id = data.get("session_id")
    text = data.get("text", "")
    if not session_id:
        print("[socket] volunteer_message missing session_id", data)
        return
    if session_id not in chat_sessions:
        print("[socket] volunteer_message unknown session", session_id)
        return
    message = {"sender": "volunteer", "text": text, "timestamp": datetime.now().isoformat()}
    chat_messages.setdefault(session_id, []).append(message)
    # send to user in room but do NOT echo back to volunteer
    emit("new_message", message, room=session_id, skip_sid=request.sid)
    print(f"[socket] volunteer_message -> session {session_id}: {text}")


# CLEANUP OLD MESSAGES PERIODICALLY 
def cleanup_old_sessions():
    """Delete messages older than 2 hours."""
    now = datetime.now()
    expired = []

    for session_id, details in chat_sessions.items():
        # CORRECTED KEY:
        if now - details["created_at"] > timedelta(hours=2):
            expired.append(session_id)

    for s in expired:
        del chat_sessions[s]
        del chat_messages[s]

    print("Cleaned up:", expired)


if __name__ == '__main__':
    socketio.run(app, debug=True)
