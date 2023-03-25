from pytube import YouTube

# Create a YouTube object
yt = YouTube('https://www.youtube.com/watch?v=dQw4w9WgXcQ')

# Get the first audio stream
audio = yt.streams.filter(only_audio=True).first()

# Download the audio
c = audio.download()

print(c)
