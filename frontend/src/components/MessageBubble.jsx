const MessageBubble = ({ message }) => {
  const isUser = message.type === "user";
  const isError = message.type === "error";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} animate-fadeIn`}>
      <div
        className={`max-w-[85%] md:max-w-md px-5 py-3 rounded-3xl shadow-lg ${
          isUser
            ? "bg-black text-white rounded-br-md"
            : isError
            ? "bg-red-50 text-red-800 border-2 border-red-200 rounded-bl-md"
            : "bg-white text-gray-900 border-2 border-gray-200 rounded-bl-md"
        }`}
      >
        <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words">
          {message.text}
        </p>
        <p className={`text-xs mt-2 ${isUser ? "text-gray-400" : "text-gray-500"}`}>
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;