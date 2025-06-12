"use client";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

const LinkSidebar = ({ icon: Icon, data, type }) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = data.href === pathname;
  const isSubActive = data.subMenu?.some((item) => pathname === item.href);

  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0); // ← Tambahkan state untuk cart

  useEffect(() => {
    if (isSubActive) {
      setIsOpen(true);
    }
  }, [isSubActive]);

  // Ambil jumlah cart dari localStorage (khusus menu keranjang)
  useEffect(() => {
    const updateCartCount = () => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        try {
          const parsed = JSON.parse(storedCart);
          setCartCount(parsed.length || 0);
        } catch (error) {
          console.error("Invalid cart format in localStorage");
        }
      }
    };

    // Jalankan sekali saat mount
    if (data.menu === "Keranjang") {
      updateCartCount();
      window.addEventListener("storage", updateCartCount);
      window.addEventListener("cartUpdated", updateCartCount); // custom event

      return () => {
        window.removeEventListener("storage", updateCartCount);
        window.removeEventListener("cartUpdated", updateCartCount);
      };
    }
  }, [data.menu]);

  const handleClick = () => {
    if (type === "link") {
      router.push(data.href);
    } else {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div>
      {/* Menu Induk */}
      <div
        className={`flex gap-3 px-3 py-[10px] items-center justify-between text-base cursor-pointer rounded-md 
        ${isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"}`}
        onClick={handleClick}
      >
        <div className="flex gap-3 items-center relative w-full">
          {Icon}
          <span>{data.menu}</span>

          {/* Badge jumlah cart */}
          {data.menu === "Keranjang" && cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </div>

        {type !== "link" && (
          <IoChevronDownOutline
            className={`text-xs text-gray-500 transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        )}
      </div>

      {/* Submenu */}
      {data.subMenu && (
        <div
          className={`transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-l-2 px-3 mt-2 ml-5">
            <ul className="space-y-2">
              {data.subMenu.map((item, index) => {
                const active = pathname === item.href;
                return (
                  <li
                    key={index}
                    className={`p-2 rounded-md cursor-pointer ${
                      active ? "bg-gray-200 font-semibold" : "hover:bg-gray-200"
                    }`}
                    onClick={() => router.push(item.href)}
                  >
                    {item.menu}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkSidebar;
