'use client';

import React, { useState, useEffect } from "react";
import { NavigationSidebarSection } from "./sections/NavigationSidebarSection/NavigationSidebarSection";
import { ProductListSection } from "./sections/ProductListSection/ProductListSection";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Logo } from "../../components/ui/logo";

export const ElementProductsDesktop = (): JSX.Element => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check device type
  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    
    // Initial check
    checkDeviceType();
    
    // Add event listener
    window.addEventListener('resize', checkDeviceType);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col lg:flex-row bg-[#f6f6f6] h-screen w-screen overflow-hidden">
      {/* Mobile Header */}
      {isMobile && (
        <header className="flex items-center justify-between p-4 bg-white shadow-sm">
          <div className="flex items-center">
            <Logo size="small" showText={false} />
          </div>
          <Button variant="ghost" onClick={toggleSidebar} className="p-1">
            <Menu size={24} />
          </Button>
        </header>
      )}
      
      {/* Tablet Header */}
      {isTablet && (
        <header className="fixed top-0 right-0 left-[80px] h-[70px] flex items-center justify-end px-[30px] bg-white border-b border-[#ECECEB] shadow-[17px_4px_34px_0px_rgba(0,0,0,0.02)] z-10">
          {/* Profile Section */}
          <div className="flex items-center gap-3">
            {/* Profile Picture */}
            <div className="w-[57px] h-[57px] rounded-full bg-[#C4C4C4] flex items-center justify-center overflow-hidden">
              <img 
                src="https://www.hakangok.tech/events-photos/profile-photo.jpeg" 
                alt="Profil Fotoğrafı" 
                className="w-full h-full object-cover" 
              />
            </div>
            
            {/* Profile Info */}
            <div className="flex items-center gap-[22px]">
              <div className="flex flex-col">
                <span className="font-bold text-base text-[#202020] leading-[1.87em]">Hakan Gök</span>
                <span className="font-normal text-sm text-[#8F8F8F] leading-[1.87em] text-right">Super Admin</span>
              </div>
              <ChevronDown className="w-[22px] h-[22px] text-[#878787]" />
            </div>
          </div>
          
          {/* Hamburger Menu */}
          <div className="flex flex-col gap-[7.8px] ml-[30px] cursor-pointer">
            <div className="w-[25px] h-[2.9px] bg-[#3F4059] rounded-[7.77px]" />
            <div className="w-[25px] h-[2.9px] bg-[#161919] rounded-[7.77px]" />
            <div className="w-[25px] h-[2.9px] bg-[#3F4059] rounded-[7.77px]" />
          </div>
        </header>
      )}
      
      {/* Sidebar */}
      <div 
        className={`${
          isMobile 
            ? sidebarOpen 
              ? 'fixed inset-0 z-50 bg-black bg-opacity-50' 
              : 'hidden'
            : 'block'
        }`}
        onClick={isMobile ? toggleSidebar : undefined}
      >
        <div 
          className={`${
            isMobile 
              ? 'fixed left-0 top-0 h-full z-50 w-[80%] max-w-[300px] transform transition-transform duration-300'
              : isTablet
                ? 'fixed left-0 top-0 h-full z-40'
                : 'relative'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <NavigationSidebarSection />
        </div>
      </div>
      
      {/* Main content */}
      <div className={`flex-1 overflow-hidden ${isTablet ? 'ml-[80px] mt-[70px]' : ''}`}>
        <ProductListSection />
      </div>
    </div>
  );
};