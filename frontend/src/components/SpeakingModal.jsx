import { Volume2 } from "lucide-react";
import AudioWave from "./AudioWave";

const SpeakingModal = ({ isOpen, text }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-50 animate-slideUp">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm border-2 border-gray-200">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 rounded-full flex items-center justify-center">
              <img src="/profile.gif" alt="Profile" className="rounded-full w-13 h-13" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 mb-2"></p>
            <AudioWave isActive={true} type="speaking" />
          {/*  <p className="text-xs text-gray-600 mt-3 line-clamp-2">{text}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakingModal;