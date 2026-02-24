import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius)] px-6 py-2.5 font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--colour-focus)] disabled:opacity-50";

const variants = {
  primary:
    "bg-[var(--colour-accent)] text-white hover:bg-[var(--colour-accent-hover)] no-underline",
  secondary:
    "bg-transparent border border-[var(--colour-border)] text-[var(--colour-text)] hover:bg-[var(--colour-accent-soft)]",
};

export function Button({
  children,
  variant = "primary",
  href,
  type = "button",
  className = "",
  disabled,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
