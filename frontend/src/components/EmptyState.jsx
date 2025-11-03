import { Mic } from "lucide-react";

const EmptyState = () => (
  <div className="flex items-center justify-center h-full">
    <div className="text-center px-4 py-12">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
        <Mic className="w-10 h-10 text-gray-400" />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
        Start a Conversation
      </h2>
      <p className="text-gray-600 mb-2 text-sm md:text-base">
        Tap the microphone to speak or type your message below
      </p>
      <p className="text-gray-500 text-xs md:text-sm">
        Your voice AI assistant is ready to help
      </p>
    </div>
  </div>
);

export default EmptyState;