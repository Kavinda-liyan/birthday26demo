import { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

const PageWrapper = ({ children, className }: PageWrapperProps) => {
  return (
    <div className={className}>
      <div className="relative h-[100dvh] flex items-center justify-center overflow-hidden ">
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;
