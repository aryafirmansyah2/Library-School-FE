"use client";
import menuSidebar from "@/API/menuSidebar";
import React from "react";
import LinkSidebar from "./LinkSidebar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Sidebar = () => {
  const router = useRouter();
  const role = Cookies.get("role");

  const handleLogout = () => {
    // Contoh: Hapus token dari localStorage
    Cookies.remove("token");
    Cookies.remove("idUser");
    // Redirect ke login
    router.push("/login");
  };
  console.log(role);

  return (
    <div className="flex flex-col w-full h-screen bg-[#FFF] max-w-64 fixed top-0 left-0 border-r border-gray-200">
      <div className="flex items-center justify-center w-full px-6 py-6 border-b border-gray-200">
        <Image
          src="/assets/logo.png"
          alt="logo"
          className="h-6 w-auto"
          width={100}
          height={24}
        />
      </div>

      <div className="flex-1 w-full h-full flex flex-col gap-6 py-6 overflow-y-auto">
        {menuSidebar.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 justify-center w-full px-6"
          >
            <div className="text-[10px] font-medium text-gray-400 px-3 uppercase">
              <p>{item?.headMenu}</p>
            </div>
            {item?.menu
              .filter((subItem) => subItem.role === role)
              .map((subItem, index) => (
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

      <div className="w-full px-6 py-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full bg-red-100 text-red-600 font-medium py-2 rounded-md hover:bg-red-200 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
