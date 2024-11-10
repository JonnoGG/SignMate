import tkinter as tk
from tkinter import ttk

# video
import cv2
from PIL import Image, ImageTk



# check text
def check_text():
    text_input = entry_text.get()
    text_output = (text_input == "fix")
    output_string.set(text_output)

# window
window = tk.Tk()
window.title('SignMate')
window.geometry('1920x1080')

# title
title_label = ttk.Label(master = window, text = 'SignMate Demo', font = 'Arial 24 bold')
title_label.pack()

# input field
input_frame = ttk.Frame(master = window)
entry_text = tk.StringVar()
entry = ttk.Entry(master = input_frame, textvariable = entry_text)
button = ttk.Button(master = input_frame, text = 'Submit', command = check_text)
entry.pack(side = 'left', padx = 10)
button.pack(side = 'left')
input_frame.pack(pady = 10)

## VIDEO
#
# Boolean to control whether the video is playing
is_playing = False
# Create a Label to display the video frames
label = tk.Label(window)
label.pack()
# Capture video from the webcam or a video file
cap = cv2.VideoCapture('./data/23006.mp4')  # Use '0' for webcam, or "path/to/video.mp4" for video file

def update_frame():
    """Function to update the frame only if is_playing is True."""
    global is_playing

    if is_playing:
        ret, frame = cap.read()
        
        # If the video ended, reset to the beginning
        if not ret:
            cap.set(cv2.CAP_PROP_POS_FRAMES, 0)  # Reset to the first frame
            ret, frame = cap.read()

        if ret:
            # Convert the frame from BGR to RGB format
            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            # Convert the image to a format Tkinter can use
            img = ImageTk.PhotoImage(image=Image.fromarray(frame_rgb))
            # Update the label to show the new frame
            label.imgtk = img  # Keep a reference to avoid garbage collection
            label.configure(image=img)
    
    # Call this function again after 10 ms
    window.after(10, update_frame)

def toggle_play(event):
    """Toggle the is_playing variable on key press and reset the video if starting playback."""
    global is_playing
    if not is_playing:
        # Reset video position to the beginning if starting playback
        cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
    is_playing = not is_playing  # Toggle playback

# Bind the spacebar key to toggle video playback
window.bind("<space>", toggle_play)

# Start the video loop
update_frame()




# output
output_string = tk.StringVar()
output_label = ttk.Label(
    master = window, 
    text = 'Output',
    font = 'Arial 24',
    textvariable = output_string)
output_label.pack(pady = 5)

# run
window.mainloop()

## VIDEO
# Release the video capture when the window is closed
cap.release()
cv2.destroyAllWindows()

