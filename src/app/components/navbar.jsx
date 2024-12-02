"use client";
import { useState } from "react";
import { SignOutButton } from "./signOut";
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
            className="cursor-pointer"
          >
            <IconHamburger open={open} />
          </div>
          
          {/* Dashboard Link */}
          <Link href="/dashboard" className="block">
            <div
              className={`flex items-center gap-4 mt-6 ${
                open ? "flex-row" : "flex-col"
              } cursor-pointer hover:bg-slate-600 p-4 rounded-lg transition-colors`}
            >
              <IconDashboard className="text-white duration-500" />
              {open && (
                <h1 className="text-white font-bold text-lg duration-500">
                  Dashboard
                </h1>
              )}
            </div>
          </Link>

          {/* Priority Link */}
          <Link href="/priority" className="block">
            <div
              className={`flex items-center gap-4 mt-6 ${
                open ? "flex-row" : "flex-col"
              } cursor-pointer hover:bg-slate-600 p-4 rounded-lg transition-colors`}
            >
              <IconCheck className="text-white duration-500" />
              {open && (
                <h1 className="text-white font-bold text-lg duration-500">
                  Priority
                </h1>
              )}
            </div>
          </Link>
        </div>

        {/* Bottom Section */}
        <SignOutButton isOpen={open} />
      </div>
    </div>
  );
};

export default Navbar;
