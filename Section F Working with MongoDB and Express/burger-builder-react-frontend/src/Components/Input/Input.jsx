import React from "react";

export default function Input({
  name,
  type,
  label,
  placeholder,
  value,
  options,
  error,
  touched,
}) {
  if (options) {
    type = "select";
    options = options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ));
    // options[0].selected = true;
  }
  const InputType = type === "text" ? "input" : type;
  // console.log(name);
  label = label || capitalize(name.replace(/_/g, " "));
  placeholder = placeholder || `Your ${label} here`;
  return (
    <div>
      <div className="form-group">
        <label className="my-2" htmlFor={name}>
          {label}
        </label>
        <InputType
          type={type}
          className="form-control"
          name={name}
          id={name}
          aria-describedby={name}
          placeholder={placeholder}
          defaultValue={value}
        >
          {options}
        </InputType>
      </div>
      {/* {console.log("error", error)} */}
      {error ? (
        <small id={name + "Help"} className="text-danger">
          {error}
        </small>
      ) : null}
    </div>
  );
}
Input.defaultProps = {
  type: "text",
  value: "",
  error: null,
};

function capitalize(str) {
  if (str) return str.charAt(0).toUpperCase() + str.slice(1);
  return str;
}
