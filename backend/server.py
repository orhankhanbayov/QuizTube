from flask import Flask, jsonify, request
from pytube import YouTube
import requests
import openai
import re
import json
from flask_cors import CORS
import os

openai.api_key = "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"


app = Flask(__name__)
CORS(app)
@app.route('/api/submit', methods=['POST'])
def submit_data():
    data = request.json
    yt = YouTube(data['link'])
    audio = yt.streams.filter(only_audio=True).first()
   
    link = audio.download()

    url = "https://whisper.lablab.ai/asr"
    payload = {}
    files = [('audio_file', ('output.mp4', open(link, 'rb'), 'audio/mp4'))]
    response = requests.post(url, data=payload, files=files)
    text = response.json()["text"]

    response = openai.Completion.create(
      model="text-davinci-003",
      prompt=(f"Generate 5 multiple choice questions based on the following text and return with answers in an array of json objects, one for each questions containing the question, choices and answer:{text} "),
      max_tokens=3000,
      temperature=0
    )
    string_data = response["choices"][0].text
    python_data = json.loads(string_data)
    # add delete the mp4 file
    response = {'data': python_data}
    os.remove(link)
    return jsonify(response)
   
if __name__ == '__main__':
    app.run(debug=True)
