'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';

/**
 * Scroll reveal that can never hide content permanently.
 *
 * The previous version drove this with framer-motion's `whileInView`, which meant
 * the element shipped with opacity:0 and depended on an observer firing to become
 * readable. When that observer did not fire the whole page stayed blank — so the
 * animation is now a pure enhancement layered on top of visible content:
 *
 *  - Server render and first paint: fully visible. No JS required to read the page.
 *  - useLayoutEffect (before paint, so no flash): hide and start observing.
 *  - A failsafe timer reveals everything regardless, if the observer never fires.
 *  - prefers-reduced-motion and missing IntersectionObserver skip it entirely.
 */

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined') return;

    const show = () => {
      el.classList.remove('reveal-hidden');
      el.classList.add('reveal-shown');
    };

    // Already on screen at first paint — show it without hiding it first, so
    // above-the-fold content never blinks.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.style.animationDelay = `${delay}s`;
      show();
      return;
    }

    el.classList.add('reveal-hidden');
    el.style.animationDelay = `${delay}s`;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          show();
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);

    // If anything goes wrong with the observer, the content still appears.
    const failsafe = window.setTimeout(show, 2000);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
