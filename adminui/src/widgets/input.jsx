import React from "react";

const Input = React.forwardRef(({ label, value,type, placeholder, ...rest }, ref) => {
  return (
    <div className="flex flex-col">
      {label && <label className="mb-1 text-sm capitalize font-medium ">{label} :</label>}
      <input
        ref={ref} 
        type={type}
        placeholder={placeholder}
        {...rest} 
        className="border rounded px-3 py-3 mt-3 text-sm"
        value={value}
      />
    </div>
  );
});

export default Input;
