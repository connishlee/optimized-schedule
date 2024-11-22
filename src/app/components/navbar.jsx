"use client";

import { useState } from "react";

import IconHamburger from "../icons/hamburgerIcon";
import IconDashboard from "../icons/dashboardIcon";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-64" : "w-20"
        } transition-all ease-in-out h-screen bg-slate-800`}
      >
        <div onClick={() => setOpen(!open)}>
          <IconHamburger
            open={open}
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="flex gap-x-4 items-center">
          {/* insert IMAGE for dashboard */}
          <IconDashboard className="duration-500 cursor-pointer" />
          {/* <h1
            className={`text-white origin-left font-bold text-xl duration-300 ${
              !open && "scale-0"
            }`}
          >
            Dashboard
          </h1> */}
        </div>
      </div>
      {/* have a logout button */}
    </div>
  );
};

export default Navbar;
