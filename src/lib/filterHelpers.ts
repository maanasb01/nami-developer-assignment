import { Task } from "../types/taskTypes";

  // Function to filter tasks based on selected filters
  export const filterTasks = (task: Task,selectedFilters:string[]) => {
    if (selectedFilters.length === 0) return true;
    if (
      selectedFilters.includes("not-accepted") &&
      task.acceptanceStatus === "notAccepted"
    ) {
      return true;
    }
    if (selectedFilters.includes("ongoing") && task.status === "ongoing") {
      return true;
    }
    if (
      selectedFilters.includes("delayed") &&
      task.completionStatus === "delayed"
    ) {
      return true;
    }
    if (
      selectedFilters.includes("ontime") &&
      task.completionStatus === "onTime"
    ) {
      return true;
    }
    if (selectedFilters.includes("completed") && task.status === "completed") {
      return true;
    }
    if (selectedFilters.includes("scheduled") && task.status === "scheduled") {
      return true;
    }
    return false;
  };