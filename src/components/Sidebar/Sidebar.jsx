import React from "react";
import { IoIosArrowForward } from "react-icons/io";

import menuSidebar from "@/API/menuSidebar";
import LinkSidebar from "./LinkSidebar";

const Sidebar = () => {
  return (
    <div className="flex flex-col w-full h-screen bg-[#FFF] max-w-64 fixed top-0 left-0 dark:bg-darkblack-500">
      <div className="flex items-center justify-between w-full px-6 py-6 border-b-2">
        <img src="assets/images/logo-sidebar.png" alt="" className="h-6 " />
        <IoIosArrowForward className="w-4" />
      </div>

      <div className=" flex-1 overflow-scroll w-full h-full flex flex-col gap-6 py-6">
        {/* Sidebar */}
        {menuSidebar.map((item, index) => (
          <div key={index} className="flex flex-col justify-center w-full px-6">
            {/* Headline */}
            <div className="text-[10px] font-medium text-darkblack-300 px-3 uppercase dark:text-gray-400">
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
