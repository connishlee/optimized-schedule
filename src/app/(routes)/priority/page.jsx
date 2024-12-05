"use client";

import { useState } from "react";

import PriorityBank from "@/app/components/priority_bank";
import Navbar from "@/app/components/navbar";

const PriorityPage = () => {
  const [isNavOpen, setIsNavOpen] = useState(true);
  return (
    <div className="h-screen bg-white">
      <div className="flex h-full">
        <div className="fixed inset-y-0 left-0">
          <Navbar
            isOpen={isNavOpen}
            toggleNav={() => setIsNavOpen(!isNavOpen)}
          />
        </div>
        <div className="flex-1 pl-16 bg-gray-50">
          <PriorityBank />
        </div>
      </div>
    </div>
  );
};

export default PriorityPage;
