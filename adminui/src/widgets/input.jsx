import React from "react";

const Input = React.forwardRef(
  ({ label, errors, value, type, placeholder, ...rest }, ref) => {
    return (
      <div className="flex flex-col">
        <div className=" flex justify-between">
          {label && (
            <label className="mb-1 text-sm capitalize font-medium ">
              {label} :
            </label>
          )}
          <p className=" text-red-600 text-xs">{errors}</p>
        </div>

        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          {...rest}
          className="border rounded px-3 py-3 mt-3 text-sm w-full"
          value={value}
          multiple={true}
        />
      </div>
    );
  }
);

export default Input;
