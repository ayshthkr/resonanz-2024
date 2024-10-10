import React from "react";

function FadeDiv({ direction = "bottom" }) {
  const gradientClass =
    direction === "bottom" ? "bg-gradient-to-b" : "bg-gradient-to-t";

  return (
    <div
      className={`h-32 ${gradientClass} from-transparent via-black to-black relative w-full z-10 -mt-16 -mb-16`}
    />
  );
}

export default FadeDiv;
