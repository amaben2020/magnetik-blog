import { twMerge } from "tailwind-merge";

interface TButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({ children, className, ...rest }: TButton) => {
  return (
    <button className={twMerge("px-3", className)} {...rest}>
      {children}
    </button>
  );
};

export default Button;
