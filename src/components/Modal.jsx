import { XIcon } from "@heroicons/react/outline";
import Button from "./Button";

const Modal = ({ title, handleClose, show, render }) => {
  return (
    <div
      className={
        "modal h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50 " +
        (show ? "" : "hidden")
      }
    >
      <div className="bg-white rounded shadow-lg w-10/12 sm:w-9/12 md:w-8/12 lg:w-6/12">
        <div className="border-b p-4 flex justify-between items-center">
          <h1 className="font-semibold text-sm sm:text-md md:text-lg lg:text-xl">
            {title}
          </h1>
          <Button
            className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 rounded-md bg-white hover:bg-gray-200"
            text={<XIcon className="h-6 w-6 text-blue-700" />}
            onClick={handleClose}
          />
        </div>
        <div>{render()}</div>
      </div>
    </div>
  );
};

export default Modal;
