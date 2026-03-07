import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import type React from 'react';
import { type ReactNode, type FC } from 'react';

export enum HeadingSize {
  xxl = 'xxl',
  xl = 'xl',
  lg = 'lg',
  md = 'md',
  sm = 'sm',
  xs = 'xs',
}

export enum HeadingLevel {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
}

const headingVariants = cva('font-medium tracking-wide', {
  variants: {
    size: {
      [HeadingSize.xxl]: 'text-3xl lg:text-6xl',
      [HeadingSize.xl]: 'text-2xl lg:text-4xl',
      [HeadingSize.lg]: 'text-xl lg:text-2xl',
      [HeadingSize.md]: 'text-lg lg:text-xl',
      [HeadingSize.sm]: 'text-md lg:text-lg',
      [HeadingSize.xs]: 'text-base lg:text-md',
    }
  },
  defaultVariants: {
    size: HeadingSize.md
  }
});

type HeadingProps = {
  className?: string,
  children: ReactNode,
  level?: HeadingLevel
} & React.ComponentPropsWithRef<typeof headingVariants> & VariantProps<typeof headingVariants>;

export const Heading: FC<HeadingProps> = ({ level, size, className, children, ...restProps }) => {
  const Comp = level ?? HeadingLevel.h1;

  return (
    <Comp {...restProps} className={cn(headingVariants({ size, className }))}>
      {children}
    </Comp>
  );
};
