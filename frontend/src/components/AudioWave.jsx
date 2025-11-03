const AudioWave = ({ isActive, type = "listening" }) => {
  const bars = type === "listening" ? 5 : 7;
  
  return (
    <div className="flex items-center justify-center gap-1">
      {[...Array(bars)].map((_, i) => (
        <div
          key={i}
          className={`w-1 rounded-full transition-all duration-300 ${
            type === "listening" 
              ? "bg-black" 
              : "bg-black"
          }`}
          style={{
            height: isActive ? `${20 + Math.random() * 30}px` : "20px",
            animation: isActive ? `wave 0.6s ease-in-out infinite` : "none",
            animationDelay: `${i * 0.1}s`
          }}
        />
      ))}
    </div>
  );
};

export default AudioWave;