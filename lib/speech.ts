'use client';

import { useSyncExternalStore } from 'react';

/**
 * Pronunciation through the browser's own speech engine. No audio files, no
 * service, nothing to host — which is why it is free, and also why it is not
 * guaranteed: it needs a Japanese voice on the reader's device. Chrome ships one,
 * Edge ships a natural-sounding one, and iOS, macOS and Android have their own,
 * but Windows on its own, and Firefox there, often has none.
 *
 * The rule is strict: no Japanese voice, no audio. Speaking Japanese text with an
 * English voice produces noise or silence, and a speaker button that does that is
 * worse than none, so every button renders nothing until a Japanese voice is found.
 */

type State = {
  voice: SpeechSynthesisVoice | null;
  /** True once the voice list has been read, so "none" means none rather than "not yet". */
  checked: boolean;
  /** Key of the button whose text is playing, so it alone shows as active. */
  playing: string | null;
};

const SERVER: State = { voice: null, checked: false, playing: null };
let state: State = SERVER;
const listeners = new Set<() => void>();

function set(patch: Partial<State>) {
  state = { ...state, ...patch };
  listeners.forEach((fn) => fn());
}

/**
 * Prefer the voices that sound most like a person: Edge's "Natural" voices and
 * Google's network voice, then the platform voices that ship with iOS, macOS and
 * Windows. Any Japanese voice beats none.
 */
function pickVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const ja = voices.filter((v) => /^ja([-_]|$)/i.test(v.lang));
  const score = (v: SpeechSynthesisVoice) =>
    (/natural|neural|online/i.test(v.name) ? 4 : 0) +
    (/google/i.test(v.name) ? 3 : 0) +
    (/kyoko|otoya|nanami|haruka|ayumi|ichiro|o-ren/i.test(v.name) ? 2 : 0) +
    (v.lang.replace('_', '-') === 'ja-JP' ? 1 : 0);
  return ja.sort((a, b) => score(b) - score(a))[0] ?? null;
}

let started = false;
function start() {
  if (started || typeof window === 'undefined') return;
  started = true;
  if (!('speechSynthesis' in window)) {
    set({ checked: true });
    return;
  }
  const read = () => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length) set({ voice: pickVoice(voices), checked: true });
    return voices.length > 0;
  };
  // Chrome fills the list asynchronously and fires voiceschanged; Safari fills it a
  // tick later and may never fire. Listen, and also look again a few times.
  window.speechSynthesis.addEventListener('voiceschanged', read);
  if (!read()) {
    for (const ms of [250, 1000, 2500]) setTimeout(read, ms);
    // A browser with speech support but no voices at all still deserves an answer.
    setTimeout(() => !state.checked && set({ checked: true }), 3000);
  }
}

function subscribe(fn: () => void) {
  start();
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function useSpeech() {
  const s = useSyncExternalStore(subscribe, () => state, () => SERVER);
  return { available: s.voice !== null, checked: s.checked, playing: s.playing };
}

/**
 * A slightly slower pace than conversation: the speed a teacher uses to model a
 * word. Natural voices still sound natural at this rate; slower starts to drag.
 */
const RATE = 0.85;

// Held at module level: Chrome can garbage-collect an utterance mid-sentence, and
// then its end event never fires and the button stays lit.
let current: SpeechSynthesisUtterance | null = null;
let failsafe: ReturnType<typeof setTimeout> | undefined;

export function speak(key: string, text: string) {
  const voice = state.voice;
  if (!voice || !text) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  clearTimeout(failsafe);

  const u = new SpeechSynthesisUtterance(text);
  u.voice = voice;
  u.lang = voice.lang;
  u.rate = RATE;
  const done = () => {
    if (current === u) {
      current = null;
      set({ playing: null });
    }
  };
  u.onend = done;
  u.onerror = done;
  current = u;
  set({ playing: key });
  synth.speak(u);
  // If the engine never reports the end, do not leave the button looking busy.
  failsafe = setTimeout(done, 2500 + text.length * 450);
}

export function stop() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  current = null;
  clearTimeout(failsafe);
  set({ playing: null });
}
