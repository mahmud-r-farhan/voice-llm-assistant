import { Volume2 } from "lucide-react";
import AudioWave from "./AudioWave";

const SpeakingModal = ({ isOpen, text }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-50 animate-slideUp">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm border-2 border-gray-200">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-black rounded-full flex items-center justify-center">
            <Volume2 className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 mb-2">AI Speaking</p>
            <AudioWave isActive={true} type="speaking" />
            <p className="text-xs text-gray-600 mt-3 line-clamp-2">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakingModal;