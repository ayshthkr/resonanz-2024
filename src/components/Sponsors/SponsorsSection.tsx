import { Actor } from "next/font/google";
import SponsorMarqueeBox from "./SponsorMarqueeBox";
import TextRevealEffect from "./TextRevealEffect";

const actor = Actor({
  subsets: ["latin"],
  weight: "400",
});

export default function SponsorsSection({
  sponsors,
}: {
  sponsors: string[][];
}) {
  return (
    <>
      <div className="text-white mx-auto flex flex-col items-center md:items-start justify-center md:justify-start pt-8 md:pt-16 px-4 sm:px-8 md:px-16">
        <TextRevealEffect>
          <h2 className="text-6xl md:text-[95px] text-white text-center md:text-left font-[400] font-tungsten md:leading-[115.2px]">
            Our Sponsors
          </h2>
        </TextRevealEffect>
        <div className="border-b-2 border-white mt-4 pb-8">
          <TextRevealEffect>
            <h3 className="text-center md:text-left text-2xl md:text-[30px] text-white font-[400] uppercase md:leading-[38.5px]">
              The people who made this flight possible
            </h3>
          </TextRevealEffect>
        </div>
      </div>
      <SponsorMarqueeBox sponsors={sponsors} />
    </>
  );
}
