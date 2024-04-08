import notification from "../assets/header/notifications.svg";
import profile from "../assets/header/profile.svg";
import search from "../assets/header/search.svg";
import MobileNotification from "./MobileNotification";

export default function MobileHeader() {
  return (
    <div className="flex lg:hidden  flex-col ">
      <div className="flex justify-between px-2 pt-2  ">
        <span className="font-semibold text-base leading-5 text-[#1A0A02]">
          Tasks of the Day
        </span>
        <span className="flex space-x-4 ">
          <span className="flex h-4 cursor-pointer ">
            <img src={search} alt="search" />
          </span>
          <span className="flex h-4 cursor-pointer ">
            <img src={notification} alt="notification" />
          </span>
          <span className="flex h-4 cursor-pointer">
            <img src={profile} alt="profile" />
          </span>
        </span>
      </div>

      <div className="px-6 py-2 mb-1 h-6">
        <MobileNotification />
      </div>
    </div>
  );
}
