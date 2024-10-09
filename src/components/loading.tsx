"use client";
import React, { useState, useEffect } from "react";

function Loading() {
  const [animateLogo, setAnimateLogo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showResonanz, setShowResonanz] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateLogo(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const loadingTimer = setTimeout(() => {
      setLoading(false);
      console.log("Loading complete");
    }, 3000);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    if (!loading) {
      const resonanzTimer = setTimeout(() => {
        setShowResonanz(true);
        document.body.style.overflow = "auto";
      }, 1000);

      return () => {
        clearTimeout(resonanzTimer);
        document.body.style.overflow = "auto";
      };
    }
  }, [loading]);

  return (
    <section
      id="container"
      className={`h-screen w-full relative bg-cover bg-repeat overflow-hidden`}
      style={{ backgroundImage: "url('/StarsBG.png')" }}
    >
      <div
        className={`absolute h-full w-full z-10 transition-all duration-1000 ease-in-out flex justify-center items-center transform
          ${!loading ? "translate-y-96 scale-125" : "-translate-x-[40rem]"}
        `}
      >
        <img
          src="/Globe.png"
          alt="Globe"
          className="transition-all duration-1000 ease-in-out object-cover animate-spin-slow max-h-screen w-auto"
        />
      </div>
      <div className="absolute top-0 left-0 h-full w-full bg-black opacity-50 z-20"></div>
      <div
        className={`absolute inset-0 h-screen w-screen flex flex-col justify-center items-center z-30 transition-all duration-1000 ease-in-out transform
          ${!loading ? "scale-50" : "translate-y-0"}
        `}
      >
        <div className="absolute top-0">
          <img
            src="/resonanz.svg"
            alt="Resonanz"
            className={`transition-all duration-1000 ease-in-out transform scale-[1.6]
              ${!showResonanz ? "opacity-0 scale-50" : "opacity-100"}
              
            `}
          />
        </div>
        <img
          src="/ResoLogo.png"
          alt="Logo"
          className={`max-w-[80vw] object-contain lg:max-w-full max-h-full transition-all duration-1000 ease-in-out transform
            ${animateLogo ? "scale-50" : "scale-100"}
            ${loading ? "" : "-mt-20"}
          `}
        />
      </div>
      <div
        className={`absolute h-full w-full top-0 left-0 text-white z-50 transition-all duration-1000 ease-in-out 
          ${loading ? "opacity-0" : "opacity-100"}
        `}
      >
        <div className="w-full p-8 space-x-12 flex items-center justify-between font-tungsten tracking-wide text-2xl uppercase">
          <div className="space-x-12 flex">
            <h1>Events</h1>
            <h1>Sponsors</h1>
          </div>
          <div className="justify-end px-6 py-1 rounded-full bg-white text-black">
            Register
          </div>
        </div>
      </div>
    </section>
  );
}

export default Loading;
