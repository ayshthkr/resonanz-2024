"use client";

import { useEffect, useState } from "react";
import Accordion from "./accordion";

export default function FAQ() {

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setX(e.clientX);
    setY(e.clientY);
  };

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    if(typeof window !== "undefined") {
      setX(window.innerWidth / 2);
      setY(window.innerHeight / 2);
    }
  }, []);
  
  return (
    <>
      <div
        className="relative min-h-screen w-screen"
        id="asd"
        onMouseMove={handleMouseMove}
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 z-0"
          style={{ backgroundImage: "url('/faq-background.jpg')" }}
        ></div>
        <img
          src="/ship.png"
          alt="ship"
          className={`absolute z-10 transition-all ease-out duration-500`}
          style={{
            top: `${y}px`,
            left: `${x}px`,
            transform: `translate(-50%, -50%) rotate(${(x - (typeof window !== "undefined" ? window.innerWidth : 0) / 2) / 40}deg)`,
          }}
        />
        <div className="relative z-10">
          <p className="font-tungsten text-white text-7xl text-center py-10">
            FAQ S
          </p>
          <Boxes />
        </div>
      </div>
    </>
  );
}

function Boxes() {
  const [expandedBox, setExpandedBox] = useState<string | null>(null)

  const boxes = [
    { id: '1', title: 'Box 1', question: "When will Resonanz '24 be held?", answer: "Resonanz is a two-day annual intra-college cultural fest, scheduled for the 17th and 18th of October 2024." },
    { id: '2', title: 'Box 2', question: "Who can attend Resonanz '24?", answer: "All students of Netaji Subhas University of Technology (NSUT), Delhi, are eligible to attend and participate in Resonanz." },
    { id: '3', title: 'Box 3', question: "Where will Resonanz '24 be held?", answer: "Resonanz '24 will take place at the Main Campus of NSUT, Delhi, in Dwarka." },
    { id: '4', title: 'Box 4', question: "What  is  the  Battle  of  Branches?", answer: "The Battle of Branches is a series of inter-branch competitive events where winners earn points that contribute to their respective branch's overall score. The branches with the highest scores will be announced as winners at the end of the festival." },
    { id: '5', title: 'Box 5', question: "Are outsiders allowed to participate?", answer: "No, Resonanz '24 is exclusively for NSUT students." },
    { id: '6', title: 'Box 6', question: "What are the timings for the events?", answer: "The timings for the events will be announced later. Check the Resonanz '24 website for updates." },
  ]

  const handleExpand = (boxId: string) => {
    setExpandedBox(expandedBox === boxId ? null : boxId)
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-2 sm:p-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-stretch">
        {boxes.map((box, index) => (
          <div
            key={index}
            className={`transition-all duration-300 ease-in-out col-span-1 row-span-1`}
            onClick={() => handleExpand(`${index}`)}
          >
            <Accordion accordionOpen={expandedBox === `${index}`} setAccordionOpen={() => setExpandedBox(`${index}`)} question={box.question} answer={box.answer} />
          </div>
        ))}
      </div>
    </div>
  )
}