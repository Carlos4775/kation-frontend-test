import { ChevronDownIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import { ReactComponent as Arrow } from "../img/arrow.svg";

const SortIcon = ({ order, ...props }) => {
  if (order) {
    return (
      <ChevronDownIcon
        {...props}
        className={clsx(
          order === "asc" && "transform rotate-180",
          "h-5 w-5 inline-block invisible sm:visible cursor-pointer"
        )}
      />
    );
  }

  return (
    <Arrow
      {...props}
      className="h-5 w-5 inline-block invisible sm:visible transform rotate-90 cursor-pointer my-1 pt-1"
    />
  );
};

export default SortIcon;
