"use client";

import { useState } from "react";

import { SignOutButton } from "../components/signOut";
import Link from "next/link";

import IconDashboard from "../icons/dashboardIcon";
import IconHamburger from "../icons/hamburgerIcon";
import IconCheck from "../icons/checkIcon";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-60" : "w-20"
        } flex flex-col justify-between transition-all ease-in-out h-screen bg-slate-700`}
      >
        <div>
          <div
            onClick={() => setOpen(!open)}
            className=""
          >
            <IconHamburger open={open} />
          </div>
          <div
            className={`flex items-center gap-4 mt-6 ${
              open ? "flex-row" : "flex-col"
            }`}
          >
            <IconDashboard className="text-white duration-500 cursor-pointer" />
            {open && (
              <Link href="/dashboard">
                <h1 className="text-white font-bold text-lg duration-500">
                  Dashboard
                </h1>
              </Link>
            )}
          </div>

          <div
            className={`flex items-center gap-4 mt-6 ${
              open ? "flex-row" : "flex-col"
            }`}
          >
            <IconCheck className="text-white duration-500 cursor-pointer" />
            {open && (
              <Link href="/priority">
                <h1 className="text-white font-bold text-lg duration-500">
                  Priority
                </h1>
              </Link>
            )}
          </div>
        </div>

        {/* Bottom Section */}

        <SignOutButton isOpen={open} />
      </div>
    </div>
  );
};

export default Navbar;
