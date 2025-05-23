import Sidebar from "@/components/sidebar/Sidebar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div>
      <Sidebar />
      <div className="ml-[256px] p-6">{children}</div>
    </div>
  );
};

export default layout;
