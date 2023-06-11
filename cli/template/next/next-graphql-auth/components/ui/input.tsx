import * as React from 'react';
import { clsx } from 'clsx';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={clsx(
          'ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border-2 border-gray-700 bg-transparent px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
