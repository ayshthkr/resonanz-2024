import Loading from "@/components/loading";
import SponsorsSection from "@/components/Sponsors/SponsorsSection";
import React from "react";

export default function page() {
  return (
    <main className="min-h-[200vh] w-full min-w-screen overflow-hidden">
      <Loading />
      <SponsorsSection />
    </main>
  );
}
