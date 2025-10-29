import { FC, ReactNode } from "react";

interface StageContainerProps {
  children: ReactNode;
}

const StageContainer: FC<StageContainerProps> = ({ children }) => {
  return (
    <div className="mt-5 mx-16">
      {children}
    </div>
  );
};

export default StageContainer;
