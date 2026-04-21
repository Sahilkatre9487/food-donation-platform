import React, { useEffect, useState } from 'react';
interface LoadingScreenProps {
  onComplete: () => void;
}
export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#eff5e1] z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="font-extrabold text-[#2d3b36] text-4xl md:text-6xl [font-family:'Inter',Helvetica] mb-8 animate-pulse">
          ZEROhunger
        </div>
        <div className="w-80 h-1 bg-[#2d3b3620] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#2d3b36] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-4 text-[#2d3b36] text-sm font-medium">
          {progress}%
        </div>
      </div>
    </div>
  );
};