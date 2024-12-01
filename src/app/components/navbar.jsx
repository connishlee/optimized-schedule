"use client";

import { useState } from "react";

import { SignOutButton } from "@clerk/nextjs";

import IconDashboard from "../icons/dashboardIcon";
import IconHamburger from "../icons/hamburgerIcon";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar Navbar */}
      <div
        className={`${
          open ? "w-64" : "w-20"
        } flex flex-col justify-between transition-all ease-in-out h-screen bg-slate-800`}
      >
        {/* Top Section */}
        <div>
          {/* Hamburger Icon */}
          <div
            onClick={() => setOpen(!open)}
            className=""
          >
            <IconHamburger open={open} />
          </div>
          {/* Dashboard Icon */}
          <div className="flex flex-col items-center gap-6 mt-6">
            <IconDashboard className="text-white duration-500 cursor-pointer" />
            {open && <h1 className="font-bold">Dashboard</h1>}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mb-4">
          <SignOutButton className="text-white text-lg flex justify-center" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
