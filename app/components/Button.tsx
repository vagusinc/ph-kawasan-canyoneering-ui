import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { Button as BaseButton } from "~/base-components/ui/button";
import { cn } from "~/lib/utils";

const Button = (
  props: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>
) => {
  return (
    <BaseButton
      {...props}
      className={cn(
        "px-8 py-4 bg-primary text-white text-base rounded-md hover:bg-primary-600",
        props.className
      )}
    >
      {props.children}
    </BaseButton>
  );
};

export { Button };
