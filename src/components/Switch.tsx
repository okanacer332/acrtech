interface SwitchProps {
  mode: 'design' | 'code';
  onToggle: (mode: 'design' | 'code') => void;
}

export function Switch({ mode, onToggle }: SwitchProps) {
  return (
    // dir="ltr" ekleyerek bu bileşeni sayfanın genel yönünden (RTL) koruyoruz.
    // Böylece Design solda, Code sağda sabit kalıyor ve animasyon şaşmıyor.
    <div 
      dir="ltr" 
      className="relative inline-flex items-center bg-white/10 backdrop-blur-md rounded-full p-1.5 sm:p-2 border border-white/20 shadow-2xl"
    >
      {/* Background Slider */}
      <div
        className={`absolute top-1.5 sm:top-2 bottom-1.5 sm:bottom-2 w-[calc(50%-3px)] sm:w-[calc(50%-4px)] bg-white rounded-full shadow-lg transition-all duration-500 ease-out ${
          mode === 'design' ? 'left-1.5 sm:left-2' : 'left-[calc(50%+1.5px)] sm:left-[calc(50%+2px)]'
        }`}
      />
      
      {/* Design Button */}
      <button
        onClick={() => onToggle('design')}
        className={`relative z-10 px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 rounded-full transition-all duration-300 ${
          mode === 'design'
            ? 'text-purple-900'
            : 'text-white hover:text-purple-200'
        }`}
      >
        <span className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl">
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
            />
          </svg>
          <span className="hidden sm:inline">Design</span>
        </span>
      </button>
      
      {/* Code Button */}
      <button
        onClick={() => onToggle('code')}
        className={`relative z-10 px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 rounded-full transition-all duration-300 ${
          mode === 'code'
            ? 'text-cyan-900'
            : 'text-white hover:text-cyan-200'
        }`}
      >
        <span className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl">
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
          <span className="hidden sm:inline">Code</span>
        </span>
      </button>
    </div>
  );
}