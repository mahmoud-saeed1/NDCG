import { ButtonHTMLAttributes, ReactNode } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  title?: string;
  className?: string;
  width?: "w-full" | "w-fit";
}

const Button = ({
  children,
  title,
  className = "bg-black",
  width = "w-full",
  ...rest
}: IButton) => {
  return (
    <button
      className={`py-2 rounded-md text-lg text-white font-bold tracking-wider uppercase hover:scale-105 hover:tracking-widest duration-200 ease-linear ${width} ${className}`}
      {...rest}
    >
      {title ? title : children}
    </button>
  );
};

export default Button;
