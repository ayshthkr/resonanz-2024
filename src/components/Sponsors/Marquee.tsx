import { cn } from "@/lib/utils";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The number of times to repeat the children. Set this value so that the repeated children overflow the container.
   * @default 5
   */
  repeat?: number;

  /**
   * Reverse the marquee direction.
   */
  reverse?: boolean;

  /**
   * Pause the marquee animation on hover.
   */
  pauseOnHover?: boolean;
}

export default function Marquee ({
  children,
  repeat = 5,
  pauseOnHover = false,
  reverse = false,
  className,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group relative flex h-full w-full p-2 [--duration:10s] [--gap:12px] [gap:var(--gap)] flex-row",
        className
      )}
    >
      {Array.from({ length: repeat }).map((_, index) => (
        <div
          key={`item-${index}`}
          className={cn(
            "flex shrink-0 [gap:var(--gap)] animate-marquee-horizontal flex-row",
            {
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            }
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
