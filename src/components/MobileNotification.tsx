import { useState } from "react";
import cross from "../assets/header/cross.svg";

export default function MobileNotification({
  notificationText = "Demo Notification Description",
  textColor = "#CC2610",
}: {
  notificationText?: string;
  textColor?: string;
}) {
  const [show, setShow] = useState(true);
  return (
    show && (
      <div
        className={`flex items-center justify-center py-1  rounded-r-full space-x-3 font-semibold w-full text-xs bg-[#F7F7F7] text-[${textColor}] shadow-[0px_1px_4px_0px_#0000001A]`}
      >
        <span> {notificationText} </span>
        <span onClick={() => setShow(false)}>
          <img src={cross} alt="cross" />
        </span>
      </div>
    )
  );
}
