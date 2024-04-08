import redClockTag from "../assets/tags/redClockTag.svg";
import greenClockTag from "../assets/tags/greenClockTag.svg";
import starRatingTag from "../assets/tags/starRatingTag.svg";
import staffIcon from "../assets/tags/staffIcon.svg";
import badgeRed from "../assets/tags/badgeRed.svg";
import { MouseEventHandler, useEffect, useState } from "react";
import { FilterValue } from "../types/filterTagValues";

// Any kind of Text Tag like ongoing, not accepted, etc. All properties will come from textTagsMap present in the config file.
export function TextTag({
  textTagName: { bg, textCol, text },
}: {
  textTagName: {
    name?: string;
    type?: string;
    bg: string;
    textCol: string;
    text: string;
  };
}) {
  return (
    <div
      style={{ backgroundColor: bg, color: textCol }}
      className={`  w-fit rounded-3xl text-[10px] leading-3 lg:text-xs p-1 lg:px-2 lg:py-1`}
    >
      {text}
    </div>
  );
}

// Rating Tag
export function RatingTag({ stars }: { stars: 1 | 2 | 3 | 4 | 5 }) {
  const [bg, setBg] = useState("");
  useEffect(() => {
    if (stars === 1 || stars === 2) {
      setBg("bg-[#CC2610]");
    } else if (stars === 3) {
      setBg("bg-[#F1AE11]");
    } else {
      setBg("bg-[#00A441]");
    }
  }, []);

  return (
    <div
      className={`flex w-fit rounded-3xl items-center space-x-1 ${bg} text-white text-[10px] font-medium leading-3 lg:text-xs p-1 lg:px-2 lg:py-1`}
    >
      <span>{stars}</span>
      <span>
        <img src={starRatingTag} alt="star(s)" />
      </span>
    </div>
  );
}

//Time Tag shows the time left or time elapsed
export function TimeTag({ time, delay }: { time: string; delay: boolean }) {
  const [styles, setStyles] = useState({ bg: "", textCol: "" });

  useEffect(() => {
    if (delay) {
      setStyles({
        bg: "bg-[#F4D8D8]",
        textCol: "text-[#CC2610]",
      });
    } else {
      setStyles({
        bg: "bg-[#D7FFE7]",
        textCol: "text-[#00A441]",
      });
    }
  }, []);

  return (
    <div
      className={`w-fit flex space-x-1 items-center rounded-3xl ${styles.bg} ${styles.textCol} text-[10px] leading-3 p-1 lg:text-xs lg:px-1 lg:py-1`}
    >
      <img src={delay ? redClockTag : greenClockTag} alt="clock" />
      <span>{time}</span>
    </div>
  );
}

// The Tag to show the name of the person, the task is assigned to
export function AssigneeTag({ name = "Rajesh" }: { name?: string }) {
  return (
    <div
      className={`w-fit flex space-x-1 items-center rounded-md bg-[#F7F7F7] font-semibold text-[10px] p-1 lg:text-xs lg:px-2 lg:py-1`}
    >
      <img src={staffIcon} alt="staffIcon" />
      <span>{name}</span>
      <img src={badgeRed} alt="badge" />
    </div>
  );
}

// Filter Tag to filter out the Tasks
export function FilterTag({
  filter,
  selectedFilters,
  displayName,
  onClick,
}: {
  filter: FilterValue;
  selectedFilters: FilterValue[];
  displayName: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-2 py-1 lg:text-sm rounded-2xl font-medium ${
        selectedFilters.includes(filter)
          ? "bg-[#DC5B19] text-white"
          : "text-[#767676] border border-[#767676]"
      }`}
    >
      {displayName}
    </button>
  );
}
