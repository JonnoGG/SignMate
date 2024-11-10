import tkinter as tk
from tkinter import ttk

# check text
def check_text():
    text_input = entry_text.get()
    text_output = (text_input == "Correct")
    output_string.set(text_output)

# window
window = tk.Tk()
window.title('SignMate')
window.geometry('300x150')

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


