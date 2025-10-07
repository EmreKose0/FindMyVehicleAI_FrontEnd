import React from 'react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { Search, DollarSign, Gauge, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { API_ENDPOINT } from '../config/api.js';

type VehicleType = 'motorcycle' | 'car';

interface VehicleFormProps {
  vehicleType: VehicleType;
  onSubmit: () => void;
  onSubmitHover: (hovering: boolean) => void;
}

const vehicleOptions = {
  motorcycle: [
    { value: 'naked', label: 'Naked' },
    { value: 'cruiser', label: 'Cruiser' },
    { value: 'sport', label: 'Sport' },
    { value: 'touring', label: 'Touring' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'retro', label: 'Retro' },
    { value: 'scrambler', label: 'Scrambler' },
    { value: 'scooter', label: 'Scooter' },
    { value: 'electric', label: 'Electric' }
  ],
  car: [
    { value: 'sedan', label: 'Sedan' },
    { value: 'suv', label: 'SUV' },
    { value: 'hatchback', label: 'Hatchback' },
    { value: 'coupe', label: 'Coupe' },
    { value: 'convertible', label: 'Convertible' }
  ]
};

// Loading Portal Component
function LoadingPortal({ isVisible, vehicleType }: { isVisible: boolean, vehicleType: VehicleType }) {
  if (!isVisible) return null;

  const loadingElement = (
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(8px)',
        zIndex: '2147483647', // Maximum z-index value
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0',
        padding: '0',
        boxSizing: 'border-box',
        fontFamily: 'inherit'
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(24px)',
          border: '2px solid rgba(59, 130, 246, 0.7)',
          borderRadius: '16px',
          padding: '32px',
          maxWidth: '28rem',
          width: 'auto',
          margin: '0',
          boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.4)',
          position: 'relative',
          color: 'white',
          boxSizing: 'border-box',
          textAlign: 'center'
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <motion.h2 
            style={{ 
              fontSize: '1.875rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #60a5fa, #22d3ee, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '16px'
            }}
            animate={{ 
              backgroundPosition: ['0%', '100%', '0%'] 
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            ANALYZING
          </motion.h2>
          <p style={{ 
            color: '#bfdbfe', 
            fontSize: '1.125rem',
            margin: '0',
            textAlign: 'center'
          }}>
            Please wait while we find your perfect {vehicleType === 'motorcycle' ? 'bike' : 'car'}...
          </p>
        </div>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: '32px' 
        }}>
          {/* Cyberpunk Loading Animation */}
          <div style={{ position: 'relative', width: '96px', height: '96px' }}>
            {/* Outer rotating ring */}
            <motion.div
              style={{
                position: 'absolute',
                inset: '0',
                border: '4px solid transparent',
                borderTop: '4px solid #60a5fa',
                borderRight: '4px solid #60a5fa',
                borderRadius: '50%'
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Middle rotating ring */}
            <motion.div
              style={{
                position: 'absolute',
                inset: '8px',
                border: '3px solid transparent',
                borderTop: '3px solid #22d3ee',
                borderLeft: '3px solid #22d3ee',
                borderRadius: '50%'
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Inner pulsing core */}
            <motion.div
              style={{
                position: 'absolute',
                inset: '24px',
                background: 'linear-gradient(to right, #3b82f6, #22d3ee)',
                borderRadius: '50%'
              }}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Status Text */}
          <motion.div
            style={{ textAlign: 'center' }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '12px',
              marginBottom: '12px'
            }}>
              <div style={{ 
                width: '8px', 
                height: '8px', 
                backgroundColor: '#4ade80', 
                borderRadius: '50%',
                animation: 'pulse 1s infinite'
              }}></div>
              <p style={{ 
                color: '#93c5fd', 
                fontSize: '1rem', 
                fontWeight: '500',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                margin: '0'
              }}>
                AI Engine Processing
              </p>
              <div style={{ 
                width: '8px', 
                height: '8px', 
                backgroundColor: '#22d3ee', 
                borderRadius: '50%',
                animation: 'pulse 1s infinite'
              }}></div>
            </div>
            
            <p style={{ 
              color: '#a3a3a3', 
              fontSize: '0.875rem',
              margin: '0'
            }}>
              Neural networks are matching your preferences...
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );

  return createPortal(loadingElement, document.body);
}

