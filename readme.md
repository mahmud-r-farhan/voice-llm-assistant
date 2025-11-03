# Open Voice AI

**Talk to an AI | using your voice, and hear it talk back | fully free & open-source.**

[![GitHub license](https://img.shields.io/github/license/mahmud-r-farhan/voice-llm-assistant)](https://github.com/mahmud-r-farhan/voice-llm-assistant/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/mahmud-r-farhan/voice-llm-assistant)](https://github.com/mahmud-r-farhan/voice-llm-assistant/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/mahmud-r-farhan/voice-llm-assistant)](https://github.com/mahmud-r-farhan/voice-llm-assistant/issues)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Example Interaction](#example-interaction)
- [Why This Matters](#why-this-matters)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Overview

**Open Voice AI** is a lightweight, full-stack prototype that enables real-time voice interactions with any Large Language Model (LLM) without incurring any costs. It leverages free-tier LLMs and browser-native APIs to create a seamless voice-based AI assistant.

- Powered by **OpenRouter's free LLMs** (e.g., Mistral 7B Instruct).
- Utilizes the **browser’s built-in Speech Recognition API** for voice input (no paid services required).
- Handles voice output via **browser-native Speech Synthesis (Text-to-Speech)**.
- No dependencies on paid APIs like OpenAI or ElevenLabs — 100% free to set up and run.

This project demonstrates a complete voice-based LLM interaction loop:
> User speaks → Speech recognized as text → Text sent to LLM → AI generates response → Response spoken aloud.

It's ideal for developers, hobbyists, or anyone interested in building accessible AI tools without financial barriers.

---

## Features

- **Free & Open Source**: No paid APIs, credits, or subscriptions needed.
- **Voice Input (Speech-to-Text)**: Powered by the Web Speech API in your browser.
- **AI Processing (LLM)**: Integrated with OpenRouter’s free-tier models for intelligent responses.
- **Voice Output (Text-to-Speech)**: Uses native browser SpeechSynthesis for spoken replies.
- **Cross-Platform Compatibility**: Works on Chrome and Edge browsers across Windows, macOS, Linux, and mobile devices.
- **Minimal Backend**: A simple Express.js proxy to handle LLM requests securely.
- **Customizable**: Easily swap LLMs or extend functionality.

---

## Tech Stack

| Layer     | Technology Used              | Purpose                          |
|-----------|------------------------------|----------------------------------|
| Frontend | React + Vite + Tailwind CSS | User interface and voice handling |
| Backend  | Node.js + Express           | Proxy for LLM API requests       |
| AI Layer | OpenRouter (e.g., Mistral 7B Instruct) | Free LLM for generating responses |
| STT      | Web Speech API              | Converts voice input to text     |
| TTS      | SpeechSynthesis API         | Converts AI text to spoken voice |

---

## Prerequisites

Before getting started, ensure you have:
- **Node.js** (v18 or higher) and **npm** installed.
- A modern browser like Google Chrome or Microsoft Edge (for Web Speech API support).
- An **OpenRouter API key** (free tier available):
  - Sign up at [OpenRouter.ai](https://openrouter.ai) and generate a free API key.
- Git installed for cloning the repository.

Note: The Web Speech API is best supported in Chrome. Other browsers may have limited or no support.

---

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/mahmud-r-farhan/voice-llm-assistant.git
cd voice-llm-assistant
```

### 2. Set Up the Backend
Navigate to the backend directory:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with your OpenRouter API key:
```
OPENROUTER_KEY=your_openrouter_api_key
```

Start the backend server:
```bash
node server.js
```

The backend will run on `http://localhost:5000`.

### 3. Set Up the Frontend
In a new terminal, navigate to the frontend directory:
```bash
cd frontend
npm install
npm run dev
```

Open your browser and visit `http://localhost:5173` to access the app.

---

## Usage

1. Open the app in your browser.
2. Grant microphone permissions when prompted.
3. Click the microphone button or start speaking to interact.
4. The AI will process your query and respond both in text and voice.

Customize the LLM model in the backend code if needed (default: Mistral 7B Instruct).

---

## Example Interaction

**User:** “Hey, what’s the capital of Japan?”  
**AI:** (spoken aloud) “The capital of Japan is Tokyo!”

---

## Why This Matters

Traditional AI voice assistants often rely on expensive APIs (e.g., OpenAI's TTS or ElevenLabs for voice synthesis), making them inaccessible for many. This project showcases how to build a **fully functional, real-time voice AI chat** using only free, open-source, and browser-native technologies. It's a proof-of-concept for democratizing AI development.

---

## Troubleshooting

- **Microphone not working?** Ensure browser permissions are granted and your mic is functional. Test in Chrome settings.
- **No voice output?** Check if your browser supports SpeechSynthesis (Chrome/Edge recommended). Adjust system volume.
- **API key issues?** Verify your OpenRouter key is valid and has free credits. Rate limits may apply on free tier.
- **CORS errors?** Ensure the backend is running and the frontend is connecting to `http://localhost:5000`.
- **Browser compatibility?** Use Chrome for best results. Firefox/Safari may lack full STT/TTS support.

If you encounter issues, check the browser console or server logs for errors. Feel free to open an issue on GitHub!

---

## Contributing

Contributions are welcome! To get started:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m 'Add your feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a Pull Request.

Ideas for improvements:
- Add support for more LLMs.
- Enhance UI with themes or accessibility features.

---

## Contact

Created by [Mahmud Rahman](https://github.com/mahmud-r-farhan).  
Feel free to reach out via GitHub issues or [Linkedin](https://www.linkedin.com/in/mahmud-r-farhan/).  
Happy building! 😊