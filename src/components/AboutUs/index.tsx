import React from "react";
import TextRevealEffect from "../Sponsors/TextRevealEffect";
import { Actor } from "next/font/google";


const actor = Actor({
    subsets: ["latin"],
    weight: "400",
  });
  
function AboutUs() {
  return (
    <div
      className={`h-screen w-screen relative pt-16 ${actor.className}`}
      style={{ background: "url('/aboutus.png')" }}
    >
      <div className="absolute top-0 left-0 h-screen w-screen bg-black/50"></div>
      <div className="grid grid-cols-2 h-full relative z-20">
        <div className="relative">
          <img
            src="/astronaut.png"
            className="h-[80%] w-auto object-contain absolute top-1/2 -translate-y-1/2"
          />
        </div>
        <div className="py-6 px-10 flex flex-col items-end">
          <div className="border-b-4 w-fit">
            <TextRevealEffect>
              <h2 className="text-6xl md:text-[95px] text-white text-center md:text-left font-[400] uppercase font-tungsten md:leading-[115.2px]">
                About Us
              </h2>
            </TextRevealEffect>
          </div>
          <p className="text-white text-right py-20 uppercase">
            Design is more than visuals; it's a language that bridges
            functionality and user experience. As technology evolves, so does
            the demand for interfaces that are not only visually appealing but
            also intuitive and accessible. Good design prioritizes clarity,
            ensuring that every element has purpose, guiding users effortlessly
            toward their goals. It&apos;s about understanding the user&apos;s needs and
            aligning them with the project&apos;s objectives. For those passionate
            about creating impactful digital experiences, design becomes a blend
            of art and empathy. Every pixel matters, and every choice reflects a
            commitment to making interactions smoother, leaving users satisfied
            and engaged with each visit.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;