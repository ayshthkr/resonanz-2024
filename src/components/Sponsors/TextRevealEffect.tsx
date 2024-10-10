"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

interface TextRevealEffectProps extends React.HTMLAttributes<HTMLDivElement> {
}

export default function TextRevealEffect({
  children,
  className,
  ...props
}: TextRevealEffectProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-reveal-up");
        } else {
          entry.target.classList.remove("animate-reveal-up");
          entry.target.classList.remove('opacity-100'); 
          entry.target.classList.add('opacity-0');
        }
      });
    }, {
        threshold: 0,
        });


    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div {...props} className={cn("overflow-hidden", className)}>
      <div ref={ref} className="opacity-0 transition-opacity duration-1000">
        {children}
        </div>
    </div>
  );
}
