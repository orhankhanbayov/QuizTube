from flask import Flask, jsonify, request
from pytube import YouTube
import requests
import openai
import re
import json
from flask_cors import CORS
import os
from youtube_transcript_api import YouTubeTranscriptApi
import urllib.parse as urlparse
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv('API_KEY')


def get_video_id(url):
    parsed_url = urlparse.urlparse(url)
    video_id = urlparse.parse_qs(parsed_url.query).get('v')
    if video_id:
        return video_id[0]
    else:
        return None


app = Flask(__name__)
CORS(app)


@app.route('/api/submit', methods=['POST'])
def submit_data():
    data = request.json

    video_id = get_video_id(data['link'])
    a = YouTubeTranscriptApi.get_transcript(video_id)
    texts = []
    for obj in a:
        texts.append(obj['text'])
    text = ''.join(texts)

    # response = openai.Completion.create(
    #   model="text-davinci-003",
    #   prompt=(f"Generate 5 multiple choice questions based on the following text and return with answers in an array of json objects, one for each questions containing the question, choices and answer:{text} "),
    #   max_tokens=3000,
    #   temperature=0
    # )
    # string_data = response["choices"][0].text
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-16k",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful assistant."
            },
            {
                "role": "user",
                "content": f"Generate 5 multiple choice questions based on the following text and return with answers in an array of json objects, one for each questions containing the question, choices and answer: {text}"
            }
        ],
        max_tokens=16000,
        temperature=0
    )

    string_data = response['choices'][0]['message']['content']

    python_data = json.loads(string_data)

    response = {'data': python_data}

    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True)
