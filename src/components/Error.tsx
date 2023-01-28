import { Fallback } from "../types";

export const ErrorFallback = ({ error, resetErrorBoundary }: Fallback) => {
  return (
    <div className="flex justify-center items-center flex-col error-container">
      <h1 className="error-heading">{error.message.toUpperCase()}</h1>
      <button className="btn btn-primary" onClick={resetErrorBoundary}>
        Fix Issue
      </button>
    </div>
  );
};
