from flask import Flask, send_from_directory
import os
from flask_cors import CORS  # Import CORS


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Specify the directory where your video files are stored
VIDEO_FOLDER = 'data/videos'
app.config['VIDEO_FOLDER'] = VIDEO_FOLDER

@app.route('/getvideo')
def get_video():
    # Serve the video file from the specified directory
     return send_from_directory(app.config['VIDEO_FOLDER'], "00336.mp4")

if __name__ == '__main__':
    app.run(debug=True)