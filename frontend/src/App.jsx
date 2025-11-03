import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Send, Volume2, VolumeX, X } from "lucide-react";
import ListeningModal from "./components/ListeningModal";
import SpeakingModal from "./components/SpeakingModal";
import LoadingIndicator from "./components/LoadingIndicator";
import MessageBubble from "./components/MessageBubble";
import EmptyState from "./components/EmptyState";
import SidePanel from "./components/SidePanel";

export default function App() {
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [history, setHistory] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [muted, setMuted] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");
  const [voices, setVoices] = useState([]);
  const [wasListening, setWasListening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    const loadVoices = () => {
      setVoices(speechSynthesis.getVoices());
    };
    speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onstart = () => {
      setListening(true);
      setInterimTranscript("");
    };
    
    recognition.onresult = (event) => {
      let interim = "";
      let final = "";
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
     //   console.log("Transcript:", transcript);
        if (event.results[i].isFinal) {
          final += transcript;
        } else {
          interim += transcript;
        }
      }
      
      setInterimTranscript(interim || final);
      
      if (final.trim()) {
        handleSend(final.trim());
        setInterimTranscript(""); // Reset for next utterance
      }
    };
    
    recognition.onerror = (err) => {
      console.error("Recognition error:", err);
      setListening(false);
      setInterimTranscript("");
    };
    
    recognition.onend = () => {
      setListening(false);
      setInterimTranscript("");
      // Do not auto-restart here; handle via pause/resume logic
    };
    
    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setListening(false);
    setInterimTranscript("");
    setWasListening(false);
  };

  const pauseListening = () => {
    if (listening) {
      setWasListening(true);
      stopListening();
    }
  };

  const resumeListening = () => {
    if (wasListening && !listening) {
      startListening();
      setWasListening(false);
    }
  };

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const userMessage = { 
      type: "user", 
      text: text.trim(), 
      timestamp: new Date() 
    };
    
    setHistory(prev => [...prev, userMessage]);
    setInputValue("");
    setLoading(true);

    // Prepare messages for API (map history to roles)
    const apiMessages = history.map(msg => ({
      role: msg.type === "user" ? "user" : "assistant",
      content: msg.text
    }));
    apiMessages.push({ role: "user", content: text });

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages, stream: true }),
      });
      
      if (!res.ok) throw new Error("Failed to get response");

      // Add empty AI message
      setHistory(prev => [...prev, { type: "ai", text: "", timestamp: new Date() }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let aiText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Process SSE lines
        let lineEnd;
        while ((lineEnd = buffer.indexOf("\n")) !== -1) {
          const line = buffer.slice(0, lineEnd).trim();
          buffer = buffer.slice(lineEnd + 1);

          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              const delta = parsed.choices?.[0]?.delta?.content;
              if (delta) {
                aiText += delta;
                // Update last message incrementally
                setHistory(prev => {
                  const updated = [...prev];
                  updated[updated.length - 1].text = aiText;
                  return updated;
                });
              }
            } catch (e) {
              // Ignore malformed lines (e.g., SSE comments)
            }
          }
        }
      }

      // After stream ends, start TTS if not muted
      if (!muted && aiText.trim()) {
        speakText(aiText.trim());
      }
    } catch (error) {
      console.error(error);
      const errorMessage = { 
        type: "error", 
        text: "Sorry, I couldn't process that. Please try again.", 
        timestamp: new Date() 
      };
      setHistory(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const speakText = (text) => {
    speechSynthesis.cancel();
    pauseListening();
    setSpeaking(true);
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices.find(v => v.name.includes("Google US English")) || voices[0];
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onend = () => {
      setSpeaking(false);
      resumeListening(); 
    };
    utterance.onerror = () => {
      setSpeaking(false);
      resumeListening();
    };
    
    speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setSpeaking(false);
    resumeListening();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputValue);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 md:py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center"
               onClick={() => setIsOpen(true)}
              >
                <img src="/profile.gif" alt="Profile" className="rounded-full w-13 h-auto" 
                
                />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
                  Voice AI Assistant
                  {speaking && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
                </h1>
                <p className="text-xs md:text-sm text-gray-600 hidden sm:block">
                  Speak naturally or type your message
                </p>
              </div>
            </div>
            
            <button
              onClick={() => {
                setMuted(!muted);
                if (speaking) stopSpeaking();
              }}
              className="p-2 md:p-3 rounded-full hover:bg-gray-100 transition-colors"
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? 
                <VolumeX className="w-5 h-5 md:w-6 md:h-6 text-gray-600" /> : 
                <Volume2 className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />
              }
            </button>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 py-6">
          {history.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-4 pb-4">
              {history.map((msg, idx) => (
                <MessageBubble key={idx} message={msg} />
              ))}
              {loading && <LoadingIndicator />}
              <div ref={chatEndRef} />
            </div>
          )}
        </div>
      </main>
   

      {/* Input Area */}
      <footer className="bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 py-4 md:py-5">
          <div className="flex items-center gap-2 md:gap-3">
            {/* Voice Button */}
            <button
              onClick={listening ? stopListening : startListening}
              disabled={loading}
              className={`p-3 md:p-4 rounded-full transition-all duration-300 flex-shrink-0 ${
                listening
                  ? "bg-red-500 hover:bg-red-600 scale-110"
                  : "bg-black hover:bg-gray-800 hover:scale-105"
              } disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg`}
              aria-label={listening ? "Stop listening" : "Start listening"}
            >
              {listening ? 
                <MicOff className="w-5 h-5 md:w-6 md:h-6 text-white" /> : 
                <Mic className="w-5 h-5 md:w-6 md:h-6 text-white" />
              }
            </button>

            {/* Text Input */}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={loading || listening}
              className="flex-1 px-4 py-3 md:py-3.5 bg-gray-100 border-2 border-gray-200 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:border-black focus:bg-white disabled:opacity-50 transition-all text-sm md:text-base"
            />

            {/* Send Button */}
            <button
              onClick={() => handleSend(inputValue)}
              disabled={loading || listening || !inputValue.trim()}
              className="p-3 md:p-4 rounded-full bg-black hover:bg-gray-800 hover:scale-105 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex-shrink-0"
              aria-label="Send message"
            >
              <Send className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ListeningModal 
        isOpen={listening} 
        onClose={stopListening}
        transcript={interimTranscript}
      />
      
      <SpeakingModal 
        isOpen={speaking && !muted} 
        text={history[history.length - 1]?.text || ""}
      />
      <SidePanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}