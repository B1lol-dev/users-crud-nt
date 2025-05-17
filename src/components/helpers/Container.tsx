import React from "react";

interface IContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: IContainerProps) => {
  return (
    <div className={`max-w-[1800px] w-full mx-auto px-4 ${className}`}>
      {children}
    </div>
  );
};

export default React.memo(Container);
