import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getLesson, modules, neighbours } from '@/lib/curriculum';
import { Blocks } from '@/components/blocks';
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
  return { title: found.lesson.title, description: found.lesson.summary };
}

export default async function LessonPage({ params }: Props) {
  const { module: moduleSlug, lesson: lessonSlug } = await params;
  const found = getLesson(moduleSlug, lessonSlug);
  if (!found) notFound();

  const { module: mod, lesson } = found;
  const { prev, next, index, total } = neighbours(moduleSlug, lessonSlug);

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <nav aria-label="Breadcrumb">
        <Link
          href={`/learn/${mod.slug}/`}
          className="group inline-flex cursor-pointer items-center gap-2 text-sm text-ink-muted transition-colors duration-200 hover:text-sakura-700"
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
      />
    </article>
  );
}
