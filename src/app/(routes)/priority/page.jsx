"use client";
import PriorityBank from "@/app/components/priority_bank";
import Navbar from "@/app/components/navbar";

const PriorityPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex w-full">
        <Navbar />
        <div className="flex-1">
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Priority Bank</h1>
            <PriorityBank />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriorityPage;
