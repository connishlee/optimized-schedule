import { LayoutDashboard, Menu, Calendar, LogOut } from "lucide-react";

export default function Navbar({ isOpen, toggleNav }) {
  return (
    <div className="fixed left-0 h-screen bg-white border-r border-gray-100 flex flex-col justify-between">
      <div
        className={`${isOpen ? "w-64" : "w-16"} transition-all duration-300`}
      >
        <button
          onClick={toggleNav}
          className="w-full p-5 hover:bg-gray-50 transition-colors border-b border-gray-100"
        >
          <Menu className="w-5 h-5 text-gray-700" />
        </button>

        <div className="py-8 space-y-2">
          <a
            href="/dashboard"
            className="flex items-center px-5 py-3 text-gray-700 hover:bg-gray-50"
          >
            <LayoutDashboard className="w-5 h-5" />
            {isOpen && <span className="ml-3">Dashboard</span>}
          </a>
          <a
            href="/priority"
            className="flex items-center px-5 py-3 text-gray-700 hover:bg-gray-50"
          >
            <Calendar className="w-5 h-5" />
            {isOpen && <span className="ml-3">Priority Bank</span>}
          </a>
        </div>
      </div>

      <button className="w-full p-5 hover:bg-gray-50 transition-colors border-t border-gray-100 text-gray-700 flex items-center justify-center">
        <LogOut className="w-5 h-5" />
        {isOpen && <span className="ml-3">Sign Out</span>}
      </button>
    </div>
  );
}
