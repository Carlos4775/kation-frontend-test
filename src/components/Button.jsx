import clsx from "clsx";

const Button = ({ text, icon, className, ...props }) => {
  return (
    <div className="flex rounded-md">
      <button
        type="button"
        className={clsx(
          "h-10 flex items-center py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
          className
        )}
        {...props}
      >
        {icon}
        {text}
      </button>
    </div>
  );
};

export default Button;
