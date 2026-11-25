import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';

interface Appearance { children: ReactNode; variant?: 'blue' | 'orange'; icon?: ReactNode; className?: string }
function classes(variant = 'blue', className = '') { return `button button--${variant} ${className}`; }
export function Button({ children, variant, icon = <FiArrowUpRight />, className, type = 'button', ...props }: Appearance & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type={type} className={classes(variant, className)} {...props}>{children}{icon}</button>;
}
export function ButtonLink({ children, variant, icon = <FiArrowUpRight />, className, ...props }: Appearance & LinkProps) {
  return <Link className={classes(variant, className)} {...props}>{children}{icon}</Link>;
}
