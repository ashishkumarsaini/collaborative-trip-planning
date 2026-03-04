import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { type ReactNode, type FC } from "react";

export enum TextType {
  paragraph = 'p',
  span = 'span'
}

export enum TextSize {
  xxl = 'xxl',
  xl = 'xl',
  lg = 'lg',
  md = 'md',
  sm = 'sm',
  xs = 'xs',
  xxs = 'xxs'
}

const typographyVariants = cva('font-normal', {
  variants: {
    size: {
      [TextSize.xxl]: 'text-4xl lg:text-6xl',
      [TextSize.xl]: 'text-2xl lg:text-4xl',
      [TextSize.lg]: 'text-xl lg:text-2xl',
      [TextSize.md]: 'text-lg lg:text-xl',
      [TextSize.sm]: 'text-md lg:text-lg',
      [TextSize.xs]: 'text-base lg:text-md',
      [TextSize.xxs]: 'text-xs lg:text-sm',
    }
  },
  defaultVariants: {
    size: TextSize.md
  }
});


type TextProps = {
  className?: string,
  children: ReactNode,
  type?: TextType
}
  & React.ComponentPropsWithoutRef<typeof typographyVariants>
  & VariantProps<typeof typographyVariants>;

export const Text: FC<TextProps> = ({ size, type, className, children, ...restProps }) => {
  const Comp = type ?? TextType.paragraph;

  return (
    <Comp {...restProps} className={cn(typographyVariants({ size, className }))}>
      {children}
    </Comp>
  );
};