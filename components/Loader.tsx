import React from "react";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  title?: string;
  className?: string;
}

const Loader = ({ className, ...props }: Props) => {
  return (
    <div
      className={
      className + " inline-block w-12 h-12 border-2 border-solid border-transparent border-t-[#ffffff] border-l-[#ffffff] rounded-full animate-rotate-center "
        
      }
      {...props}
    />
  );
};

export default Loader;
