import AnimatedBeam from "@/components/animata/background/animated-beam";
import Navbar from "@/components/Navbar";
import React from "react";

export default function page() {
  return (
    <div className="min-h-screen">
      <AnimatedBeam className="h-screen fixed top-0 left-0 w-full">
        <div></div>
      </AnimatedBeam>
      <Navbar className="sticky top-0 left-0 w-full z-50" />
    </div>
  );
}
