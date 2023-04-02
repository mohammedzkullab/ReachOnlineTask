import type { InputProps } from "components/types";
export const Input = ({
  label = "input",
  id,
  inputType = "text",
  placeholder = "",
  helperText,
  className,
  inputClassName,
  ...rest
}: InputProps) => {
  const classes = {
    wrapper: `w-full ${className || ""}`,
    label: "text-gray-400 font-meduim text-left mb-2",
    input: `border border-1 border-gray-400 outline-none my-4 ${
      inputClassName || ""
    }`,
    helperText: "inline-flex min-h-[20px] text-xs mt-1",
  };
  return (
    <div className={classes.wrapper}>
      {label && (
        <label htmlFor={id} className={classes.label}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={inputType}
        className={classes.input}
        {...rest}
        placeholder={placeholder}
      />
      {helperText && <p className={classes.helperText}>{helperText}</p>}
    </div>
  );
};

export default Input;
