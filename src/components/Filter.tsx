import { Dispatch, SetStateAction} from "react";
import { filterNamesMap } from "../config/filterNamesMap";
import { FilterValue } from "../types/filterTagValues";
import { FilterTag } from "./Tag";

type FilterProps = {
  selectedFilters: FilterValue[];
  setSelectedFilters: Dispatch<SetStateAction<FilterValue[]>>;
};
// Render Filter Tags and change the selectedFilter state (Prop) based on the selected filters.
export default function Filter({
  selectedFilters,
  setSelectedFilters,
}: FilterProps) {
  // Function to toggle selected filters
  const toggleFilter = (filter: FilterValue) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };
  return (
    <div className="flex flex-wrap gap-2">
      {Object.keys(filterNamesMap).map((filter) => (
        <FilterTag
          key={filter}
          filter={filter as FilterValue}
          selectedFilters={selectedFilters}
          displayName={filterNamesMap[filter as FilterValue]}
          onClick={() => toggleFilter(filter as FilterValue)}
        />
      ))}
    </div>
  );
}
