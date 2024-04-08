import dropdown from "../assets/sideNav/dropdown.svg";
import { useState } from "react";
import { NavOption } from "../types/navTypes";
import { navOptions } from "../config/navOptions";


function SideNavOption({ option }: { option: NavOption }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (option.hasSubMenu) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <li className="flex flex-col space-y-3 ">
      <div
        className="flex hover:bg-slate-200 rounded-md p-2  items-center cursor-pointer relative"
        onClick={handleClick}
      >
        {option.hasSubMenu && (
          <img
            src={dropdown}
            alt="dropdown"
            className={`${!isOpen ? "" : "rotate-180"} absolute -left-5`}
          />
        )}
        <img src={option.img} alt={option.alt} className="mr-3" />
        <span className="font-semibold leading-5">{option.title}</span>
      </div>
      {isOpen && option.subMenu && (
        <ul className=" flex flex-col space-y-3 ml-2">
          {option.subMenu.map((subOption) => (
            <SideNavOption key={subOption.title} option={subOption} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function SideNav() {
  return (
    <div className="hidden lg:flex justify-center w-1/6 text-sm ">
      <ul className="flex flex-col space-y-3 w-full px-8 ">
        {navOptions.map((option) => (
          <SideNavOption key={option.title} option={option} />
        ))}
      </ul>
    </div>
  );
}
