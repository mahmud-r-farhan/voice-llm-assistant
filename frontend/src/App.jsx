import React, { useState } from "react";

export default function App() {
  const [listening, setListening] = useState(false);
  const [userText, setUserText] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  // Speech to Text (Browser built-in)
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setUserText(text);
      recognition.stop();
      handleSend(text);
    };
    recognition.onend = () => setListening(false);
    recognition.start();
  };

  // Send to backend + play reply voice
  const handleSend = async (text) => {
    setLoading(true);
    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    setReply(data.text);
    setLoading(false);

    // Browser TTS voice output
    const utterance = new SpeechSynthesisUtterance(data.text);
    utterance.voice = speechSynthesis.getVoices().find(v => v.name.includes("Google US English")) || null;
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">🎙️ Free Voice AI Chat</h1>

      <button
        onClick={startListening}
        className={`px-6 py-3 rounded-lg font-semibold ${
          listening ? "bg-red-600" : "bg-blue-600"
        }`}
      >
        {listening ? "Listening..." : "🎤 Speak"}
      </button>

      {userText && <p className="mt-4 text-gray-300">You said: {userText}</p>}
      {loading && <p className="mt-2 text-yellow-400">Thinking...</p>}
      {reply && <p className="mt-4 text-green-400">LLM: {reply}</p>}
    </div>
  );
}