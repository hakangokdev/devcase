'use client';

import React, { useState, useEffect } from "react";
import { NavigationSidebarSection } from "./sections/NavigationSidebarSection/NavigationSidebarSection";
import { ProductListSection } from "./sections/ProductListSection/ProductListSection";
import { Menu } from "lucide-react";
import { Button } from "../../components/ui/button";

export const ElementProductsDesktop = (): JSX.Element => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col lg:flex-row bg-[#f6f6f6] h-screen w-screen overflow-hidden">
      {isMobile && (
        <header className="flex items-center justify-between p-4 bg-white shadow-sm">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center">
              <img src="/subtract.svg" alt="Logo" className="h-6 w-6" />
            </div>
          </div>
          <Button variant="ghost" onClick={toggleSidebar} className="p-1">
            <Menu size={24} />
          </Button>
        </header>
      )}
      
      {/* Sidebar - hidden on mobile unless toggled */}
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
              : 'relative'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <NavigationSidebarSection />
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        <ProductListSection />
      </div>
    </div>
  );
};
