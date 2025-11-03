# Open Voice Ai
**Talk to an AI — using your voice, and hear it talk back — fully free & open-source.**

---

##  Overview

**Free Voice AI Assistant** is a lightweight, full-stack prototype that lets you **talk with any LLM in real time using voice**, without spending a single dollar.

- Powered by **OpenRouter free LLMs** (like Mistral 7B)
-  Uses **browser’s built-in Speech Recognition API** (no paid API)
-  Speaks back using **Speech Synthesis (Text-to-Speech)** — all in-browser
-  No OpenAI or ElevenLabs cost — 100% free setup

This project is designed to demonstrate a **complete voice-based LLM interaction loop**:
> User speaks → recognized as text → sent to LLM → AI replies → AI reply spoken aloud.

---

## Features

- **Free & Open Source** – No paid APIs or credits required  
- **Voice Input (STT)** – Uses the browser's Web Speech API  
- **AI Response (LLM)** – Runs through OpenRouter’s free models  
- **Voice Output (TTS)** – Uses the browser’s native SpeechSynthesis  
- **Cross-platform** – Works on Chrome & Edge on any OS  
- **Minimal Backend** – Simple Express proxy for OpenRouter  

---

## Tech Stack

| Layer | Tech Used | Purpose |
|-------|------------|----------|
| Frontend | React + Vite + Tailwind | User interface & voice logic |
| Backend | Node.js + Express | LLM request handling |
| AI Layer | OpenRouter (Mistral 7B Instruct) | Free LLM API |
| STT | Web Speech API | Convert voice → text |
| TTS | SpeechSynthesis API | Convert AI text → voice |

---

## Installation

### 1 Clone the repository
```bash
git clone https://github.com/mahmud-r-farhan/voice-llm-assistant
cd voice-llm-assistant
````

### 2 Setup backend

```bash
> backend
npm install
```

Create a `.env` file:

```
OPENROUTER_KEY=your_openrouter_api_key
```

Then run:

```bash
node server.js
```

Backend will start at `http://localhost:5000`.

### 3 Setup frontend

```bash
> frontend
npm install
npm run dev
```

Then open your browser at `http://localhost:5173`.

---


## Example Interaction

**You:** “Hey, what’s the capital of Japan?”
**AI:** (spoken aloud) “The capital of Japan is Tokyo!”

---

## Why This Matters

Most AI voice assistants depend on paid APIs like OpenAI TTS or ElevenLabs.
This project proves you can build a **functional, realistic AI voice chat** entirely **free**, using only open and browser-native technologies.

---

>  Mahmud :)