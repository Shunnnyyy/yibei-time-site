import type { JSX } from "react";

type CoffeeIconProps = {
  className?: string;
};

export type CoffeeIconId =
  | "yirgacheffe"
  | "huila"
  | "espresso"
  | "kenya"
  | "mandheling"
  | "coldCup";

const iconClass = "stroke-current";
const strokeProps = {
  fill: "none",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 1.5,
} as const;

function YirgacheffeIcon({ className }: CoffeeIconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <path className={iconClass} d="M20 26h24l-5 23H25l-5-23Z" {...strokeProps} />
      <path className={iconClass} d="M18 26h28M25 33h14M28 39h8" {...strokeProps} />
      <path className={iconClass} d="M31 17c-3-4 3-7 0-11M39 18c-2-4 4-6 2-10" {...strokeProps} />
      <path className={iconClass} d="M26 49h12l5 8H21l5-8Z" {...strokeProps} />
    </svg>
  );
}

function HuilaIcon({ className }: CoffeeIconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <path className={iconClass} d="M18 30h27v10a13 13 0 0 1-13 13h-1a13 13 0 0 1-13-13V30Z" {...strokeProps} />
      <path className={iconClass} d="M45 34h5a5 5 0 0 1 0 10h-5M16 56h32" {...strokeProps} />
      <path className={iconClass} d="M26 22c-2-3 2-5 0-8M34 22c-2-3 2-5 0-8M42 22c-2-3 2-5 0-8" {...strokeProps} />
    </svg>
  );
}

function EspressoIcon({ className }: CoffeeIconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <path className={iconClass} d="M17 12h30v29H17V12Z" {...strokeProps} />
      <path className={iconClass} d="M23 19h18M25 29h15M40 29h9" {...strokeProps} />
      <path className={iconClass} d="M28 29v8M35 29v8M24 49h18M28 41v8M38 41v8" {...strokeProps} />
      <path className={iconClass} d="M20 55h26" {...strokeProps} />
    </svg>
  );
}

function KenyaIcon({ className }: CoffeeIconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <circle className={iconClass} cx="32" cy="32" r="4" {...strokeProps} />
      <path className={iconClass} d="M32 14c6 6 6 12 0 18-6-6-6-12 0-18ZM32 50c-6-6-6-12 0-18 6 6 6 12 0 18Z" {...strokeProps} />
      <path className={iconClass} d="M14 32c6-6 12-6 18 0-6 6-12 6-18 0ZM50 32c-6 6-12 6-18 0 6-6 12-6 18 0Z" {...strokeProps} />
      <path className={iconClass} d="M20 20c8 0 12 4 12 12-8 0-12-4-12-12ZM44 44c-8 0-12-4-12-12 8 0 12 4 12 12Z" {...strokeProps} />
    </svg>
  );
}

function MandhelingIcon({ className }: CoffeeIconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <path className={iconClass} d="M43 12c10 6 9 23-1 35-10 11-25 10-30 0-5-9 1-25 12-33 6-4 13-5 19-2Z" {...strokeProps} />
      <path className={iconClass} d="M25 15c7 6 6 13 1 19-5 6-5 11 2 17" {...strokeProps} />
    </svg>
  );
}

function ColdCupIcon({ className }: CoffeeIconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <path className={iconClass} d="M22 17h20l-3 38H25l-3-38Z" {...strokeProps} />
      <path className={iconClass} d="M20 17h24M24 29h16M27 37l4 4M37 37l-4 4" {...strokeProps} />
      <path className={iconClass} d="M32 11V5M27 8l5 3 5-3" {...strokeProps} />
    </svg>
  );
}

const icons = {
  yirgacheffe: YirgacheffeIcon,
  huila: HuilaIcon,
  espresso: EspressoIcon,
  kenya: KenyaIcon,
  mandheling: MandhelingIcon,
  coldCup: ColdCupIcon,
} satisfies Record<CoffeeIconId, (props: CoffeeIconProps) => JSX.Element>;

export function CoffeeIcon({ id, className }: CoffeeIconProps & { id: CoffeeIconId }) {
  const Icon = icons[id];
  return <Icon className={className} />;
}
