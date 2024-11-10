import json

raw_file = open('data_raw/WLASL_v0.3.json')
json_raw = json.load(raw_file)

new_file = open('data_new/map.json', 'w')

new_data = []
word_list = set()

for item in json_raw:
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
