import { Popover } from "@headlessui/react";
import { MenuIcon, PencilIcon, XIcon } from "@heroicons/react/outline";
import iconUser from "../img/front-end-test-icon-user_2x.svg";
import Button from "./Button";

export default function Navbar() {
  return (
    <Popover className="relative bg-gray-100">
      <div className="px-10 2xl:px-56">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start items-center lg:w-0 lg:flex-1">
            <div className="flex justify-center rounded-full items-center bg-white border p-2">
              <img className="h-8 w-auto sm:h-10" src={iconUser} alt="" />
            </div>
            <h1 className="text-lg sm:text-2xl font-semibold mx-4">
              Nombre Cliente
            </h1>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <button className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-black bg-white hover:bg-gray-200">
              <PencilIcon className="h-6 w-6 text-red mr-4" />
              Editar
            </button>
            <Button
              className="ml-4 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm bg-white hover:bg-gray-200"
              text={<XIcon className="h-6 w-6 text-red-500" />}
            />
          </div>
        </div>
      </div>
    </Popover>
  );
}
