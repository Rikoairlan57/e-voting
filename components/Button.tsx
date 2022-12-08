import React from "react";
interface Props {
  onClick: () => void;
  text: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  isLoading?: boolean;
}

const Button = (props: Props) => {
  return (
    <button
      disabled={props.isLoading}
      onClick={(e) => {
        e.preventDefault();
        props.onClick();
      }}
      className={`bg-zinc-900 text-white hover:bg-zinc-100 hover:text-zinc-900 font-bold ${
        props.className
      } ${
        props.size === "sm"
          ? "py-1 px-2 text-sm "
          : props.size === "lg"
          ? "py-3 px-4"
          : "py-2 px-3"
      }`}
    >
      {props.isLoading ? "loading..." : props.text}
    </button>
  );
};

export default Button;
