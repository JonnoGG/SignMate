import tkinter as tk
import json 
import random
import cv2
from PIL import Image, ImageTk

# load JSON file with ASL word to video mapping
with open("map.json", "r") as file:
    asl_data = json.load(file)

# initialize Tkinter root window
root = tk.Tk()
root.title("ASL Sentence Practice")

# display frame for video
video_frame = tk.Frame(root)
video_frame.pack(padx=10, pady=10)

# label for displaying video
video_label = tk.Label(video_frame)
video_label.pack()

# entry field for user input
input_field = tk.Entry(root, font=("Helvetica", 18))
input_field.pack(pady=10)

# Feedback label
feedback_label = tk.Label(root, text="", font=("Helvetica", 14))
feedback_label.pack(pady=10)

# Sentence generation function
def generate_sentence():
    # Randomly select words from asl_data to form a sentence
    words = random.sample(asl_data, 3)  # Random 3-word sentence
    return words

# Function to play video using OpenCV
def play_video(video_file):
    cap = cv2.VideoCapture(video_file)  # Open the video file
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        # Convert OpenCV frame (BGR) to RGB for Tkinter display
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        img = Image.fromarray(frame_rgb)
        img_tk = ImageTk.PhotoImage(img)

        # Update the label with the new image
        video_label.config(image=img_tk)
        video_label.image = img_tk
        root.update()

    cap.release()  # Release video capture object

# Function to check if the typed sentence is correct
def check_sentence():
    typed_text = input_field.get().lower()
    sentence_words = [word['word'].lower() for word in sentence]
    if typed_text == " ".join(sentence_words):
        feedback_label.config(text="Correct!")
        generate_new_sentence()
    else:
        feedback_label.config(text="Try Again.")

# Generate a new sentence and load corresponding video
def generate_new_sentence():
    global sentence
    sentence = generate_sentence()

    # Play the video for the first word in the sentence
    video_file = f"videos/{sentence[0]['video_id']}.mp4"
    play_video(video_file)

    # Clear the input field
    input_field.delete(0, tk.END)

# Set up initial sentence and play the first video
sentence = generate_sentence()
video_file = f"videos/{sentence[0]['video_id']}.mp4"
play_video(video_file)

# Button to check typed sentence
check_button = tk.Button(root, text="Check Sentence", font=("Helvetica", 16), command=check_sentence)
check_button.pack(pady=10)

# Start the Tkinter event loop
root.mainloop()