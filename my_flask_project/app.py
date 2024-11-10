import json
from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

# Load your JSON data (words and video IDs)
with open('map.json', 'r') as f:
    asl_data = json.load(f)

# Predefined sentence (can also be randomly selected or formed)
sentence = ["fork", "fix", "economy"]  # You can modify this or select randomly from words

# Route for the home page
@app.route('/')
def index():
    # Get video files and words corresponding to the sentence
    sentence_videos = []
    for word in sentence:
        # Find the video file corresponding to each word
        video = next((item['video_id'] for item in asl_data if item['word'] == word), None)
        sentence_videos.append({'word': word, 'video_id': video})

    return render_template('index.html', sentence_videos=sentence_videos, sentence=' '.join(sentence))

# Route to check the user's input
@app.route('/check_answer', methods=['POST'])
def check_answer():
    user_input = request.form['user_input']
    correct_answer = request.form['correct_answer']
    
    if user_input.strip().lower() == correct_answer.strip().lower():
        return jsonify({"result": "correct"})
    else:
        return jsonify({"result": "incorrect"})

if __name__ == '__main__':
    app.run(debug=True)
