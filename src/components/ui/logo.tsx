'use client';

import React from 'react';
import Image from 'next/image';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

export const Logo = ({ size = 'medium', showText = true }: LogoProps) => {
  // Size multipliers based on the original dimensions
  const sizeMultiplier = {
    small: 0.8,
    medium: 1,
    large: 1.2
  };
  
  // Original dimensions from Figma
  const originalWidth = showText ? 144 : 56;
  const originalHeight = 57;
  
  // Calculate dimensions based on size
  const width = originalWidth * sizeMultiplier[size];
  const height = showText ? originalHeight * sizeMultiplier[size] : width; 
  
  return (
    <div className="relative" style={{ width: `${width}px`, height: `${height}px` }}>
      {/* Logo Icon Background */}
      <div 
        className="absolute left-0 top-0 rounded-full bg-gradient-to-br from-[#161919] to-[#5B5C7A]"
        style={{ 
          width: `${56 * sizeMultiplier[size]}px`, 
          height: `${56 * sizeMultiplier[size]}px` 
        }}
      >
        {/* Logo Icon Content */}
        <div className="relative w-full h-full flex items-center justify-center">
          <Image 
            src="/logo-subtract.svg" 
            alt="Logo Icon" 
            width={28 * sizeMultiplier[size]} 
            height={20 * sizeMultiplier[size]} 
            style={{ 
              position: 'absolute',
              top: `${20 * sizeMultiplier[size]}px`,
              width: `${28 * sizeMultiplier[size]}px`, 
              height: `${20 * sizeMultiplier[size]}px` 
            }} 
          />
          <Image 
            src="/logo-vector.svg" 
            alt="Logo Icon" 
            width={14 * sizeMultiplier[size]} 
            height={15 * sizeMultiplier[size]} 
            style={{ 
              position: 'absolute',
              top: `${11 * sizeMultiplier[size]}px`,
              width: `${14 * sizeMultiplier[size]}px`, 
              height: `${15 * sizeMultiplier[size]}px` 
            }} 
          />
        </div>
      </div>
      
      {/* Master Text - Only show if showText is true */}
      {showText && (
        <div 
          className="absolute"
          style={{ 
            left: `${70 * sizeMultiplier[size]}px`, 
            top: `${11 * sizeMultiplier[size]}px` 
          }}
        >
          <Image 
            src="/master.png" 
            alt="master" 
            width={74 * sizeMultiplier[size]} 
            height={16 * sizeMultiplier[size]} 
            style={{ width: 'auto', height: 'auto' }} 
          />
        </div>
      )}
      
      {/* POS Text - Only show if showText is true */}
      {showText && (
        <div 
          className="absolute"
          style={{ 
            left: `${70 * sizeMultiplier[size]}px`, 
            top: `${31 * sizeMultiplier[size]}px` 
          }}
        >
          <Image 
            src="/pos.png" 
            alt="POS" 
            width={43 * sizeMultiplier[size]} 
            height={18 * sizeMultiplier[size]} 
            style={{ width: 'auto', height: 'auto' }} 
          />
        </div>
      )}
    </div>
  );
}; 