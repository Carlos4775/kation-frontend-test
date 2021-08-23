import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import clsx from "clsx";

const Pagination = ({
  totalItems = 1,
  currentPage = 1,
  totalPages = 1,
  totalCount = 1,
  path = "/",
}) => {
  const pages = [...new Array(Math.ceil(totalPages))].map((value, idx) => (
    <Link
      to={`${path}/${idx + 1}`}
      aria-current="page"
      className={clsx(
        "z-10 relative inline-flex items-center px-4 py-2 border text-sm font-medium",
        idx === parseInt(currentPage - 1)
          ? "border-blue-400 bg-blue-50 text-indigo-600"
          : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
      )}
      key={idx}
    >
      {idx + 1}
    </Link>
  ));
  return (
    <div className="bg-white py-3 flex items-center justify-between">
      <div className="flex-1 flex justify-between sm:hidden">
        <Link
          to={
            parseInt(currentPage) !== 1 &&
            `${path}/${parseInt(currentPage) - 1}`
          }
          className={clsx(
            "relative inline-flex items-center px-2 py-2 rounded-md border border-gray-300 text-sm font-medium bg-white text-gray-700 hover:bg-gray-50",
            parseInt(currentPage) === 1 &&
              "cursor-default bg-white sm:bg-gray-100"
          )}
        >
          Anterior
        </Link>
        <Link
          to={
            parseInt(currentPage) !== totalPages &&
            `${path}/${parseInt(currentPage) + 1}`
          }
          className={clsx(
            "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50",
            parseInt(currentPage) === totalPages && "cursor-default bg-gray-100"
          )}
        >
          Siguiente
        </Link>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-end">
        <div className="mx-5">
          <p className="text-sm text-gray-700">
            {(currentPage - 1) * 10 + 1} - {(currentPage - 1) * 10 + totalItems}{" "}
            de {totalCount}
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <Link
              to={
                parseInt(currentPage) !== 1 &&
                `${path}/${parseInt(currentPage) - 1}`
              }
              className={clsx(
                "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50",
                parseInt(currentPage) === 1 && "cursor-default bg-gray-100"
              )}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </Link>
            {pages}
            <Link
              to={
                parseInt(currentPage) !== totalPages &&
                `${path}/${parseInt(currentPage) + 1}`
              }
              className={clsx(
                "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50",
                parseInt(currentPage) === totalPages &&
                  "cursor-default bg-gray-100"
              )}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
