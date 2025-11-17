from flask import Flask, jsonify, request, render_template

app = Flask(__name__)

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

@app.route('/stories')
def stories():
    return(render_template('/resources/stories.html'))

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

if __name__ == '__main__':
    app.run(debug=False)