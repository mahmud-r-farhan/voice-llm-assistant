import { useEffect, useState } from "react";
import { X, Linkedin } from "lucide-react";

export default function SidePanel({ isOpen, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      const timeout = setTimeout(() => setVisible(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!isOpen && !visible) return null;

  return (
    <>
      {/* Overlay (fade in/out) */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-400 ease-out ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Side panel (smooth slide-in/out) */}
      <div
        className={`fixed right-0 top-0 h-full w-80 bg-white text-black z-50 flex flex-col rounded-l-xl border-l border-gray-300 shadow-2xl transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
          <h2 className="text-lg font-semibold text-gray-800">Developer Info:</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content */}
        <div className="p-6 flex flex-col items-center text-center space-y-4 flex-1">
          <img
            src="https://avatars.githubusercontent.com/u/114731414?v=4"
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-black shadow-md"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Mahmud Rahman
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Creative Developer specializing in MERN stack and AI-powered
              applications. Passionate about building intuitive UIs and
              optimizing career tools.
            </p>
          </div>

          <button
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/mahmud-r-farhan/",
                "_blank"
              )
            }
            className="mt-3 flex items-center justify-center gap-2 px-4 py-2 bg-black text-white hover:bg-gray-800 rounded-md shadow-md transition-all duration-200 cursor-pointer"
          >
            <Linkedin className="w-4 h-4" />
            <span>View LinkedIn</span>
          </button>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-300 p-4 text-center flex justify-center gap-3">
          <button
            onClick={() => window.open("https://gravatar.com/floawd", "_blank")}
            className="hover:opacity-70 transition-opacity duration-200 cursor-pointer"
          >
            <img
              src="https://docs.gravatar.com/wp-content/uploads/2025/02/avatar-default-20250210-256.png"
              alt="Gravatar"
              className="w-6 h-6"
            />
          </button>
          <button
            onClick={() =>
              window.open("https://github.com/mahmud-r-farhan", "_blank")
            }
            className="hover:opacity-70 transition-opacity duration-200 cursor-pointer"
          >
            <img
              src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_960_720.png"
              alt="GitHub"
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>
    </>
  );
}