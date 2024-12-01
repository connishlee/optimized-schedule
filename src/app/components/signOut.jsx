"use client";

import { useClerk } from "@clerk/nextjs";

import IconPerson from "../icons/personIcon";

export const SignOutButton = () => {
  const { signOut } = useClerk();

  return (
    <button
      className=""
      onClick={() => signOut({ redirectUrl: "/" })}
    >
      <IconPerson />
    </button>
  );
};
