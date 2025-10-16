import React, { FC } from "react";

interface StatisticsCardProps {
  color: string;
  icon: React.ReactNode;
  title: React.ReactNode;
  value: React.ReactNode;
  footer?: React.ReactNode | null;
}

const StatisticsCard: FC<StatisticsCardProps> = ({ color, icon, title, value, footer }) => {
  return (
    <div className={`bg-white rounded-2xl border border-${color}-100 shadow-sm m-5`}>
      <div className="flex">
        <div className={`bg-${color}-500 h-14 w-14 items-center justify-center p-3`}>{icon}</div>
        <div className="flex-auto p-3 text-right">
          <p className="text-sm font-normal text-gray-500">{title}</p>
          <p className="text-lg text-black font-bold">{value}</p>
        </div>
      </div>
      {footer && <div className="border-t border-blue-gray-50 p-4">{footer}</div>}
    </div>
  );
};

StatisticsCard.defaultProps = {
  color: "blue",
  footer: null,
};

export default StatisticsCard;
