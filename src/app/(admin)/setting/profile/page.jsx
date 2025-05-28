import Image from "next/image";
import React from "react";
import { FiEdit2 } from "react-icons/fi";

const ProfilePage = () => {
  return (
    <div className="bg-white w-full p-10 rounded-xl border border-gray-200 ">
      <div>
        <h1 className="text-3xl font-bold ">Profile Page</h1>
        <p className="mt-4 ">This is the profile page content.</p>
      </div>
      <div className="rounded-2xl border border-gray-200 mt-6 flex p-6 items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="relative w-32 h-32 ">
            <Image
              src="/assets/profile.png"
              alt="profile"
              fill
              className="rounded-full object-cover"
              quality={100}
              loading="lazy"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold">Musharof Chowdhury</h1>
            <h3 className="text-md mt-4 ">XI-MIPA-2</h3>
          </div>
        </div>
        <div>
          <button className="border border-gray-300 px-6 py-2 rounded-full flex items-center gap-3 font-medium hover:bg-gray-300 hover:border-gray-500">
            <FiEdit2 /> Edit
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 mt-6 flex p-6  justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 lg:mb-6">
            Personal Information
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500">
                First Name
              </p>
              <p className="text-sm font-medium text-gray-800">Chowdury</p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500">
                Last Name
              </p>
              <p className="text-sm font-medium text-gray-800">Musharof</p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500">
                Email address
              </p>
              <p className="text-sm font-medium text-gray-800">
                randomuser@pimjo.com
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500">Phone</p>
              <p className="text-sm font-medium text-gray-800">
                +09 363 398 46
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500">Kelas</p>
              <p className="text-sm font-medium text-gray-800">XI-MIPA-2</p>
            </div>
          </div>
        </div>
        <div>
          <button className="border border-gray-300 px-6 py-2 rounded-full flex items-center gap-3 font-medium hover:bg-gray-300 hover:border-gray-500">
            <FiEdit2 /> Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
