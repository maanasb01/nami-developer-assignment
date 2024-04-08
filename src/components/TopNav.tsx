import notification from "../assets/header/notifications.svg";
import profile from "../assets/header/profile.svg";

export default function TopNav() {
  return (
    <div className="hidden lg:flex justify-between p-7 border-2 border-[#B8B8B8] ">
      <span className="font-medium text-3xl leading-10">ABCHotel</span>
      <span className="flex space-x-4 ">
        <span className="flex h-7 cursor-pointer ">
          <img src={notification} alt="notification" />
        </span>
        <span className="flex h-7 cursor-pointer">
          <img src={profile} alt="profile" />
        </span>
      </span>
    </div>
  );
}
