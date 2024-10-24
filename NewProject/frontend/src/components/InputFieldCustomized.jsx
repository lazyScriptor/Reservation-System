import React from "react";

export default function InputFieldCustomized({
  type,
  placeholder,
  register,
  name,
  error,
  helperText,
  setErrorMessage,
  setErrorToogle,
}) {
  // Function to clear error when input is modified
  const handleChange = (e) => {
    setErrorMessage(""); // Clear the error message
    setErrorToogle(false); // Toggle the error flag off
  };

  return (
    <div>
      <input
        name={name}
        onChange={handleChange} // Call the handleChange function on input change
        placeholder={placeholder}
        type={type}
        {...register(name)} // Spread the register function here for form handling
        className={`border border-gray-300 p-1 pl-2 rounded-md w-full text-brandOrange/80 focus:border-0 ring-brandOrange/60 focus:ring-brandOrange ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && <p className="text-red-500 text-sm">{helperText}</p>}{" "}
      {/* Display error message */}
    </div>
  );
}
export function SelectFieldCustomized({
  name,
  register,
  options,
  error,
  helperText,
  setErrorMessage,
  setErrorToogle,
  label,
  description,
}) {
  // Function to clear error when select is modified
  const handleChange = (e) => {
    setErrorMessage(""); // Clear the error message
    setErrorToogle(false); // Toggle the error flag off
  };

  return (
    <div className="flex flex-col">
      <label className="mb-1">{label}</label>
      <p className="text-sm text-gray-500 py-2">{description}</p>
      <select
        name={name}
        onChange={handleChange} // Call the handleChange function on select change
        {...register(name)} // Spread the register function here for form handling
        className={`border border-gray-300 p-1 pl-2 rounded-md w-full text-brandOrange/80 focus:border-0 ring-brandOrange/60 focus:ring-brandOrange ${
          error ? "border-red-500" : ""
        }`}
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm">{helperText}</p>}{" "}
      {/* Display error message */}
    </div>
  );
}
