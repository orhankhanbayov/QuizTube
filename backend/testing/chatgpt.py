import openai
import re
import json
import os

from youtube_transcript_api import YouTubeTranscriptApi
openai.api_key = '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'

# a = YouTubeTranscriptApi.get_transcript("ORMx45xqWkA")
# texts = []
# for obj in a:
#     texts.append(obj['text'])
# text = ''.join(texts)
response = openai.Completion.create(
  model="text-davinci-003",
  prompt=(f"Generate 5 multiple choice questions"),
  max_tokens=3000,
  temperature=0
)
# string_data = response["choices"][0].text
# python_data = json.loads(string_data)
# print(python_data)


print(response)