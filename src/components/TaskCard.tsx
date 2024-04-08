import textTagsMap from "../config/textTagsMap";
import { AssigneeTag, RatingTag, TextTag, TimeTag } from "./Tag";
import recurring from "../assets/taskCard/reccuring.svg";
import once from "../assets/taskCard/once.svg";
import dueDate from "../assets/taskCard/dueDate.svg";
import notify from "../assets/taskCard/notify.svg";
import { useEffect, useState } from "react";
import { Task } from "../types/taskTypes";
import { formatDate, formatTimeTagTime } from "../lib/taskCardHelpers";

// The Task Card Component. Renders all the TaskCards based on the props passed.
export default function TaskCard({
  taskCardProps: {
    id = "89786",
    title = "Routine Cleaning",
    from = "Pantry",
    to = "Reception",
    taskType,
    status,
    isRecurring,
    scheduledDate,
    acceptanceStatus,
    completionStatus,
    hasComplaint,
    rating,
    reqCategory,
    items,
    services,
    assignee
  },
}: {
  taskCardProps: Task;
}) {
  // States to show the remaining time (shown in Green) or elapsed time (shown in Red)
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number | null>(null);

  useEffect(() => {
    /*
   If the task is ongoing (the time tag is being shown), this calculates the difference between scheduled time and current time. 

   Based on this, the time tag will get rendered and also the color of Notify button (when task is not-accepted) gets decided.

   If there is time, green time tag will shown, else red will be shown to display time elapsed. 
   If the task is not accepted, if there is time, Notify button will be of blue color, else will be of red color. 
   */
    if (status === "ongoing") {
      const interval = setInterval(() => {
        const currentTime = new Date();
        const timeDifference = scheduledDate.getTime() - currentTime.getTime();

        if (timeDifference > 0) {
          setRemainingTime(timeDifference);
          setElapsedTime(null);
        } else {
          setElapsedTime(-timeDifference);
          setRemainingTime(null);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [scheduledDate, status]);

  /**
   * These are variables which store the respective JSXs based on the props passed. These are getting rendered inside return of this component.
   *
   * NOTE: Some of these can be converted into States, if the behaviour would change based on the user's interaction. Ex- button can be a state if the data is getting
   *       updated and based on it, the attributes of the tasks gets changed.
   *
   *
   * button--> Depending on the task type. If the task is accepted or if the task type is Schedules, no button gets shown. If the type is completed, details button gets rendered.
   *           If, not-accepted, notify buttons will rendered (according to time left).
   *
   * typeBasedTags--> Depends on the type of Task. If task is completed, shows status tags (delayed, complaint,etc). If task is ongoing, show tags related it. If type is Scheduled, no tags.
   *
   * ratingTimeTag--> If type is completed, show ratings, if type is ongoing, show time tag (time left or time elapsed). If scheduled, show nothing.
   *
   * itemsOrServices--> renders the items requested or service requested. A task can have one of them or none of them.
   */

  let button = null;
  let typeBasedTags = null;
  let ratingTimeTags = null;
  let itemsOrServices = null;

  if (status === "ongoing") {
    ratingTimeTags = (
      <>
        {remainingTime !== null && (
          //formatTimeTagTime: Format the time to be displayed in the time Tag. Outputs a string in format of 00Hrs 00Mins OR 00Mins (if no hours are there)
          <TimeTag delay={false} time={formatTimeTagTime(remainingTime)} />
        )}
        {elapsedTime !== null && (
          <TimeTag delay={true} time={formatTimeTagTime(elapsedTime)} />
        )}
      </>
    );

    if (acceptanceStatus === "notAccepted") {
      button = (
        <button
          className={`w-full rounded-3xl py-3 text-[#FFECE2] text-xs font-medium flex ${
            remainingTime ? "bg-[#5F69C7]" : "bg-[#CC2610]"
          }  ${remainingTime ? "hover:bg-[#4951a5]" : "hover:bg-[#981D0B]"}`}
        >
          <span className="mx-auto flex items-center space-x-2">
            <img src={notify} alt="notifyIcon" />
            <span>Notify Staff</span>
          </span>
        </button>
      );

      typeBasedTags = <TextTag textTagName={textTagsMap.notAccepted} />;
    } else {
      button = null;
      typeBasedTags = <TextTag textTagName={textTagsMap.ongoing} />;
    }
  } else if (status === "completed") {
    button = (
      <button className="w-full rounded-3xl py-3 border border-[#5F69C7] text-[#5F69C7] hover:bg-slate-100 text-xs font-medium flex items-center justify-center">
        <span>View Details</span>
      </button>
    );

    typeBasedTags = (
      <>
        <TextTag
          textTagName={
            completionStatus === "delayed"
              ? textTagsMap.delayed
              : textTagsMap.onTime
          }
        />
        {hasComplaint && <TextTag textTagName={textTagsMap.complaint} />}
      </>
    );

    if (rating) {
      ratingTimeTags = <RatingTag stars={rating} />;
    }
  } else {
    // If status is 'scheduled' or any other value
    button = null;
    typeBasedTags = null;
    ratingTimeTags = null;
  }

  if (reqCategory === "itemRequest" && items?.length) {
    itemsOrServices = (
      <ul className="space-y-1">
        {items.map((item, key) => {
          return (
            <li key={key} className="">
              <div>
                <span className="font-bold text-black truncate">
                  {item.itemName}
                </span>
                x {item.quantities}
              </div>
              {item.description && (
                <div className="text-[#5F69C7] font-medium truncate">
                  Instructions: {item.description}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  }
  if (reqCategory === "serviceRequest" && services?.length) {
    itemsOrServices = (
      <ul className="space-y-1">
        {services.map((service, key) => {
          return (
            <li key={key} className="text-[#1A0A02]">
              <div className="truncate">{service.serviceName}</div>
              {service.description && (
                <div className="truncate">
                  <span className="text-[#5F69C7]">Instructions:</span>{" "}
                  <span className=" font-medium">{service.description}</span>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className="flex flex-col space-y-3 p-2 rounded-xl border border-[#B8B8B8] w-80 h-fit max-h-80  ">
      <div className="flex items-center gap-x-1 ">
        <span>
          <AssigneeTag name={assignee}/>
        </span>

        {/* If the task is ongoing show that tags and if task is completed show tags related to it (delayed, complaint, etc). */}
        <span className="flex space-x-1">{typeBasedTags}</span>

        {/*If task is completed (in Task history), dont show the recurring icon  */}
        {status !== "completed" && (
          <span>
            <img src={isRecurring ? recurring : once} alt="" />
          </span>
        )}

        <span className="ml-auto">{ratingTimeTags}</span>
      </div>

      <div className="flex items-center">
        <span className="font-semibold text-xs lg:text-base lg:leading-5 ">
          {title}
        </span>
        <span className="ml-auto">
          <TextTag
            textTagName={
              taskType === "guest"
                ? textTagsMap.guestTask
                : textTagsMap.internalTask
            }
          />
        </span>
      </div>

      <div className="flex font-montserrat text-[10px] lg:text-xs font-medium text-[#767676]">
        <span className="flex items- space-x-2 ">
          <span>
            <img src={dueDate} alt="dueDate" />
          </span>
          {/*formatDate function: Inputs Date and Output the formatted Dtring to display of form "21 Jul 2024 | 03:00 am" */}
          <span>{formatDate(scheduledDate)}</span>
        </span>
        <span className="ml-auto"># {id}</span>
      </div>

      <div className="flex justify-between text-[#767676] text-[10px] lg:text-xs font-semibold">
        <span>From: {from}</span>
        <span>To: {to}</span>
      </div>

      {itemsOrServices ? (
        <div className="bg-[#F7F7F7] p-3 text-[10px] lg:text-xs text-[#5D5E60] overflow-y-auto">
          {itemsOrServices}
        </div>
      ) : null}
      {button}
    </div>
  );
}
