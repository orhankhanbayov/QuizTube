# QuizTube

# Link

https://quiztube.orhankhanbayov.com

# About

QuizTube is an application that allows users to turn any YouTube video into an interactive quiz. It was developed for the Lablab AI Hackathon, using the Whisper API and ChatGPT.

The application uses Python and Flask for the backend. The Lablab version downloads YouTube audio, uses Whisper for speech-to-text, and sends the transcribed text to ChatGPT to generate questions. Due to Whisper's limitations regarding speed, an alternative solution using the YouTube API to download captions is provided.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Locally](#running-locally)
- [Usage](#usage)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Python 3.6 or later
- pip

## Installation

1. Clone the repository:

```
git clone https://github.com/your-username/quiztube.git
```

2. Change to the project directory:

```
cd quiztube

```

3. Install dependencies:

```
pip install -r requirements.txt

```

## Running Locally

1. Create a `.env` file in the `backend` folder:

```
cd backend
touch .env
```

2. Open the `.env` file and add your API key:

```
API_KEY=your_api_key_here

```

3. Start the Flask backend server:

```
python server.py
```

4. Start the React server

```
cd frontend
npm run start
```

## Usage

To generate a quiz from a YouTube video:

1. Make sure the backend server is running at `http://localhost:5000`.

2. In your application frontend, input the YouTube video URL or video ID.

3. Submit the form, and the backend will process the video using the selected method to generate a quiz.

4. The generated quiz questions will be displayed in the frontend, allowing users to interact and answer the questions.
