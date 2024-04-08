import { navOptions } from "../config/navOptions";

// The Menu when the screen is mobile
export default function MobileFooter() {
  return (
    <div className="lg:hidden h-fit text-xs border-t flex flex-col relative rounded-t-2xl shadow-[0px_-3px_12px_0px_#0000001A] ">
      <div className="rounded-full h-9 w-9 bg-[#5F69C7] text-white text-3xl absolute -top-5 flex  items-center mx-auto right-0 left-0">
        <span className="mx-auto pb-2">+</span>
      </div>
      <ul className="flex justify-around">
        {navOptions.map((option) => {
          return (
            <li
              key={option.title}
              className="flex flex-col items-center pt-2 pb-10 h-fit"
            >
              <span>
                <img src={option.img} alt={option.alt} className="" />
              </span>
              <span className="text-black">{option.title}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
