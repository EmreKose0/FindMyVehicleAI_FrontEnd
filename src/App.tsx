import React from 'react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { VehicleToggle } from './components/VehicleToggle';
import { VehicleForm } from './components/VehicleForm';

const bmwHeadlightsDim = new URL('./assets/6ccac59bf29daa23e0418ef915127dd1dc627eea.png', import.meta.url).href;
const bmwHeadlightsBright = new URL('./assets/af9a50892b00822ddb71147121025148988642b7.png', import.meta.url).href;

type VehicleType = 'motorcycle' | 'car';

const backgroundImages = {
  motorcycle: {
    default: bmwHeadlightsDim,
    activated: bmwHeadlightsBright
  },
  car: {
    default: bmwHeadlightsDim,
    activated: bmwHeadlightsBright
  }
};

export default function App() {
  const [vehicleType, setVehicleType] = useState<VehicleType>('motorcycle');
  const [isHoveringSubmit, setIsHoveringSubmit] = useState(false);

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form submitted');
  };

  const handleSubmitHover = (hovering: boolean) => {
    setIsHoveringSubmit(hovering);
  };

  const currentBackground = isHoveringSubmit 
    ? backgroundImages[vehicleType].activated
    : backgroundImages[vehicleType].default;

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Background Images with glassmorphism transition */}
      <div className="absolute inset-0">
        {/* Default background image */}
        <motion.div 
          className="absolute inset-0 backdrop-blur-[0.5px]"
          animate={{ opacity: isHoveringSubmit ? 0 : 1 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <img
            src={backgroundImages[vehicleType].default}
            alt="BMW headlights default"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10" />
        </motion.div>
        
        {/* Activated background image with enhanced glow */}
        <motion.div 
          className="absolute inset-0 backdrop-blur-[0.5px]"
          animate={{ opacity: isHoveringSubmit ? 1 : 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <img
            src={backgroundImages[vehicleType].activated}
            alt="BMW headlights activated"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/15 via-blue-500/10 to-purple-600/15" />
          <div className="absolute inset-0 bg-gradient-radial from-blue-400/20 via-transparent to-transparent animate-pulse" />
        </motion.div>
        
        {/* Enhanced glassmorphism overlay */}
        <motion.div 
          className="absolute inset-0 backdrop-blur-[1px]"
          animate={{ 
            background: isHoveringSubmit 
              ? 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(59,130,246,0.05) 50%, rgba(0,0,0,0.2) 100%)'
              : 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.4) 100%)'
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </div>

      {/* Enhanced glassmorphism glow effects */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isHoveringSubmit ? 1 : 0,
          scale: isHoveringSubmit ? 1 : 0.8
        }}
        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-radial from-blue-400/20 via-cyan-400/10 to-transparent backdrop-blur-[2px]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </motion.div>

      {/* Floating glassmorphism particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full backdrop-blur-sm"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [-20, -40, -20],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header with Toggle */}
        <div className="flex justify-center pt-8 md:pt-12">
          <VehicleToggle 
            value={vehicleType} 
            onChange={setVehicleType}
            disabled={true}
          />
        </div>

        {/* Main Content - Form at bottom with proper spacing */}
        <div className="flex justify-center px-4 pb-16 mt-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-6xl"
          >
            <VehicleForm 
              vehicleType={vehicleType}
              onSubmit={handleSubmit}
              onSubmitHover={handleSubmitHover}
            />
          </motion.div>
        </div>
      </div>

      {/* Enhanced glassmorphism grid overlay */}
      <motion.div 
        className="absolute inset-0 pointer-events-none backdrop-blur-[0.5px]"
        animate={{ 
          opacity: isHoveringSubmit ? 0.15 : 0.08 
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 211, 238, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-400/5" />
      </motion.div>
    </div>
  );
}