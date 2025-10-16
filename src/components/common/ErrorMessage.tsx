import { FC } from "react";

interface ErrorMessageProps {
  message: string;
  dataTestId?: string;
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ message, dataTestId }) => {
  return (
    <div data-test-id={dataTestId} className="text-red-1 text-xs font-medium mt-1">
      {message}
    </div>
  );
};
