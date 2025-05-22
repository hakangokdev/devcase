'use client';

import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from './avatar';
import { Switch } from './switch';
import { Separator } from './separator';
import Image from 'next/image';

interface HeaderNavProps {
  title: string;
  subtitle: string;
  userName: string;
  userRole: string;
  notificationCount?: number;
}

export const HeaderNav = ({
  title,
  subtitle,
  userName,
  userRole,
  notificationCount = 0
}: HeaderNavProps) => {
  return (
    <div className="flex justify-between items-center px-[30px] py-[20px] bg-white rounded-[10px] w-full">
      {/* Title Section */}
      <div className="flex flex-col gap-[18px]">
        <h2 className="font-heading-3 text-[#202020] text-2xl font-bold leading-[1.87em]">
          {title}
        </h2>
        <p className="font-paragraph text-[#878787] text-base leading-[1.36em]">
          {subtitle}
        </p>
      </div>

      {/* Menu Section */}
      <div className="flex items-center gap-[30px]">
        {/* Theme Toggle */}
        <div className="flex items-center gap-3">
          <Image src="/sun-icon.svg" alt="Light mode" width={22} height={22} style={{ width: 'auto', height: 'auto' }} />
          <div className="relative w-[58px] h-[30px]">
            <div className="h-[30px] bg-[#ECECEB] rounded-[32px]">
              <Switch className="absolute -top-0.5 -left-0.5 h-[34px] w-[35px] bg-[#4F56D3] rounded-[17.5px/17px] border-2 border-solid border-white shadow-md" />
            </div>
          </div>
          <Image src="/moon-icon.svg" alt="Dark mode" width={22} height={22} style={{ width: 'auto', height: 'auto' }} />
        </div>

        <Separator
          orientation="vertical"
          className="h-14 bg-[#C2C2C2] rounded-lg opacity-50"
        />

        {/* Action Icons */}
        <div className="flex gap-[30px] items-center">
          <button className="p-0 bg-transparent border-none">
            <Image src="/globe-icon.svg" alt="Language" width={28} height={28} style={{ width: 'auto', height: 'auto' }} />
          </button>

          <div className="relative">
            <button className="p-0 bg-transparent border-none">
              <Image src="/bell-icon.svg" alt="Notifications" width={28} height={28} style={{ width: 'auto', height: 'auto' }} />
            </button>
            {notificationCount > 0 && (
              <div className="absolute w-8 h-8 top-[-16px] left-3.5 bg-[#CDFF65] rounded-[14px] border-[3px] border-solid border-white flex items-center justify-center">
                <span className="font-semibold text-[#161919] text-sm">
                  {notificationCount}
                </span>
              </div>
            )}
          </div>

          <button className="p-0 bg-transparent border-none">
            <Image src="/envelope-icon.svg" alt="Messages" width={28} height={28} style={{ width: 'auto', height: 'auto' }} />
          </button>

          <button className="p-0 bg-transparent border-none">
            <Image src="/faders-icon.svg" alt="Settings" width={28} height={28} style={{ width: 'auto', height: 'auto' }} />
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <Avatar className="w-[57px] h-[57px] overflow-hidden rounded-[90px]">
            <AvatarImage 
              src="https://www.hakangok.tech/events-photos/profile-photo.jpeg" 
              alt={userName} 
            />
            <AvatarFallback className="bg-[#C4C4C4]">
              {userName.split(' ').map(name => name[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h6 className="font-bold text-[#202020] text-base leading-[1.87em]">
              {userName}
            </h6>
            <p className="text-[#8F8F8F] text-sm leading-[1.87em]">
              {userRole}
            </p>
          </div>
          <Image src="/caret-down-icon.svg" alt="Expand" width={22} height={22} style={{ width: 'auto', height: 'auto' }} />
        </div>
      </div>
    </div>
  );
}; 