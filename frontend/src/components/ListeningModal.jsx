import { Mic, X } from "lucide-react";
import AudioWave from "./AudioWave";

const ListeningModal = ({ isOpen, onClose, transcript }) => {
  if (!isOpen) return null;

  return (
    <>
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative animate-scaleIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="text-center">
          <div className="mb-6 inline-flex items-center justify-center">
           <img src="/profile.gif" alt="Profile" className="rounded-full w-20 h-20 shadow" />
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-2">Listening...</h3>
          <p className="text-gray-600 mb-6">Speak clearly into your microphone</p>

          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <AudioWave isActive={true} type="listening" />
          </div>
           {/* Uncomment to show transcript */}
           {/*
          {transcript && (
            <div className="bg-black text-white rounded-2xl p-4 text-left">
              <p className="text-sm font-medium mb-1 text-gray-400">Transcript:</p>
              <p className="text-base whitespace-pre-wrap break-words">{transcript}</p>
             
            </div>
          )}
          */}
          <button
            onClick={onClose}
            className="mt-6 w-full py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-full transition-colors"
          >
            Stop Listening
          </button>
        </div>
      </div>
      
    </div>
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 rounded-full shadow-lg animate-fadeIn">
      <p className="text-base whitespace-pre-wrap break-words z-50 text-gray-200/45">{transcript}</p>
    </div>
    </>
  );
};

export default ListeningModal;