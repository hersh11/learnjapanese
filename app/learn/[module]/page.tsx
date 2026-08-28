import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getModule, modules } from '@/lib/curriculum';
import { ModuleList } from '@/components/module-list';
import { ArrowLeft } from '@/components/icons';

type Props = { params: Promise<{ module: string }> };

export function generateStaticParams() {
  return modules.map((m) => ({ module: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { module: slug } = await params;
  const m = getModule(slug);
  if (!m) return {};
  return { title: m.title, description: m.summary };
}

export default async function ModulePage({ params }: Props) {
  const { module: slug } = await params;
  const m = getModule(slug);
  if (!m) notFound();

  const minutes = m.lessons.reduce((s, l) => s + l.minutes, 0);

  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
      <Link
        href="/learn/"
        className="group inline-flex cursor-pointer items-center gap-2 text-sm text-ink-muted transition-colors duration-200 hover:text-sakura-700"
      >
        <span className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5">
          <ArrowLeft />
        </span>
        All lessons
      </Link>

      <header className="mt-8 flex items-start gap-5">
        <span
          lang="ja"
          className="mt-1 font-serif text-4xl leading-none text-plum-400"
          aria-hidden="true"
        >
          {m.marker}
        </span>
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-serif text-4xl font-semibold tracking-tight text-ink">
              {m.title}
            </h1>
            <span className="rounded-full border border-rule px-2 py-0.5 text-[0.6875rem] font-medium uppercase tracking-wider text-ink-faint">
              {m.level}
            </span>
          </div>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-soft">
            {m.summary}
          </p>
          <p className="mt-3 text-sm text-ink-faint">
            {m.lessons.length} {m.lessons.length === 1 ? 'lesson' : 'lessons'} · about{' '}
            {minutes} minutes
          </p>
        </div>
      </header>

      <div className="mt-12">
        <ModuleList modules={[m]} />
      </div>
    </div>
  );
}
