"use client";

import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
      <div className={`${open ? "w-72" : "w-20"} h-screen bg-slate-800`}>
        Sidebar
      </div>
      <div className="p-7 text-2xl font-semibold flex-1 h-screen">
        <h1>Home page</h1>
      </div>
    </div>
  );
};

export default Navbar;
