"use client";
import { transform } from "next/dist/build/swc";
import { useEffect, useState } from "react";
import "./Gallery.css";
// Events Array
let events = [
  {
    image: "1d998d2850d206dc596050ffb83368ff.png",
    name: "Event 1",
  },
  {
    image: "2443c9e8aa0c435a974d937ce9179491.jpeg",
    name: "Event 3",
  },
  {
    image: "4a5d3ed05d46375f245b2afc31c45596.jpeg",
    name: "Event 2",
  },
];
// Edge Case
while (events.length < 5 && events.length > 0) {
  events.push(...events);
}

// Styles for Gallery
const styles = {
  center: "",
};

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex) =>
        currentIndex === events.length - 1 ? 0 : currentIndex + 1,
      );
      // Gallery Auto Rotate Time
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="relative flex h-screen flex-col items-center justify-center overflow-hidden mt-40">
      <img
        className="absolute left-0 top-0 -z-30 max-h-full object-contain opacity-50"
        src="/Moon.png"
        alt=""
      />
      <img
        className="absolute bottom-0 left-0 -z-10 w-[300px]"
        src="/dimension-graphic.png"
        alt=""
      />
      <h1 className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 transform bg-gradient-to-b from-white to-black to-80% bg-clip-text font-tungsten text-[35vw] text-transparent opacity-30 md:leading-none lg:text-[20vw]">
        GALLERY
      </h1>
      <h1 className="font-tungsten text-5xl text-[#D1D1D1]/100 opacity-100 md:text-8xl">
        OUR GALLERY
      </h1>
      <h1 className="absolute right-[calc(25%-20px)] top-1 font-serif text-[#7F7F7F]">
        N
      </h1>
      <hr className="border-1 absolute top-[60%] -z-10 w-full scale-x-[400%] border-dashed opacity-30" />
      <hr className="border-1 absolute right-1/4 top-[60%] -z-10 w-full origin-bottom-right rotate-90 scale-x-[400%] border-dashed opacity-30" />
      <div className="relative aspect-[6/4] w-full md:aspect-[12/3]">
        {events.map((event, index) => {
          return (
            <div
              className={`absolute left-1/2 -z-20 aspect-[3/4] w-1/2 rounded-[20px] p-0.5 transition-all duration-500 md:aspect-[4/3] md:w-1/3 md:rounded-[45px] ${
                index === currentIndex
                  ? "z-0 -translate-x-1/2 blur-0"
                  : index === currentIndex + 1 ||
                      (currentIndex === events.length - 1 && index === 0)
                    ? "event-right blur-[1px]"
                    : index === currentIndex - 1 ||
                        (currentIndex === 0 && index === events.length - 1)
                      ? "event-left blur-[1px]"
                      : index === currentIndex + 2 ||
                          (currentIndex === events.length - 1 && index === 1) ||
                          (currentIndex === events.length - 2 && index === 0)
                        ? "event-right-1 blur-[1px]"
                        : index === currentIndex - 2 ||
                            (currentIndex === 0 &&
                              index === events.length - 2) ||
                            (currentIndex === 1 && index === events.length - 1)
                          ? "event-left-1 blur-[1px]"
                          : "hidden"
              }`}
              key={index}
              style={{
                background:
                  "linear-gradient(42.84deg, #FFFFFF 11.82%, #767676 33.16%, #242424 52.79%, #454545 75.83%, #FFFFFF 97.17%)",
              }}
            >
              <img
                className="h-full w-full rounded-[18px] object-cover md:rounded-[41px]"
                src={`/Gallery/${event.image}`}
                alt=""
              />
            </div>
          );
        })}
      </div>
      <button className="mt-10 rounded-full bg-[#D1D1D1] px-28 py-1 font-tungsten text-4xl text-black md:px-40">
        {events[currentIndex].name}
      </button>
    </section>
  );
}
