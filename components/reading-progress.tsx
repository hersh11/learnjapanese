'use client';

import { useEffect, useState } from 'react';

/**
 * Thin scroll-linked bar pinned under the header, showing how far through the
 * lesson the reader is.
 *
 * The measurement runs synchronously in the scroll handler. An earlier version
 * throttled it through requestAnimationFrame, which silently never fires in a
 * backgrounded or non-compositing tab, leaving the bar frozen at 0%. Reading
 * scrollY and comparing two cached numbers is cheap enough not to need it.
 */
export function ReadingProgress() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let scrollable = 0;

    const remeasure = () => {
      const doc = document.documentElement;
      scrollable = doc.scrollHeight - window.innerHeight;
      update();
    };

    const update = () => {
      if (scrollable <= 0) {
        setPercent(0);
        return;
      }
      const next = (window.scrollY / scrollable) * 100;
      setPercent(Math.min(100, Math.max(0, next)));
    };

    remeasure();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', remeasure);

    // Lesson pages grow as fonts and images settle; keep the denominator honest.
    const observer =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(remeasure) : null;
    observer?.observe(document.body);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', remeasure);
      observer?.disconnect();
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-16 z-20 h-0.5"
      aria-hidden="true"
    >
      <div
        className="h-full bg-sakura-500 transition-[width] duration-150 ease-out"
        style={{ width: percent + '%' }}
      />
    </div>
  );
}
