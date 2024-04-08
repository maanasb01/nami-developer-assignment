import { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import TaskCard from "../components/TaskCard";
import TopNav from "../components/TopNav";
import MobileHeader from "../components/MobileHeader";
import MobileFooter from "../components/MobileFooter";
import Filter from "../components/Filter";
import { dummyTasks } from "../config/dummyTasks";
import { filterTasks } from "../lib/filterHelpers";
import { FilterValue } from "../types/filterTagValues";
import { Task } from "../types/taskTypes";
import { RotatingLines } from "react-loader-spinner";

export default function MainPage() {
  const [selectedFilters, setSelectedFilters] = useState<FilterValue[]>([]);

  const [data, setData] = useState<Task[] | null>(null);

  useEffect(() => {
    const dummyFetchData = () => {
      // Simulate data loading with a random delay (0 to 2 seconds)
      const randomDelay = Math.random() * 2000;
      setTimeout(() => {
        setData(dummyTasks);
      }, randomDelay);
    };

    if (data === null) {
      dummyFetchData();
    }
  }, [data]);

  return (
    <div className="font-encodeSans flex flex-col h-screen overflow-hidden">
      <TopNav />
      <MobileHeader />
      <div className="flex  lg:mt-5 space-x-1 h-full  ">
        <SideNav />

        {/* Render filter tags */}
        <div className="w-full lg:w-5/6 flex flex-col  space-y-3 ">
          <div className="font-medium text-2xl hidden lg:flex">
            Tasks of the Day
          </div>

          {/* Filters are applied cumulatively, similar to using OR logical conditions stacked on top of each other. */}
          <Filter
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />

          {/* Render filtered Tasks */}
          {/* filterTasks: Function to filter tasks based on selected filters */}
          <div className= {`flex lg:flex-wrap lg:flex-row flex-col items-center  ${data && dummyTasks
                .filter((task) => filterTasks(task, selectedFilters)).length<4?"lg:items-start":"lg:items-center"} gap-2 lg:gap-4  h-full overflow-auto pb-20 lg:pb-36`}>
            {data ? (
              dummyTasks
                .filter((task) => filterTasks(task, selectedFilters))
                .map((task) => <TaskCard taskCardProps={task} key={task.id} />)
            ) : (
              <div className="flex w-full h-full justify-center items-start">
                {/* Loader */}
                <RotatingLines
                  strokeColor="#4951a5"
                  strokeWidth="5"
                  width="50"
                />
              </div>
            )}
          </div>
          <MobileFooter />
        </div>
      </div>
    </div>
  );
}
