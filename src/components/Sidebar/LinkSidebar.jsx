"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

const LinkSidebar = ({ icon: Icon, data, type }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Header yang bisa diklik */}
      <div
        className="flex gap-3 px-3 py-[10px] items-center justify-between text-base cursor-pointer"
        onClick={() => {
          type === "link" ? router.push(data.href) : setIsOpen(!isOpen);
        }}
      >
        <div className="flex gap-3 items-center">
          {Icon} {/* Menampilkan icon jika ada */}
          <h1>{data.menu}</h1>
        </div>
        {/* Panah dengan animasi rotasi hanya untuk dropdown */}
        {type !== "link" && (
          <IoChevronDownOutline
            className={`text-xs text-gray-500 transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        )}
      </div>

      {/* Menu dropdown dengan animasi */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-l-2 px-3 mt-2 ml-5">
          <ul className="space-y-2">
            {/* Submenu */}
            {data.subMenu?.map((item, index) => (
              <li
                key={index}
                className="dark:hover:bg-gray-700 p-2 rounded-md cursor-pointer"
                onClick={() => router.push(item.href)}
              >
                {item.menu}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LinkSidebar;
