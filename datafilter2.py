import json

raw_file = open('data/map.json')
json_raw = json.load(raw_file)

new_file = open('data/new_map.json', 'w')

new_data = []
word_list = set()

def check_file_exists(folder_path, filename):
    file_path = os.path.join(folder_path, filename)
    if os.path.isfile(file_path):
        return True
    else:
        return False


for item in json_raw:
    if check_file_exists("data/videos", item['videoid']):
        new_data = 
    word = item['gloss']
    if word in word_list:
        break
    for instance in item['instances']:
        if instance['source'] == "aslsignbank":
            word_list.add(word)
            new_map = {"word": word,
                    "video_id": instance['video_id']}
            new_data.append(new_map)

json.dump(new_data, new_file, indent=4)

new_file.close()