'use client';

import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../components/ui/accordion";
import { Badge } from "../../../../components/ui/badge";
import { Input } from "../../../../components/ui/input";
import { ScrollArea } from "../../../../components/ui/scroll-area";
import { X, Search } from "lucide-react";
import { Button } from "../../../../components/ui/button";

// Define menu item data for reusability
const mainMenuItems = [
  { icon: "/house.svg", label: "Dashboard", active: false },
  {
    icon: "/archivebox.svg",
    label: "Products",
    active: true,
    expanded: true,
    subItems: [
      { icon: "/package.svg", label: "All Products", active: true },
      { icon: "/pluscircle.svg", label: "Add New Product", active: false },
      { icon: "/tag.svg", label: "Tags", active: false },
    ],
  },
  { icon: "/gridfour.svg", label: "Categories", active: false },
  { icon: "/gridnine.svg", label: "Sub Category", active: false },
  { icon: "/sealcheck.svg", label: "Brands", active: false },
  { icon: "/barcode.svg", label: "Scan Barcode", active: false },
  { icon: "/filearrowup.svg", label: "Import Products", active: false },
];

const analyticsItems = [
  { icon: "/chartlineup.svg", label: "Sales", active: false, badge: "49" },
  { icon: "/basket.svg", label: "Point of Sales", active: false },
  { icon: "/chartbarhorizontal.svg", label: "Leaderboards", active: false },
  {
    icon: "/shoppingcart.svg",
    label: "Orders",
    active: false,
    hasDropdown: true,
  },
  { icon: "/arrowsclockwise.svg", label: "Refund", active: false },
  { icon: "/percent.svg", label: "Taxes", active: false },
  { icon: "/clipboardtext.svg", label: "Stock", active: false },
];

const appsItems = [
  { icon: "/chatscircle.svg", label: "Chat", active: false, badge: "80" },
  { icon: "/calendarblank.svg", label: "Calendar", active: false },
  { icon: "/envelopesimple.svg", label: "Email", active: false },
];

const settingsItems = [
  { icon: "/faders.svg", label: "Settings", active: false },
  { icon: "/signout.svg", label: "Log Out", active: false },
];

