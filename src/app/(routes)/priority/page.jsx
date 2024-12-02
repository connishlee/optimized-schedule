"use client";
import PriorityBank from "@/app/components/priority_bank";
import Navbar from "@/app/components/navbar";

const PriorityPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex w-full">
        <Navbar />
        <div className="flex-1">
          <PriorityBank />
        </div>
      </div>
    </div>
  );
};

export default PriorityPage;
