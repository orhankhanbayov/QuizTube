import openai
import re
import json
from youtube_transcript_api import YouTubeTranscriptApi
openai.api_key = "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"
a = YouTubeTranscriptApi.get_transcript("ORMx45xqWkA")
texts = []
for obj in a:
    texts.append(obj['text'])
text = ''.join(texts)
response = openai.Completion.create(
  model="text-davinci-003",
  prompt=(f"Generate 5 multiple choice questions based on the following text and return with answers in an array of json objects, one for each questions containing the question, choices and answer:{text} "),
  max_tokens=3000,
  temperature=0
)
string_data = response["choices"][0].text
python_data = json.loads(string_data)
print(python_data)