export const NavigationSidebarSection = (): JSX.Element => {
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <aside className={`flex flex-col ${isMobile ? 'w-full' : 'w-[260px]'} bg-white shadow-shadow-1 h-screen overflow-hidden`}>
      {/* Header with Logo */}
      <header className="flex h-[70px] items-center justify-between px-5 py-0 border-b border-[#ececeb]">
        <div className="flex items-center">
          <div className="relative w-[50px] h-[50px] rounded-full bg-[#222]">
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                className="w-[30px] h-[30px]"
                alt="Logo"
                src="/subtract.svg"
              />
            </div>
          </div>
          <div className="ml-2">
            <div className="text-black font-bold text-lg">master</div>
            <div className="text-[#4F56D3] font-bold text-lg leading-none">POS</div>
          </div>
        </div>
        {!isMobile && (
          <div className="flex flex-col gap-1.5 cursor-pointer">
            <div className="w-[20px] h-[2px] bg-[#3f4059] rounded-[7.77px]" />
            <div className="w-[20px] h-[2px] bg-[#161919] rounded-[7.77px]" />
            <div className="w-[20px] h-[2px] bg-[#3f4059] rounded-[7.77px]" />
          </div>
        )}
        {isMobile && (
          <Button variant="ghost" className="p-2" onClick={() => window.history.back()}>
            <X size={20} />
          </Button>
        )}
      </header>

      <ScrollArea className={`flex-1 h-[calc(100vh-70px)]`}>
        <div className="flex flex-col gap-6 px-5 py-6">
          {/* Search Box */}
          <div className="flex items-center gap-2 px-4 py-3 rounded-lg border border-solid border-[#ececeb] bg-[#F9F9F9]">
            <Search className="w-5 h-5 text-gray-400" />
            <Input
              className="border-0 shadow-none p-0 h-auto bg-transparent font-normal text-sm text-gray-500 placeholder:text-gray-400 focus-visible:ring-0"
              placeholder="Search here"
            />
          </div>

          <nav className="flex flex-col gap-6">
            {/* Main Menu Section */}
            <div className="flex flex-col gap-4">
              <h2 className="font-semibold text-xs text-[#c6c6c6] tracking-wider uppercase">
                MAIN MENU
              </h2>
              <div className="flex flex-col gap-1">
                {mainMenuItems.map((item, index) =>
                  item.label === "Products" ? (
                    <Accordion
                      key={index}
                      type="single"
                      defaultValue="products"
                      collapsible
                      className="bg-gray-1 rounded-md"
                    >
                      <AccordionItem value="products" className="border-0">
                        <AccordionTrigger className="flex w-full h-10 px-2 py-0 bg-[#4F56D3] rounded-md overflow-hidden hover:no-underline">
                          <div className="flex items-center gap-2.5">
                            <img
                              className="w-6 h-6"
                              alt={item.label}
                              src={item.icon}
                            />
                            <span className="text-white font-semibold text-sm">
                              {item.label}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-1 pb-0">
                          <div className="flex flex-col gap-1">
                            {item.subItems?.map((subItem, subIndex) => (
                              <div
                                key={subIndex}
                                className="flex w-full h-10 items-center gap-2.5 px-2 py-0 rounded-md overflow-hidden cursor-pointer"
                              >
                                <div className="flex items-center gap-2.5">
                                  <img
                                    className="w-6 h-6"
                                    alt={subItem.label}
                                    src={subItem.icon}
                                  />
                                  <span
                                    className={`font-medium text-sm ${subItem.active ? "text-[#4F56D3]" : "text-gray-500"}`}
                                  >
                                    {subItem.label}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <div
                      key={index}
                      className="flex w-full h-10 items-center gap-2.5 px-2 py-0 rounded-md overflow-hidden cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          className="w-6 h-6"
                          alt={item.label}
                          src={item.icon}
                        />
                        <span className="font-medium text-sm text-gray-500">
                          {item.label}
                        </span>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Analytics Section */}
            <div className="flex flex-col gap-4">
              <h2 className="font-semibold text-xs text-[#c6c6c6] tracking-wider uppercase">
                ANALYTICS
              </h2>
              <div className="flex flex-col gap-1">
                {analyticsItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex w-full h-10 items-center gap-2.5 px-2 py-0 rounded-md overflow-hidden cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        className="w-6 h-6"
                        alt={item.label}
                        src={item.icon}
                      />
                      <span className="font-medium text-sm text-gray-500">
                        {item.label}
                      </span>
                    </div>
                    <div className="flex flex-1 items-center justify-end">
                      {item.badge && (
                        <Badge className="w-6 h-6 bg-green rounded-full p-0 flex items-center justify-center">
                          <span className="font-bold text-[#161919] text-xs">
                            {item.badge}
                          </span>
                        </Badge>
                      )}
                      {item.hasDropdown && (
                        <div className="w-4 h-4 bg-[url('/caretdown.svg')] bg-[100%_100%]" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Apps Section */}
            <div className="flex flex-col gap-4">
              <h2 className="font-semibold text-xs text-[#c6c6c6] tracking-wider uppercase">
                APPS
              </h2>
              <div className="flex flex-col gap-1">
                {appsItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex w-full h-10 items-center gap-2.5 px-2 py-0 rounded-md overflow-hidden cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        className="w-6 h-6"
                        alt={item.label}
                        src={item.icon}
                      />
                      <span className="font-medium text-sm text-gray-500">
                        {item.label}
                      </span>
                    </div>
                    <div className="flex flex-1 items-center justify-end">
                      {item.badge && (
                        <Badge className="w-6 h-6 bg-green rounded-full p-0 flex items-center justify-center">
                          <span className="font-bold text-[#161919] text-xs">
                            {item.badge}
                          </span>
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Settings Section */}
            <div className="flex flex-col gap-4">
              <h2 className="font-semibold text-xs text-[#c6c6c6] tracking-wider uppercase">
                SETTINGS
              </h2>
              <div className="flex flex-col gap-1">
                {settingsItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex w-full h-10 items-center gap-2.5 px-2 py-0 rounded-md overflow-hidden cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        className="w-6 h-6"
                        alt={item.label}
                        src={item.icon}
                      />
                      <span className="font-medium text-sm text-gray-500">
                        {item.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </ScrollArea>
    </aside>
  );
};
