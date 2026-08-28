import type { Lesson, Module } from './types';
import { soundsAndScript } from './m1-sounds';
import { numbersAndCounting } from './m2-numbers';
import { firstSentences } from './m3-sentences';
import { kanjiFoundations } from './m4-kanji';
import { towardN4 } from './m5-n4';

export type { Block, Example, Lesson, Module, VocabItem } from './types';

/** Ordered — this is the intended path through the course. */
export const modules: Module[] = [
  soundsAndScript,
  numbersAndCounting,
  firstSentences,
  kanjiFoundations,
  towardN4,
];

export function getModule(slug: string): Module | undefined {
  return modules.find((m) => m.slug === slug);
}

export function getLesson(
  moduleSlug: string,
  lessonSlug: string
): { module: Module; lesson: Lesson } | undefined {
  const module = getModule(moduleSlug);
  const lesson = module?.lessons.find((l) => l.slug === lessonSlug);
  return module && lesson ? { module, lesson } : undefined;
}

/** Flattened reading order, used for progress tracking and prev/next links. */
export type LessonRef = {
  moduleSlug: string;
  moduleTitle: string;
  lessonSlug: string;
  lessonTitle: string;
  id: string;
};

export const lessonOrder: LessonRef[] = modules.flatMap((m) =>
  m.lessons.map((l) => ({
    moduleSlug: m.slug,
    moduleTitle: m.title,
    lessonSlug: l.slug,
    lessonTitle: l.title,
    id: `${m.slug}/${l.slug}`,
  }))
);

export function neighbours(moduleSlug: string, lessonSlug: string) {
  const i = lessonOrder.findIndex((r) => r.id === `${moduleSlug}/${lessonSlug}`);
  return {
    prev: i > 0 ? lessonOrder[i - 1] : null,
    next: i >= 0 && i < lessonOrder.length - 1 ? lessonOrder[i + 1] : null,
    index: i,
    total: lessonOrder.length,
  };
}

export const totalLessons = lessonOrder.length;

export const totalMinutes = modules.reduce(
  (sum, m) => sum + m.lessons.reduce((s, l) => s + l.minutes, 0),
  0
);
