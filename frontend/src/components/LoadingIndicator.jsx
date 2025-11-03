const LoadingIndicator = () => (
  <div className="flex justify-start animate-fadeIn">
    <div className="bg-white border-2 border-gray-200 px-5 py-3 rounded-3xl rounded-bl-md shadow-lg">
      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-gray-900 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-gray-900 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
          <div className="w-2 h-2 bg-gray-900 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
        </div>
        <span className="text-sm text-gray-600">Thinking...</span>
      </div>
    </div>
  </div>
);

export default LoadingIndicator;