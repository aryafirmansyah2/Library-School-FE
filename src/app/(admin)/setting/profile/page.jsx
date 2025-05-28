import Image from 'next/image';
import React from 'react';

const ProfilePage = () => {
  return (
    <div className="bg-white w-full p-10 rounded-lg border border-gray-200 ">
      <div>
        <h1 className="text-3xl font-bold ">Profile Page</h1>
        <p className="mt-4 ">This is the profile page content.</p>
      </div>
      <div className="rounded-lg border border-gray-200 mt-6 p-6 flex items-center space-x-6">
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
    </div>
  );
};

export default ProfilePage;
