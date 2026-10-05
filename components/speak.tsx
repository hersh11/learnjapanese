'use client';

import { useId } from 'react';
import { speak, stop, useSpeech } from '@/lib/speech';
import { Volume2 } from './icons';

/**
 * sm sits inline with body text and stays inside its line box, so appearing after
 * the voice list loads cannot push the lines below it. md fits a card corner; lg
 * is for the practice card, where the word is set large.
 */
const sizes = {
  // The negative margin keeps a 24px target from enlarging a 22px line of text.
  sm: { box: '-my-1 h-6 w-6', icon: 'h-3.5 w-3.5' },
  md: { box: 'h-7 w-7', icon: 'h-4 w-4' },
  lg: { box: 'h-9 w-9', icon: 'h-5 w-5' },
} as const;

/**
 * A speaker button that renders only where it can work: nothing during the
 * server render, nothing if the device has no Japanese voice. See lib/speech.ts.
 */
export function Speak({
  text,
  label,
  size = 'sm',
  id,
  shortcut,
  reserve = false,
  className = '',
}: {
  /** What the voice reads. Usually from speakable(), so it matches the lesson. */
  text: string;
  /** What the button is for, for screen readers: usually the Japanese as written. */
  label: string;
  size?: keyof typeof sizes;
  /** Fixed key, so code outside the button (a keyboard shortcut) can light it up. */
  id?: string;
  /** Key that also plays it, shown in the tooltip. */
  shortcut?: string;
  /**
   * Hold the button's space even when it cannot render. The voice list loads after
   * first paint, so a button that appears in a table cell or at the end of a line
   * would widen a column or wrap a line and move everything after it. An invisible
   * placeholder of the same size makes its arrival a swap, not a shift.
   */
  reserve?: boolean;
  className?: string;
}) {
  const auto = useId();
  const key = id ?? auto;
  const { available, playing } = useSpeech();
  const s = sizes[size];

  if (!available || !text) {
    return reserve ? (
      <span aria-hidden="true" className={`inline-block shrink-0 align-middle ${s.box} ${className}`} />
    ) : null;
  }

  const active = playing === key;

  return (
    <button
      type="button"
      // These sit inside lang="ja" text; without this a screen reader would say
      // "Hear" in a Japanese voice.
      lang="en"
      onClick={(e) => {
        // Never let a click here also trigger a card or quiz cell around it.
        e.stopPropagation();
        if (active) stop();
        else speak(key, text);
      }}
      aria-label={active ? 'Stop' : `Hear ${label}`}
      title={active ? 'Stop' : shortcut ? `Hear it (${shortcut})` : 'Hear it'}
      className={`tap inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full
                  align-middle transition-colors duration-200 ${s.box}
                  ${
                    active
                      ? 'bg-sakura-50 text-sakura-600'
                      : 'text-ink-faint hover:bg-paper-sunk hover:text-sakura-600'
                  } ${className}`}
    >
      <span className={`${s.icon} ${active ? 'animate-pulse' : ''}`}>
        <Volume2 />
      </span>
    </button>
  );
}

/**
 * Said only when there is no voice to use, so the absence of speaker buttons is
 * explained rather than mysterious. Renders nothing until the check finishes.
 */
export function VoiceNotice({ className = '' }: { className?: string }) {
  const { available, checked } = useSpeech();
  if (!checked || available) return null;
  return (
    <p className={`text-sm leading-relaxed text-ink-muted ${className}`}>
      Audio is off because this browser has no Japanese voice. Chrome and Edge come
      with one. On Windows you can also add Japanese under Settings → Time &amp;
      language → Speech, then reload this page.
    </p>
  );
}
