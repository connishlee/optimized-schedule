import PriorityBank from "@/app/components/priority_bank";

import Navbar from "@/app/components/navbar";

const PriorityPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex">
        <Navbar />
        <h1 className="text-3xl font-bold mb-12">Priority Bank</h1>
      </div>
    </div>
  );
};

export default PriorityPage;
