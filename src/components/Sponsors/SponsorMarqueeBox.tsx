import { Inter } from "next/font/google";
import Effect from "./Marquee";

const inter = Inter({
  subsets: ["latin"],
  weight: "800",
});

export default function SponsorMarqueeBox() {
     

  return (
    <div className="mt-4">
      <Effect pauseOnHover>
        {Array.from({ length: 5 }).map((_, index) => (
          <SponsorItem key={index} text="Sponsor." />
        ))}
      </Effect>
      <Effect reverse pauseOnHover>
        {Array.from({ length: 5 }).map((_, index) => (
          <SponsorItem key={index} text="Sponsor." />
        ))}
      </Effect>
      <Effect pauseOnHover>
        {Array.from({ length: 5 }).map((_, index) => (
          <SponsorItem key={index} text="Sponsor." />
        ))}
      </Effect>
    </div>
  );
}

function SponsorItem({ text }: { text: string }) {
  return (
    <span className="text-outline text-6xl md:text-[170px] md:leading-[204px] font-[800] font-inter">
      {text}
    </span>
  );
}
