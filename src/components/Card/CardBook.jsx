"use client";

import Link from "next/link";

export default function CardBook({
  image = "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
  title = "Website Review Check",
  description = `This charming accommodation is situated just a 2-minute walk from Barceloneta Beach and the nearest bus stop. 
  It offers a cozy and welcoming environment, perfect for both short and long stays. With easy access to the city's vibrant nightlife at "Naviglio", 
  you’ll find everything you need for a memorable visit to Barcelona. Enjoy nearby cafés, seafood restaurants, and scenic coastal walks right at your doorstep.`,
  href = "#",
}) {
  return (
    <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg max-w-80">
      <div className="relative max-h-96 h-full m-2.5 overflow-hidden text-white rounded-md">
        <img
          src={image}
          alt="card-image"
          className="object-cover w-full h-full rounded-md"
        />
      </div>
      <div className="p-4">
        <h6 className="mb-2 text-slate-800 text-xl font-semibold">{title}</h6>
        <p className="text-slate-600 leading-relaxed font-light line-clamp-4">
          {description}
        </p>
      </div>
      <div className="px-4 pb-4 pt-0 mt-2">
        <Link
          href={href}
          className="rounded-md bg-blue-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}
