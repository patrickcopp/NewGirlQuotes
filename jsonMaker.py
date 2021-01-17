import os
import json

FILES = os.listdir("./assets/")

episodes = []

for file in FILES:
    f = open("./assets/" + file, "r", encoding="utf-8")
    script = f.read()
    newDict = {}
    newDict["title"] = file
    newDict["script"] = script
    episodes.append(newDict)
    f.close()

# with open("data_file.txt", "w") as write_file:
#     json.dump(episodes, write_file)

with open('data_file.js') as f:
  data = json.load(f)