export function VehicleForm({ vehicleType, onSubmit, onSubmitHover }: VehicleFormProps) {
  const [formData, setFormData] = useState({
    budget: '',
    condition: '',
    technologyLevel: '',
    soundQuality: '',
    vehicleSubtype: '',
    fuelConsumption: '',
    mileage: '',
    year: ''
  });
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

  // Validation function
  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.budget) {
      errors.budget = 'Budget range is required';
    }
    
    if (!formData.vehicleSubtype) {
      errors.vehicleSubtype = 'Vehicle type is required';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Generate match percentage based on vehicle ranking
  const getMatchPercentage = (index: number) => {
    if (index === 0) {
      // First vehicle: 90-100%
      return Math.floor(Math.random() * 11) + 90; // 90-100
    } else if (index === 1) {
      // Second vehicle: 80-90%
      return Math.floor(Math.random() * 11) + 80; // 80-90
    } else {
      // Third vehicle: 70-80%
      return Math.floor(Math.random() * 11) + 70; // 70-80
    }
  };

  // Get colors based on match percentage
  const getMatchColors = (percentage: number) => {
    if (percentage >= 90) {
      return {
        background: 'linear-gradient(to right, rgba(34, 197, 94, 0.25), rgba(16, 185, 129, 0.25))',
        borderColor: 'rgba(34, 197, 94, 0.6)',
        textGradient: 'linear-gradient(135deg, #4ade80, #22d3ee, #10b981)',
        glowColor: 'rgba(74, 222, 128, 0.8)'
      };
    } else if (percentage >= 80) {
      return {
        background: 'linear-gradient(to right, rgba(245, 158, 11, 0.25), rgba(217, 119, 6, 0.25))',
        borderColor: 'rgba(245, 158, 11, 0.6)',
        textGradient: 'linear-gradient(135deg, #f59e0b, #22d3ee, #d97706)',
        glowColor: 'rgba(245, 158, 11, 0.8)'
      };
    } else {
      return {
        background: 'linear-gradient(to right, rgba(168, 85, 247, 0.25), rgba(147, 51, 234, 0.25))',
        borderColor: 'rgba(168, 85, 247, 0.6)',
        textGradient: 'linear-gradient(135deg, #a855f7, #22d3ee, #9333ea)',
        glowColor: 'rgba(168, 85, 247, 0.8)'
      };
    }
  };

  // Demo data for motorcycles
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Map budget value to display text
      const budgetMap: {[key: string]: string} = {
        'under-100k': 'Under 100,000 TL',
        '100k-250k': '100,000 - 250,000 TL',
        '250k-500k': '250,000 - 500,000 TL',
        '500k-750k': '500,000 - 750,000 TL',
        '750k-900k': '750,000 - 900,000 TL',
        'over-900k': 'Over 900,000 TL'
      };

      // Map vehicle subtype to display text with proper capitalization
      const subtypeMap: {[key: string]: string} = {
        'naked': 'Naked',
        'cruiser': 'Cruiser',
        'sport': 'Sport',
        'touring': 'Touring',
        'adventure': 'Adventure',
        'sedan': 'Sedan',
        'suv': 'SUV',
        'hatchback': 'Hatchback',
        'coupe': 'Coupe',
        'convertible': 'Convertible'
      };

      // Backend POST request - Only 3 required fields
      const requestBody = {
        vehicleType: vehicleType, // 'motorcycle' or 'car'
        budget: budgetMap[formData.budget] || formData.budget, // e.g., "500,000 - 750,000 TL"
        vehicleSubtype: subtypeMap[formData.vehicleSubtype] || formData.vehicleSubtype // e.g., "Adventure"
      };

      console.log('====================================');
      console.log('🚀 BACKEND REQUEST - FIND MY VEHICLE');
      console.log('====================================');
      console.log('Vehicle Type:', requestBody.vehicleType);
      console.log('Budget:', requestBody.budget);
      console.log('Vehicle Subtype:', requestBody.vehicleSubtype);
      console.log('====================================');
      console.log('Full Request Body:', JSON.stringify(requestBody, null, 2));
      console.log('====================================');

      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      console.log('====================================');
      console.log('📥 BACKEND RESPONSE - STATUS');
      console.log('====================================');
      console.log('Status Code:', response.status);
      console.log('Status Text:', response.statusText);
      console.log('OK:', response.ok);
      console.log('====================================');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const backendResults = await response.json();
      
      console.log('====================================');
      console.log('📦 BACKEND RESPONSE - DATA');
      console.log('====================================');
      console.log('Full Response:', JSON.stringify(backendResults, null, 2));
      console.log('------------------------------------');
      if (backendResults.recommendations) {
        console.log('Number of Vehicles:', backendResults.recommendations.length);
        console.log('Total Found:', backendResults.total_found);
        console.log('Recommendations:', backendResults.recommendations);
        backendResults.recommendations.forEach((vehicle: any, index: number) => {
          console.log(`\n--- Vehicle ${index + 1} ---`);
          console.log('Brand:', vehicle.brand);
          console.log('Model:', vehicle.model);
          console.log('Price:', vehicle.price);
          console.log('Engine:', vehicle.engine);
          console.log('Fuel Consumption:', vehicle.fuelConsumption);
        });
      } else {
        console.log('⚠️ No recommendations array in response');
      }
      console.log('====================================');
      
      setResults(backendResults.recommendations || []);
      
    } catch (error) {
      console.log('====================================');
      console.log('❌ API ERROR');
      console.log('====================================');
      console.error('Error Type:', error instanceof Error ? error.name : typeof error);
      console.error('Error Message:', error instanceof Error ? error.message : String(error));
      console.error('Full Error:', error);
      console.log('====================================');
      
      // Show empty results if API fails
      setResults([]);
      
      // Optional: Show user-friendly error message
      alert('Araç önerileri yüklenirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
    
    setIsLoading(false);
    onSubmit();
  };

  const currentOptions = vehicleOptions[vehicleType];

  return (
    <div className="relative w-full">
      {/* Results Cards - Replace form when visible */}
      {results.length > 0 ? (
        <div className="w-full relative">
          {/* Background Effect - Same as main form */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-3xl"
            animate={{ 
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-row w-full justify-center items-stretch overflow-x-auto mb-32 px-8"
            style={{ gap: '3rem' }}
          >
          {[...results].sort((a, b) => {
            // Custom sort: ID 2 (left), ID 1 (center), ID 3 (right)
            if (a.id === 2) return -1;  // ID 2 goes first (left)
            if (b.id === 2) return 1;
            if (a.id === 1) return -1;  // ID 1 goes second (center)
            if (b.id === 1) return 1;
            return a.id - b.id;  // ID 3 and others go last (right)
          }).map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 80, rotateX: 25, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.15 * index, 
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              style={{
                position: 'relative',
                flexShrink: 0,
                width: '450px',
                minWidth: '450px'
              }}
            >
              {/* Outer Glow Effect */}
              <motion.div 
                style={{
                  position: 'absolute',
                  top: '-16px',
                  left: '-16px',
                  right: '-16px',
                  bottom: '-16px',
                  background: 'linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(34, 211, 238, 0.3), rgba(168, 85, 247, 0.2), rgba(249, 115, 22, 0.25))',
                  borderRadius: '24px',
                  filter: 'blur(24px)',
                  opacity: 0.6
                }}
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
              
              {/* Main Card - Enhanced Glassmorphism like main form */}
              <div style={{
                position: 'relative',
                background: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(24px)',
                border: '2px solid rgba(59, 130, 246, 0.5)',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 15px 45px rgba(0,0,0,0.6)'
              }}>
                {/* Animated Border */}
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: '0',
                    background: 'linear-gradient(to right, rgba(59, 130, 246, 0.4), rgba(34, 211, 238, 0.4), rgba(168, 85, 247, 0.4), rgba(249, 115, 22, 0.4))',
                    borderRadius: '16px',
                    backgroundSize: '300% 300%',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'xor',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    padding: '2px'
                  }}
                  animate={{ 
                    backgroundPosition: ['0%', '100%', '0%']
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                />
                
                {/* Cyberpunk accent lines */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
                <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                
                {/* Content */}
                <div style={{ position: 'relative', padding: '40px' }}>
                  {/* Header Section */}
                  <div style={{ 
                    textAlign: 'center',
                    marginBottom: '32px' 
                  }}>
                    {/* Medal Icon based on ID */}
                    {(() => {
                      const getMedalConfig = (id: number) => {
                        if (id === 1) {
                          return {
                            emoji: '🥇',
                            gradient: 'linear-gradient(to bottom right, rgba(255, 215, 0, 0.5), rgba(255, 193, 7, 0.5), rgba(255, 152, 0, 0.4))',
                            border: '3px solid rgba(255, 215, 0, 0.8)',
                            glow: 'rgba(255, 215, 0, 0.6)',
                            label: 'GOLD',
                            color: '#ffd700'
                          };
                        } else if (id === 2) {
                          return {
                            emoji: '🥈',
                            gradient: 'linear-gradient(to bottom right, rgba(192, 192, 192, 0.5), rgba(169, 169, 169, 0.5), rgba(128, 128, 128, 0.4))',
                            border: '3px solid rgba(192, 192, 192, 0.8)',
                            glow: 'rgba(192, 192, 192, 0.6)',
                            label: 'SILVER',
                            color: '#c0c0c0'
                          };
                        } else {
                          return {
                            emoji: '🥉',
                            gradient: 'linear-gradient(to bottom right, rgba(205, 127, 50, 0.5), rgba(184, 115, 51, 0.5), rgba(150, 90, 40, 0.4))',
                            border: '3px solid rgba(205, 127, 50, 0.8)',
                            glow: 'rgba(205, 127, 50, 0.6)',
                            label: 'BRONZE',
                            color: '#cd7f32'
                          };
                        }
                      };
                      const medal = getMedalConfig(vehicle.id);
                      
                      return (
                        <>
                          <motion.div 
                            style={{
                              fontSize: '5rem',
                              margin: '0 auto 16px auto',
                              display: 'inline-block',
                              filter: `drop-shadow(0 0 20px ${medal.glow})`
                            }}
                            whileHover={{ scale: 1.2, rotate: 15 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            animate={{
                              filter: [
                                `drop-shadow(0 0 20px ${medal.glow})`,
                                `drop-shadow(0 0 35px ${medal.glow})`,
                                `drop-shadow(0 0 20px ${medal.glow})`
                              ]
                            }}
                          >
                            {medal.emoji}
                          </motion.div>
                          
                          {/* Medal Label */}
                          <motion.div
                            style={{
                              fontSize: '0.875rem',
                              fontWeight: '800',
                              color: medal.color,
                              textTransform: 'uppercase',
                              letterSpacing: '0.15em',
                              marginBottom: '16px',
                              textShadow: `0 0 10px ${medal.glow}`,
                              filter: `drop-shadow(0 0 8px ${medal.glow})`
                            }}
                            animate={{
                              opacity: [0.7, 1, 0.7],
                              filter: [
                                `drop-shadow(0 0 8px ${medal.glow})`,
                                `drop-shadow(0 0 16px ${medal.glow})`,
                                `drop-shadow(0 0 8px ${medal.glow})`
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          >
                            ⭐ {medal.label} ⭐
                          </motion.div>
                        </>
                      );
                    })()}
                    
                    {/* Vehicle Info */}
                    <div>
                      <motion.h3 
                        style={{
                          fontSize: '2.25rem',
                          fontWeight: 'bold',
                          background: 'linear-gradient(to right, #ffffff, #a7f3d0, #bfdbfe)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          marginBottom: '12px',
                          textAlign: 'center'
                        }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        {vehicle.brand}
                      </motion.h3>
                      <motion.p 
                        style={{
                          fontSize: '1.5rem',
                          color: '#67e8f9',
                          fontWeight: '600',
                          marginBottom: '12px',
                          textAlign: 'center'
                        }}
                        animate={{ opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        {vehicle.model}
                      </motion.p>
                    </div>
                  </div>
                  
                  {/* Stats Grid */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    marginBottom: '28px'
                  }}>
                    {/* Price */}
                    <motion.div 
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        border: '2px solid rgba(251, 191, 36, 0.4)',
                        borderRadius: '16px',
                        padding: '20px',
                        backdropFilter: 'blur(8px)'
                      }}
                      whileHover={{ scale: 1.02, borderColor: "rgba(251, 191, 36, 0.7)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '10px'
                      }}>
                        <span style={{
                          color: '#fbbf24',
                          fontSize: '1rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          fontWeight: '700'
                        }}>💰 PRICE</span>
                      </div>
                      <motion.div 
                        style={{
                          fontSize: '1.75rem',
                          fontWeight: '900',
                          background: 'linear-gradient(to right, #fbbf24, #f59e0b)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          textAlign: 'center',
                          filter: 'drop-shadow(0 0 10px rgba(251, 191, 36, 0.6))',
                          marginTop: '4px'
                        }}
                        animate={{ 
                          scale: [1, 1.05, 1],
                          filter: [
                            'drop-shadow(0 0 10px rgba(251, 191, 36, 0.6))',
                            'drop-shadow(0 0 20px rgba(251, 191, 36, 0.9))',
                            'drop-shadow(0 0 10px rgba(251, 191, 36, 0.6))'
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        ₺{vehicle.price}
                      </motion.div>
                    </motion.div>
                    
                    {/* Engine & Fuel Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      {/* Engine */}
                      <motion.div 
                        style={{
                          backgroundColor: 'rgba(0, 0, 0, 0.6)',
                          border: '2px solid rgba(74, 222, 128, 0.4)',
                          borderRadius: '16px',
                          padding: '20px',
                          backdropFilter: 'blur(8px)'
                        }}
                        whileHover={{ scale: 1.02, borderColor: "rgba(74, 222, 128, 0.7)" }}
                        transition={{ duration: 0.2 }}
                      >
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '10px'
                        }}>
                          <span style={{
                            color: '#4ade80',
                            fontSize: '1rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            fontWeight: '700'
                          }}>⚙️ ENGINE</span>
                        </div>
                        <div style={{
                          fontSize: '1.5rem',
                          fontWeight: '700',
                          color: '#ffffff',
                          textAlign: 'center',
                          textShadow: '0 0 15px rgba(74, 222, 128, 0.5)',
                          marginTop: '4px'
                        }}>{vehicle.engine}</div>
                      </motion.div>
                      
                      {/* Fuel */}
                      <motion.div 
                        style={{
                          backgroundColor: 'rgba(0, 0, 0, 0.6)',
                          border: '2px solid rgba(96, 165, 250, 0.4)',
                          borderRadius: '16px',
                          padding: '20px',
                          backdropFilter: 'blur(8px)'
                        }}
                        whileHover={{ scale: 1.02, borderColor: "rgba(96, 165, 250, 0.7)" }}
                        transition={{ duration: 0.2 }}
                      >
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '10px'
                        }}>
                          <span style={{
                            color: '#60a5fa',
                            fontSize: '1rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            fontWeight: '700'
                          }}>⛽ FUEL</span>
                        </div>
                        <div style={{
                          fontSize: '1.5rem',
                          fontWeight: '700',
                          color: '#ffffff',
                          textAlign: 'center',
                          textShadow: '0 0 15px rgba(96, 165, 250, 0.5)',
                          marginTop: '4px'
                        }}>{vehicle.fuelConsumption} L</div>
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Match Section */}
                  {(() => {
                    const matchPercentage = getMatchPercentage(index);
                    const colors = getMatchColors(matchPercentage);
                    return (
                      <motion.div 
                        style={{
                          background: colors.background,
                          border: `2px solid ${colors.borderColor}`,
                          borderRadius: '12px',
                          padding: '20px',
                          backdropFilter: 'blur(8px)',
                          boxShadow: `0 0 20px ${colors.borderColor.replace('0.6', '0.3')}`
                        }}
                        animate={{ 
                          borderColor: [colors.borderColor, colors.borderColor.replace('0.6', '0.8'), colors.borderColor],
                          boxShadow: [
                            `0 0 20px ${colors.borderColor.replace('0.6', '0.3')}`, 
                            `0 0 30px ${colors.borderColor.replace('0.6', '0.5')}`, 
                            `0 0 20px ${colors.borderColor.replace('0.6', '0.3')}`
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}>
                        <motion.div 
                          style={{
                            display: 'flex',
                            gap: '8px'
                          }}
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <div style={{
                            width: '12px',
                            height: '12px',
                            backgroundColor: '#4ade80',
                            borderRadius: '50%',
                            animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                            boxShadow: '0 0 10px rgba(74, 222, 128, 0.7)'
                          }}></div>
                          <div style={{
                            width: '12px',
                            height: '12px',
                            backgroundColor: '#22d3ee',
                            borderRadius: '50%',
                            animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                            animationDelay: '0.1s',
                            boxShadow: '0 0 10px rgba(34, 211, 238, 0.7)'
                          }}></div>
                          <div style={{
                            width: '12px',
                            height: '12px',
                            backgroundColor: '#a855f7',
                            borderRadius: '50%',
                            animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                            animationDelay: '0.2s',
                            boxShadow: '0 0 10px rgba(168, 85, 247, 0.7)'
                          }}></div>
                        </motion.div>
                        <span style={{
                          color: '#ffffff',
                          fontSize: '0.875rem',
                          fontWeight: '700',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          textShadow: `0 0 10px ${colors.glowColor}`
                        }}>AI MATCH</span>
                      </div>
                      <motion.div
                        style={{
                          fontSize: '2.25rem',
                          fontWeight: '900',
                          background: colors.textGradient,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          textShadow: `0 0 20px ${colors.glowColor}`,
                          filter: `drop-shadow(0 0 10px ${colors.glowColor.replace('0.8', '0.6')})`
                        }}
                        animate={{ 
                          scale: [1, 1.15, 1],
                          filter: [
                            `drop-shadow(0 0 10px ${colors.glowColor.replace('0.8', '0.6')})`,
                            `drop-shadow(0 0 20px ${colors.glowColor})`,
                            `drop-shadow(0 0 10px ${colors.glowColor.replace('0.8', '0.6')})`
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        {matchPercentage}%
                      </motion.div>
                    </div>
                  </motion.div>
                    );
                  })()}
                </div>
                
                {/* Scanning Line Effect */}
                <motion.div
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '4px',
                    background: 'linear-gradient(to right, transparent, #22d3ee, transparent)',
                    opacity: 0.6
                  }}
                  animate={{ 
                    y: [0, 400, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: index * 0.5
                  }}
                />
                
                {/* Cyberpunk corner accents */}
                <div className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 border-blue-400/50" />
                <div className="absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 border-cyan-400/50" />
                <div className="absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2 border-cyan-400/50" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 border-blue-400/50" />
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Icons Section - Outside cards container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="w-full flex flex-col items-center gap-4 mt-16 relative z-50"
          style={{ marginBottom: '100px' }}
        >
          {/* Refresh Icon - New Search */}
          <motion.button
            onClick={() => window.location.reload()}
            whileHover={{ scale: 1.15, rotate: 180 }}
            whileTap={{ scale: 0.95 }}
            className="w-20 h-20 bg-gradient-to-r from-blue-500/80 to-cyan-500/80 backdrop-blur-md border-2 border-cyan-400/60 rounded-full flex items-center justify-center text-white hover:from-cyan-500/90 hover:to-blue-500/90 hover:border-cyan-300 transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer relative overflow-hidden"
            style={{ zIndex: 100 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <svg className="w-10 h-10 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </motion.button>
        </motion.div>
        </div>
      ) : (
        /* Main Form - Show when no results */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.4, 0, 0.2, 1],
            hover: { duration: 0.4, ease: "easeInOut" }
          }}
          className="relative group"
        >
      {/* Enhanced outer glow effect */}
      <motion.div 
        className="absolute -inset-6 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-3xl blur-2xl"
        animate={{ 
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      {/* Main form container - Enhanced Glassmorphism */}
      <motion.div 
        className="relative bg-black/75 backdrop-blur-xl border border-blue-400/50 rounded-2xl p-8 shadow-[0_15px_45px_rgba(0,0,0,0.6)] group-hover:shadow-[0_20px_60px_rgba(59,130,246,0.3)]"
        whileHover={{ 
          borderColor: "rgba(59, 130, 246, 0.7)",
          boxShadow: "0 20px 60px rgba(59, 130, 246, 0.4)"
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Cyberpunk accent lines */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
        <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
        
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1 
            className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Find Your Perfect {vehicleType === 'motorcycle' ? 'Bike' : 'Car'}
          </motion.h1>
          <motion.p 
            className="text-blue-200/80 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Advanced vehicle matching system
          </motion.p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <motion.div
            key={vehicleType}
            initial={{ opacity: 0, x: vehicleType === 'car' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
              {/* Budget Range Select */}
              <div className="space-y-2">
                <Label className="text-blue-200 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Budget Range <span className="text-red-400">*</span>
                </Label>
                <Select
                  value={formData.budget}
                  onValueChange={(value) => {
                    setFormData({ ...formData, budget: value });
                    // Clear validation error when user makes a selection
                    if (validationErrors.budget) {
                      setValidationErrors({ ...validationErrors, budget: '' });
                    }
                  }}
                >
                  <SelectTrigger className={`bg-black/40 text-blue-100 focus:ring-blue-400/30 ${
                    validationErrors.budget 
                      ? 'border-red-400 focus:border-red-400' 
                      : 'border-blue-400/30 focus:border-blue-400'
                  }`}>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-blue-400/30">
                    <SelectItem 
                      key="under-100k"
                      value="under-100k"
                      className="text-blue-100 focus:bg-blue-400/20 focus:text-blue-100"
                    >
                      Under 100,000 TL
                    </SelectItem>
                    <SelectItem 
                      key="100k-250k"
                      value="100k-250k"
                      className="text-blue-100 focus:bg-blue-400/20 focus:text-blue-100"
                    >
                      100,000 - 250,000 TL
                    </SelectItem>
                    <SelectItem 
                      key="250k-500k"
                      value="250k-500k"
                      className="text-blue-100 focus:bg-blue-400/20 focus:text-blue-100"
                    >
                      250,000 - 500,000 TL
                    </SelectItem>
                    <SelectItem 
                      key="500k-750k"
                      value="500k-750k"
                      className="text-blue-100 focus:bg-blue-400/20 focus:text-blue-100"
                    >
                      500,000 - 750,000 TL
                    </SelectItem>
                    <SelectItem 
                      key="750k-900k"
                      value="750k-900k"
                      className="text-blue-100 focus:bg-blue-400/20 focus:text-blue-100"
                    >
                      750,000 - 900,000 TL
                    </SelectItem>
                    <SelectItem 
                      key="over-900k"
                      value="over-900k"
                      className="text-blue-100 focus:bg-blue-400/20 focus:text-blue-100"
                    >
                      Over 900,000 TL
                    </SelectItem>
                  </SelectContent>
                </Select>
                {validationErrors.budget && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm flex items-center gap-1"
                  >
                    <span>⚠️</span>
                    {validationErrors.budget}
                  </motion.p>
                )}
              </div>


              {/* New or Used Select - TEMPORARILY DISABLED */}
              <div className="space-y-2">
                <Label className="text-blue-200 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Condition
                </Label>
                <Select
                  value={formData.condition}
                  onValueChange={(value) => setFormData({ ...formData, condition: value })}
                >
                  <SelectTrigger className="bg-black/40 border-blue-400/30 text-blue-100 focus:border-blue-400 focus:ring-blue-400/30">
                    <SelectValue placeholder="New or Used?" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-blue-400/30">
                    <SelectItem 
                      key="new"
                      value="new"
                      className="text-blue-100 focus:bg-blue-400/20 focus:text-blue-100"
                    >
                      New
                    </SelectItem>
                    <SelectItem 
                      key="used"
                      value="used"
                      className="text-blue-100 focus:bg-blue-400/20 focus:text-blue-100"
                    >
                      Used
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Vehicle Type Select */}
              <div className="space-y-2">
                <Label className="text-blue-200 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  {vehicleType === 'motorcycle' ? 'Bike' : 'Car'} Type <span className="text-red-400">*</span>
                </Label>
                <Select
                  value={formData.vehicleSubtype}
                  onValueChange={(value) => {
                    setFormData({ ...formData, vehicleSubtype: value });
                    // Clear validation error when user makes a selection
                    if (validationErrors.vehicleSubtype) {
                      setValidationErrors({ ...validationErrors, vehicleSubtype: '' });
                    }
                  }}
                >
                  <SelectTrigger className={`bg-black/40 text-blue-100 focus:ring-blue-400/30 ${
                    validationErrors.vehicleSubtype 
                      ? 'border-red-400 focus:border-red-400' 
                      : 'border-blue-400/30 focus:border-blue-400'
                  }`}>
                    <SelectValue placeholder={`Select ${vehicleType} type`} />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-blue-400/30">
                    {currentOptions.map((option, index) => (
                      <SelectItem 
                        key={option.value + index} 
                        value={option.value}
                        className="text-blue-100 focus:bg-blue-400/20 focus:text-blue-100"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {validationErrors.vehicleSubtype && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm flex items-center gap-1"
                  >
                    <span>⚠️</span>
                    {validationErrors.vehicleSubtype}
                  </motion.p>
                )}
              </div>

              {/* Technology Level Select */}
              <div className="space-y-2">
                <Label className="text-blue-200 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Technology Level
                </Label>
                <Select
                  value={formData.technologyLevel}
                  onValueChange={(value) => setFormData({ ...formData, technologyLevel: value })}
                >
                  <SelectTrigger className="bg-black/40 border-blue-400/30 text-blue-100 focus:border-blue-400 focus:ring-blue-400/30">
                    <SelectValue placeholder="Select comfort level" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-blue-400/30">
                    <SelectItem 
                      key="dont-care"
                      value="dont-care"
                      className="text-blue-100 focus:bg-blue-400/20 focus:text-blue-100"
                    >
                      Don't Care
                    </SelectItem>
                    <SelectItem 
                      key="high"
                      value="high"
                      className="text-blue-100 focus:bg-blue-400/20 focus:text-blue-100"
                    >
                      With High Technology
                    </SelectItem>
                    <SelectItem 
                      key="medium"
                      value="medium"
                      className="text-blue-100 focus:bg-blue-400/20 focus:text-blue-100"
                    >
                      With Basic Technology (ABS etc.)
                    </SelectItem>
                    <SelectItem 
                      key="low"
                      value="low"
                      className="text-blue-100 focus:bg-blue-400/20 focus:text-blue-100"
                    >
                      No Technology
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sound Quality Select */}
              <div className="space-y-2">
                <Label className="text-blue-200 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Sound Quality
                </Label>
                <Select
                  value={formData.soundQuality}
                  onValueChange={(value) => setFormData({ ...formData, soundQuality: value })}
                >
                  <SelectTrigger className="bg-black/40 border-blue-400/30 text-blue-100 focus:border-blue-400 focus:ring-blue-400/30">
                    <SelectValue placeholder="Select sound quality" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-blue-400/30">
                    <SelectItem 
                      key="sound-dont-care"
                      value="dont-care"
                      className="text-blue-100 focus:bg-blue-400/20 focus:text-blue-100"
                    >
                      Don't Care
                    </SelectItem>
                    <SelectItem 
                      key="sound-low"
                      value="low"
                      className="text-blue-100 focus:bg-blue-400/20 focus:text-blue-100"
                    >
                      Low
                    </SelectItem>
                    <SelectItem 
                      key="sound-medium"
                      value="medium"
                      className="text-blue-100 focus:bg-blue-400/20 focus:text-blue-100"
                    >
                      Medium
                    </SelectItem>
                    <SelectItem 
                      key="sound-high"
                      value="high"
                      className="text-blue-100 focus:bg-blue-400/20 focus:text-blue-100"
                    >
                      High
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Fuel Consumption Select */}
              <div className="space-y-2">
                <Label className="text-blue-200 flex items-center gap-2">
                  <Gauge className="w-4 h-4" />
                  Fuel Consumption
                </Label>
                <Select
                  value={formData.fuelConsumption}
                  onValueChange={(value) => setFormData({ ...formData, fuelConsumption: value })}
                >
                  <SelectTrigger className="bg-black/40 border-blue-400/30 text-blue-100 focus:border-blue-400 focus:ring-blue-400/30">
                    <SelectValue placeholder="Select fuel consumption" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-blue-400/30">
                    <SelectItem 
                      key="fuel-dont-care"
                      value="dont-care"
                      className="text-blue-100 focus:bg-blue-400/20 focus:text-blue-100"
                    >
                      Don't Care
                    </SelectItem>
                    <SelectItem 
                      key="fuel-3-5lt"
                      value="3-5lt"
                      className="text-blue-100 focus:bg-blue-400/20 focus:text-blue-100"
                    >
                      3-5 lt
                    </SelectItem>
                    <SelectItem 
                      key="fuel-5-8lt"
                      value="5-8lt"
                      className="text-blue-100 focus:bg-blue-400/20 focus:text-blue-100"
                    >
                      5-8 lt
                    </SelectItem>
                    <SelectItem 
                      key="fuel-9plus"
                      value="9+lt"
                      className="text-blue-100 focus:bg-blue-400/20 focus:text-blue-100"
                    >
                      9+ lt
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Mileage Input */}
              <div className="space-y-2">
                <Label className={`flex items-center gap-2 ${formData.condition === 'new' ? 'text-blue-300/50' : 'text-blue-200'}`}>
                  <motion.div
                    animate={{ opacity: formData.condition === 'new' ? 0.3 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Gauge className="w-4 h-4" />
                  </motion.div>
                  Max Km
                  {formData.condition === 'new' && (
                    <span className="text-xs text-blue-300/70 ml-2">(Minimal for new vehicles)</span>
                  )}
                </Label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder={
                      formData.condition === 'new' 
                        ? 'Çok düşük km' 
                        : 'Maximum kilometre değeri'
                    }
                    value={formData.condition === 'new' ? 'Düşük Km (Yeni Araç)' : formData.mileage}
                    onChange={(e) => {
                      if (formData.condition !== 'new') {
                        setFormData({ ...formData, mileage: e.target.value });
                      }
                    }}
                    disabled={formData.condition === 'new'}
                    className={`border-blue-400/30 text-blue-100 placeholder:text-blue-300/50 focus:border-blue-400 focus:ring-blue-400/30 transition-all duration-300 ${
                      formData.condition === 'new' 
                        ? 'bg-black/20 border-blue-400/20 text-blue-200/50 cursor-not-allowed' 
                        : 'bg-black/40 hover:bg-black/50'
                    }`}
                  />
                  <motion.div 
                    className="absolute inset-0 rounded-md pointer-events-none"
                    animate={{
                      background: formData.condition === 'new' 
                        ? 'linear-gradient(to right, rgba(34, 211, 238, 0.05), transparent)'
                        : 'linear-gradient(to right, rgba(34, 211, 238, 0.1), transparent)'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  {formData.condition === 'new' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300/60"
                    >
                      🔒
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Year Input */}
              <div className="space-y-2">
                <Label className={`flex items-center gap-2 ${formData.condition === 'new' ? 'text-blue-300/50' : 'text-blue-200'}`}>
                  <motion.div
                    animate={{ opacity: formData.condition === 'new' ? 0.3 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    📅
                  </motion.div>
                  Minimum Year
                  {formData.condition === 'new' && (
                    <span className="text-xs text-blue-300/70 ml-2">(Auto-set for new vehicles)</span>
                  )}
                </Label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder={formData.condition === 'new' ? 'Current model year' : 'e.g., 2018 or newer'}
                    value={formData.condition === 'new' ? 'Current Model Year' : formData.year}
                    onChange={(e) => {
                      if (formData.condition !== 'new') {
                        setFormData({ ...formData, year: e.target.value });
                      }
                    }}
                    disabled={formData.condition === 'new'}
                    className={`border-blue-400/30 text-blue-100 placeholder:text-blue-300/50 focus:border-blue-400 focus:ring-blue-400/30 transition-all duration-300 ${
                      formData.condition === 'new' 
                        ? 'bg-black/20 border-blue-400/20 text-blue-200/50 cursor-not-allowed' 
                        : 'bg-black/40 hover:bg-black/50'
                    }`}
                  />
                  <motion.div 
                    className="absolute inset-0 rounded-md pointer-events-none"
                    animate={{
                      background: formData.condition === 'new' 
                        ? 'linear-gradient(to right, rgba(168, 85, 247, 0.05), transparent)'
                        : 'linear-gradient(to right, rgba(168, 85, 247, 0.1), transparent)'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  {formData.condition === 'new' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300/60"
                    >
                      🔒
                    </motion.div>
                  )}
                </div>
              </div>
          </motion.div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <motion.div
              className="w-full max-w-md"
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <motion.div
                className="relative"
                whileHover={{
                  boxShadow: "0 12px 28px rgba(217,119,6,0.55)"
                }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  type="submit"
                  disabled={isLoading}
                  onMouseEnter={() => !isLoading && onSubmitHover(true)}
                  onMouseLeave={() => !isLoading && onSubmitHover(false)}
                  className="w-full relative overflow-hidden bg-gradient-to-r from-amber-400 to-orange-500 hover:from-orange-500 hover:to-amber-600 text-white border-0 py-4 text-lg font-bold rounded-full shadow-[0_8px_20px_rgba(251,191,36,0.35)] hover:shadow-[0_12px_28px_rgba(217,119,6,0.55)] transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {/* Enhanced button glow effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-amber-300 to-orange-400 opacity-30"
                    animate={{ 
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.02, 1]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  />
                  
                  <motion.div 
                    className="relative flex items-center justify-center gap-3"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Search className="w-6 h-6" />
                    <span className="font-bold">
                      {isLoading ? 'Searching...' : `Find My ${vehicleType === 'motorcycle' ? 'Bike' : 'Car'}`}
                    </span>
                  </motion.div>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </form>

        {/* Loading Portal - Renders outside component tree */}
        <LoadingPortal isVisible={isLoading} vehicleType={vehicleType} />

        {/* Cyberpunk corner accents */}
        <div className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 border-blue-400/50" />
        <div className="absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 border-cyan-400/50" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2 border-cyan-400/50" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 border-blue-400/50" />
      </motion.div>
        </motion.div>
      )}
    </div>
  );
}