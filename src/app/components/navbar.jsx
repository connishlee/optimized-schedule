"use client";

import { useState } from "react";

import HamburgerIcon from "../helpers/hamburgerIcon";

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
          <HamburgerIcon
            open={open}
            onClick={() => setOpen(!open)}
          />
        </div>
      </div>

      <div className="p-7 text-2xl font-semibold flex-1 h-screen">
        <h1>Home page</h1>
      </div>
    </div>
  );
};

export default Navbar;
