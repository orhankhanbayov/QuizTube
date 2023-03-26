import requests

url = "https://whisper.lablab.ai/asr"
payload = {}
files = [('audio_file', ('Rick Astley - Never Gonna Give You Up.mp4', open(link, 'rb'), 'audio/mp4'))]
response = requests.post(url, data=payload, files=files)
text = response.json()["text"]
print(text)
