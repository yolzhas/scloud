import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "tertiary";

type ButtonBaseProps = {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
};

type ButtonAsAnchor = ButtonBaseProps &
  ComponentPropsWithoutRef<"a"> & { href: string };

type ButtonAsButton = ButtonBaseProps &
  ComponentPropsWithoutRef<"button"> & { href?: never };

type ButtonProps = ButtonAsAnchor | ButtonAsButton;

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-brand-red text-white hover:bg-brand-red-dark",
  secondary:
    "bg-white text-zinc-900 border border-zinc-200 hover:border-zinc-300",
  tertiary: "bg-zinc-950 text-white hover:bg-zinc-800",
};

const baseStyles =
  "rounded-xl px-6 py-3 text-sm font-bold transition-all duration-200 active:scale-[0.98] inline-flex items-center justify-center gap-2 min-h-[44px]";

function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Button({
  variant = "primary",
  children,
  className,
  ...props
}: ButtonProps) {
  const classes = cn(baseStyles, variantStyles[variant], className);

  if ("href" in props && props.href) {
    const { href, ...rest } = props as ButtonAsAnchor;
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as ComponentPropsWithoutRef<"button">)}>
      {children}
    </button>
  );
}
