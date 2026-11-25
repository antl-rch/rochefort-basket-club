import type { AnchorHTMLAttributes } from 'react';

interface SectionLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  targetId: string;
}

export function SectionLink({ targetId, children, ...props }: SectionLinkProps) {
  return (
    <a
      {...props}
      href={`#${targetId}`}
      onClick={(event) => {
        event.preventDefault();
        const target = document.getElementById(targetId);
        target?.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'instant'
            : 'smooth',
        });
        if (target && targetId === 'main-content') {
          target.tabIndex = -1;
          target.focus({ preventScroll: true });
        }
      }}
    >
      {children}
    </a>
  );
}
