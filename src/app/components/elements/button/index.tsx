import { Component } from "react";
import { twMerge } from "tailwind-merge";

interface TButton extends Component<"button"> {
  className: string;
}

const Button = ({ className, ...rest }: TButton) => {
  return (
    <button className={twMerge("px-3", className)} {...rest}>
      Button
    </button>
  );
};

export default Button;
