"use client";

import { useClerk } from "@clerk/nextjs";

import IconPerson from "../icons/personIcon";

export const SignOutButton = ({ isOpen }) => {
  const { signOut } = useClerk();

  return (
    <div className="flex justify-center items-center w-full h-20">
      <button
        className=""
        onClick={() => signOut({ redirectUrl: "/" })}
      >
        <IconPerson />
        {isOpen && (
          <h1 className="text-white font-bold text-lg duration-500">Logout</h1>
        )}
      </button>
    </div>
  );
};
