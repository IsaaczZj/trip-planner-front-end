interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {}

import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "rounded-lg px-5 py-2 font-medium flex items-center justify-center gap-2 cursor-pointer",
  variants: {
    variant: {
      primary: "bg-lime-300 text-lime-950 hover:bg-lime-400",
      secondary: "bg-zinc-800 text-zinc-200 hover:opacity-75",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});
export function Button({
  children,
  className,
  variant,
  ...props
}: ButtonProps) {
  return (
    <button className={buttonVariants({ variant, className })} {...props}>
      {children}
    </button>
  );
}
