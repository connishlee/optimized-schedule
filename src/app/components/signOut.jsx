"use client";

import { useClerk } from "@clerk/nextjs";

import IconPerson from "../icons/personIcon";

export const SignOutButton = ({ isOpen }) => {
  const { signOut } = useClerk();

  return (
    <div className="mb-6">
      <button
        onClick={() => signOut({ redirectUrl: "/" })}
        className={`flex items-center gap-4 w-full ${
          isOpen ? "flex-row" : "flex-col"
        } cursor-pointer hover:bg-slate-600 p-4 rounded-lg transition-colors`}
      >
        <IconPerson className="text-white duration-500" />
        {isOpen && (
          <h1 className="text-white font-bold text-lg duration-500">Logout</h1>
        )}
      </button>
    </div>
  );
};