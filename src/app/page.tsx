import AboutUs from "@/components/AboutUs";
import FadeDiv from "@/components/FadeDiv";
import Loading from "@/components/loading";
import SponsorsSection from "@/components/Sponsors/SponsorsSection";
import React from "react";

const sponsors = [
  ["LIC.", "Red Bull.", "Tata."],
  ["LIC.", "Red Bull.", "Tata."],
  ["LIC.", "Red Bull.", "Tata."],
];

export default function page() {
  return (
    <main className="min-h-[200vh] w-full min-w-screen overflow-hidden">
      <Loading />
      <FadeDiv/>
      <AboutUs />     
      <SponsorsSection sponsors={sponsors} />
    </main>
  );
}
