"use client";

export default function Accordion({
  accordionOpen,
  setAccordionOpen,
  question,
  answer,
}: {
  accordionOpen: boolean;
  setAccordionOpen: () => void;
  question: string;
  answer: string;
}) {
  return (
    <div className="py-2">
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(217, 217, 217, 0.28) 0%, rgba(255, 160, 160, 0.28) 100%)",
          border: "2px solid",
          borderImageSource: "linear-gradient(90deg, #FF92E7 0%, #FFD54B 100%)",
          borderImageSlice: "1",
          borderRadius: "16px",
          alignItems: 'stretch'
        }}
        className="flex items-center justify-between w-full text-left font-semibold p-3"
        onClick={setAccordionOpen}
        aria-expanded={accordionOpen}
        aria-controls={`accordion-text-01`}
      >
        <span className="!text-white font-actor capitalize">{question}</span>
        <svg
          className="fill-white shrink-0 ml-8"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`ttransform origin-center transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
        </svg>
      </div>
      <div
        id={`accordion-text-01`}
        role="region"
        aria-labelledby={`accordion-title-01`}
        className={`grid text-sm overflow-hidden transition-all duration-300 ease-in-out p-2 rounded-lg mt-2 font-actor ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(90deg, rgba(217, 217, 217, 0.28) 0%, rgba(255, 160, 160, 0.28) 100%)",
          border: "2px solid",
          borderImageSource: "linear-gradient(90deg, #FF92E7 0%, #FFD54B 100%)",
          borderImageSlice: "1",
          borderRadius: "16px",
        }}
      >
        <div className="overflow-hidden">
          <p className="pb-3 !text-white">{answer}</p>
        </div>
      </div>
    </div>
  );
}
