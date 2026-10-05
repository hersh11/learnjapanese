import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { absolute, pageMeta } from '@/lib/site';
import { breadcrumbs, JsonLd } from '@/components/json-ld';
import { getLesson, modules, neighbours } from '@/lib/curriculum';
import { itemsForLesson } from '@/lib/practice/items';
import { Blocks } from '@/components/blocks';
import { ReadingProgress } from '@/components/reading-progress';
import { LessonControls } from '@/components/lesson-controls';
import { ArrowLeft, Clock } from '@/components/icons';

type Props = { params: Promise<{ module: string; lesson: string }> };

export function generateStaticParams() {
  return modules.flatMap((m) =>
    m.lessons.map((l) => ({ module: m.slug, lesson: l.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { module: moduleSlug, lesson: lessonSlug } = await params;
  const found = getLesson(moduleSlug, lessonSlug);
  if (!found) return {};
  return pageMeta({
    title: found.lesson.title,
    description: found.lesson.summary,
    path: `/learn/${found.module.slug}/${found.lesson.slug}/`,
  });
}

export default async function LessonPage({ params }: Props) {
  const { module: moduleSlug, lesson: lessonSlug } = await params;
  const found = getLesson(moduleSlug, lessonSlug);
  if (!found) notFound();

  const { module: mod, lesson } = found;
  const { prev, next, index, total } = neighbours(moduleSlug, lessonSlug);

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <ReadingProgress />
      <JsonLd
        data={{
          '@graph': [
            {
              '@type': 'LearningResource',
              name: lesson.title,
              description: lesson.summary,
              url: absolute(`/learn/${mod.slug}/${lesson.slug}/`),
              inLanguage: 'en',
              learningResourceType: 'Lesson',
              educationalLevel: `JLPT ${mod.level}`,
              timeRequired: `PT${lesson.minutes}M`,
              isAccessibleForFree: true,
              isPartOf: { '@type': 'Course', name: mod.title, url: absolute(`/learn/${mod.slug}/`) },
            },
            breadcrumbs([
              ['The course', '/learn/'],
              [mod.title, `/learn/${mod.slug}/`],
              [lesson.title, `/learn/${mod.slug}/${lesson.slug}/`],
            ]),
          ],
        }}
      />

      <nav aria-label="Breadcrumb">
        <Link
          href={`/learn/${mod.slug}/`}
          className="group -my-1 inline-flex cursor-pointer items-center gap-2 py-1 text-sm text-ink-muted transition-colors duration-200 hover:text-sakura-700"
        >
          <span className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5">
            <ArrowLeft />
          </span>
          {mod.title}
        </Link>
      </nav>

      <header className="mt-8 border-b border-rule pb-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs uppercase tracking-wider text-ink-faint">
          <span className="rounded-full border border-rule px-2 py-0.5 font-medium">
            {mod.level}
          </span>
          <span className="tabular-nums">
            Lesson {index + 1} of {total}
          </span>
          <span className="flex items-center gap-1.5 tabular-nums">
            <span className="h-3.5 w-3.5">
              <Clock />
            </span>
            {lesson.minutes} min
          </span>
        </div>

        <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight text-ink">
          {lesson.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-muted">{lesson.summary}</p>
      </header>

      <div className="mt-2">
        <Blocks blocks={lesson.body} />
      </div>

      <LessonControls
        id={`${mod.slug}/${lesson.slug}`}
        prev={prev}
        next={next}
        reviewCount={itemsForLesson(`${mod.slug}/${lesson.slug}`).length}
      />
    </article>
  );
}
