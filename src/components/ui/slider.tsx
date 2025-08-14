// components/ui/slider.tsx
import { useCallback, useEffect, useRef, useState } from "react";

interface DualRangeSliderProps {
  min?: number;
  max?: number;
  step?: number | "auto";
  value?: [number, number];
  onChange?: (newRange: [number, number]) => void;
  className?: string;
}

export const DualRangeSlider = ({ 
  min = 0, 
  max = 500, 
  step = "auto", 
  value = [0, 500], 
  onChange = () => {},
  className = "" 
}: DualRangeSliderProps) => {
  const [activeThumb, setActiveThumb] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Автоматически рассчитываем шаг, если указано "auto"
  const calculatedStep = step === "auto" ? Math.max(1, Math.floor((max - min) / 50)) : step;

  const calculateValue = useCallback((clientX: number) => {
    if (!sliderRef.current) return min;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    let rawValue = min + percentage * (max - min);
    
    // Применяем шаг
    if (calculatedStep > 1) {
      rawValue = Math.round(rawValue / calculatedStep) * calculatedStep;
    }
    
    return Math.max(min, Math.min(max, Math.round(rawValue)));
  }, [min, max, calculatedStep]);

  const handleMove = useCallback((clientX: number) => {
    if (activeThumb === null) return;
    
    const newValue = calculateValue(clientX);
    const newRange: [number, number] = [...value];
    
    if (activeThumb === 0) {
      newRange[0] = Math.min(newValue, value[1] - calculatedStep);
    } else {
      newRange[1] = Math.max(newValue, value[0] + calculatedStep);
    }
    
    onChange(newRange);
  }, [activeThumb, value, calculatedStep, onChange, calculateValue]);

  // Остальные обработчики остаются без изменений
  const handleMouseMove = useCallback((e: MouseEvent) => {
    handleMove(e.clientX);
  }, [handleMove]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    handleMove(e.touches[0].clientX);
  }, [handleMove]);

  const handleEnd = useCallback(() => {
    setActiveThumb(null);
  }, []);

  const handleStart = useCallback((index: number) => {
    setActiveThumb(index);
  }, []);

  useEffect(() => {
    if (activeThumb !== null) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleEnd);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleEnd);
      };
    }
  }, [activeThumb, handleMouseMove, handleTouchMove, handleEnd]);

  const leftPercent = ((value[0] - min) / (max - min)) * 100;
  const rightPercent = ((value[1] - min) / (max - min)) * 100;

  return (
    <div className={`relative ${className}`}>
      <div 
        ref={sliderRef}
        className="relative h-8 cursor-pointer"
        onMouseDown={(e) => {
          const clickValue = calculateValue(e.clientX);
          const isCloserToLeft = Math.abs(clickValue - value[0]) < Math.abs(clickValue - value[1]);
          handleStart(isCloserToLeft ? 0 : 1);
        }}
        onTouchStart={(e) => {
          const clickValue = calculateValue(e.touches[0].clientX);
          const isCloserToLeft = Math.abs(clickValue - value[0]) < Math.abs(clickValue - value[1]);
          handleStart(isCloserToLeft ? 0 : 1);
        }}
      >
        <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-gray-200 rounded-full transform -translate-y-1/2">
          <div 
            className="absolute h-1.5 bg-black rounded-full"
            style={{
              left: `${leftPercent}%`,
              width: `${rightPercent - leftPercent}%`
            }}
          />
        </div>
        
        <div
          className={`absolute w-6 h-6 bg-white border-2 border-black rounded-full transform -translate-x-1/2 -translate-y-1/2 top-1/2 shadow-md z-10 ${
            activeThumb === 0 ? 'cursor-grabbing scale-110' : 'cursor-grab'
          }`}
          style={{ left: `${leftPercent}%` }}
          onMouseDown={(e) => {
            e.stopPropagation();
            handleStart(0);
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            handleStart(0);
          }}
        />
        
        <div
          className={`absolute w-6 h-6 bg-white border-2 border-black rounded-full transform -translate-x-1/2 -translate-y-1/2 top-1/2 shadow-md z-10 ${
            activeThumb === 1 ? 'cursor-grabbing scale-110' : 'cursor-grab'
          }`}
          style={{ left: `${rightPercent}%` }}
          onMouseDown={(e) => {
            e.stopPropagation();
            handleStart(1);
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            handleStart(1);
          }}
        />
      </div>
    </div>
  );
};