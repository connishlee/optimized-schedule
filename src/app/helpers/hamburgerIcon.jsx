const HamburgerIcon = ({ open, onClick }) => {
  return (
    <div onClick={onClick}>
      <button className="relative group">
        <div className="relative flex overflow-hidden items-center justify-center w-[72px] h-[72px] transform transition-all bg-transparent duration-200">
          <div
            className={`flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden ${
              open ? "rotate-0" : ""
            }`}
          >
            <div
              className={`bg-white h-[2px] w-7 transform transition-all duration-300 origin-left ${
                open ? "rotate-[42deg]" : ""
              }`}
            ></div>
            <div
              className={`bg-white h-[2px] w-1/2 rounded transform transition-all duration-300 ${
                open ? "-translate-x-10 opacity-0" : "opacity-100"
              }`}
            ></div>
            <div
              className={`bg-white h-[2px] w-7 transform transition-all duration-300 origin-left ${
                open ? "-rotate-[42deg]" : ""
              }`}
            ></div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default HamburgerIcon;
