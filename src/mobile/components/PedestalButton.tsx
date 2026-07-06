import { forwardRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";

type Ripple = { id: number; x: number; y: number };

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "green" | "orange";
  children: ReactNode;
};

export const PedestalButton = forwardRef<HTMLButtonElement, Props>(function PedestalButton(
  { variant = "green", className = "", children, onPointerDown, ...rest },
  ref,
) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  return (
    <button
      ref={ref}
      {...rest}
      onPointerDown={(e) => {
        const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = Date.now() + Math.random();
        setRipples((prev) => [...prev, { id, x, y }]);
        setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 650);
        onPointerDown?.(e);
      }}
      className={`wcc-pedestal ${variant === "orange" ? "wcc-pedestal-orange" : ""} ${className}`}
    >
      <span className="wcc-pedestal-top">
        <span className="wcc-pedestal-shine" aria-hidden />
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
        {ripples.map((r) => (
          <span
            key={r.id}
            aria-hidden
            style={{
              position: "absolute",
              left: r.x,
              top: r.y,
              width: 220,
              height: 220,
              borderRadius: 9999,
              pointerEvents: "none",
              transform: "translate(-50%,-50%) scale(0)",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.25) 40%, transparent 70%)",
              animation: "wcc-cta-ripple 620ms ease-out forwards",
              mixBlendMode: "screen",
            }}
          />
        ))}
      </span>
    </button>
  );
});
