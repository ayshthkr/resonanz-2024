import { Inter } from "next/font/google";
import Effect from "./Marquee";

const inter = Inter({
  subsets: ["latin"],
  weight: "800",
});

export default function SponsorMarqueeBox({
  sponsors,
}: {
  sponsors: string[][];
}) {
  return (
    <div className="mt-4">
      {sponsors.map((sponsor, i) => (
        <Effect pauseOnHover={i % 2 == 0} key={i}>
          {sponsor.map((item, index) => (
            <SponsorItem key={index} text={item} />
          ))}
        </Effect>
      ))}
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
