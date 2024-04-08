import home from "../assets/sideNav/home.svg";
import console from "../assets/sideNav/console.svg";
import attendance from "../assets/sideNav/attendance.svg";
import overview from "../assets/sideNav/overview.svg";
import staff from "../assets/sideNav/staff.svg";
import { NavOption } from "../types/navTypes";

export const navOptions: NavOption[] = [
    { title: "Home", img: home, alt: "home", hasSubMenu: false },
    {
      title: "Console",
      img: console,
      alt: "console",
      hasSubMenu: true,
      subMenu: [
        { title: "Attendance", img: attendance, alt: "attendance" },
        { title: "Overview", img: overview, alt: "overview" },
        { title: "Staff", img: staff, alt: "staff" },
      ],
    },
  ];