import React from 'react';
import { motion } from 'motion/react';
import { Bike, Car } from 'lucide-react';

type VehicleType = 'motorcycle' | 'car';

interface VehicleToggleProps {
  value: VehicleType;
  onChange: (value: VehicleType) => void;
  disabled?: boolean;
}

export function VehicleToggle({ value, onChange, disabled }: VehicleToggleProps) {
  return (
    <div className="relative">
      {/* Outer glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/50 to-cyan-400/50 rounded-full blur-sm opacity-60" />
      
      {/* Main toggle container */}
      <div className="relative bg-black/80 backdrop-blur-sm border border-blue-400/30 rounded-full p-1 flex">
        {/* Background slider */}
        <motion.div
          className="absolute top-1 bottom-1 w-1/2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full shadow-lg shadow-blue-500/50"
          animate={{
            x: value === 'motorcycle' ? 0 : '100%'
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        />
        
        {/* Motorcycle option */}
        <button
          onClick={() => !disabled && onChange('motorcycle')}
          disabled={disabled}
          className={`
            relative z-10 px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 min-w-[120px] justify-center
            ${value === 'motorcycle' 
              ? 'text-black' 
              : 'text-blue-400 hover:text-blue-300'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          <Bike className="w-5 h-5" />
          <span className="font-medium text-sm">Motorcycle</span>
        </button>
        
        {/* Car option */}
        <button
          onClick={() => !disabled && onChange('car')}
          disabled={disabled}
          className={`
            relative z-10 px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 min-w-[120px] justify-center
            ${value === 'car' 
              ? 'text-black' 
              : 'text-blue-400 hover:text-blue-300'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          <Car className="w-5 h-5" />
          <span className="font-medium text-sm">Car</span>
        </button>
      </div>
    </div>
  );
}