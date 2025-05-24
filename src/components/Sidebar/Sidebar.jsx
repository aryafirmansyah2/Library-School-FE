import menuSidebar from '@/API/menuSidebar';
import React from 'react';
import LinkSidebar from './LinkSidebar';
import Image from 'next/image';

const Sidebar = () => {
  return (
    <div className="flex flex-col w-full h-screen bg-[#FFF] max-w-64 fixed top-0 left-0">
      <div className="flex items-center justify-center w-full px-6 py-6 border-b-2 bg-red-">
        <Image
          src="/assets/logo.png"
          alt="logo"
          className="h-6 w-auto"
          width={100}
          height={24}
        />
        {/* <IoIosArrowForward className="w-4" /> */}
      </div>

      <div className="flex-1 overflow-scroll w-full h-full flex flex-col gap-6 py-6">
        {menuSidebar.map((item, index) => (
          <div key={index} className="flex flex-col justify-center w-full px-6">
            <div className="text-[10px] font-medium text-gray-400 px-3 uppercase">
              <p>{item?.headMenu}</p>
            </div>
            {item?.menu.map((subItem, index) => (
              <LinkSidebar
                key={index}
                icon={subItem?.icon}
                data={subItem}
                type={subItem?.type}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
