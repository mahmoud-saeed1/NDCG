import { InputHTMLAttributes } from "react";
interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = ({ className, ...rest }: IInput) => {
  return (
    <input
      className={`border-gray-300 border-2 focus:outline-none focus:border-blue-600 rounded-[0.4rem] px-3 py-2 ${className}`}
      {...rest}
    />
  );
};

export default Input;
