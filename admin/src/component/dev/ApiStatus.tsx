import React from "react";

function ApiError({
  number = 404,
  text = "please try again",
}: {
  number: number;
  text?: string;
}) {
  return (
    <div className="text-center p-6">
      <label htmlFor="">
        {number} error - {text}
      </label>
    </div>
  );
}

export default ApiError;
