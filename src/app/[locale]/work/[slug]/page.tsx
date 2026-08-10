import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProjectBySlug, projects } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { ChatArchitecture } from "@/components/sections/ChatArchitecture";

type Params = { params: Promise<{ locale: string; slug: string }> };

// 2 ngôn ngữ × 6 dự án = 12 trang tĩnh, sinh sẵn lúc build.
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!isLocale(locale) || !project) return {};

  const copy = getDictionary(locale).work.items[
    project.id as keyof ReturnType<typeof getDictionary>["work"]["items"]
  ];

  return {
    title: copy.title,
    description: copy.tagline,
    alternates: {
      canonical: `/${locale}/work/${slug}`,
      languages: {
        en: `/en/work/${slug}`,
        "vi-VN": `/vi/work/${slug}`,
      },
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const dict = getDictionary(locale);
  const work = dict.work;
  const copy = work.items[project.id as keyof typeof work.items];

  // Dự án kế tiếp, quay vòng về đầu khi tới cuối danh sách — không bao giờ có
  // ngõ cụt ở cuối trang.
  const position = projects.findIndex((item) => item.id === project.id);
  const nextProject = projects[(position + 1) % projects.length];
  const nextCopy = work.items[nextProject.id as keyof typeof work.items];

  return (
    <article>
      <Container>
        <Link
          href={`/${locale}#work`}
          className="label underline-grow inline-block py-5 text-ink-2 hover:text-ink"
        >
          ← {work.labels.allWork}
        </Link>
      </Container>

      <header className="border-t border-rule-ink">
        <Container>
          <div className="py-12 sm:py-16">
            <div className="label flex flex-wrap items-center gap-x-3 gap-y-2 text-accent">
              <span>{work.kinds[project.kind]}</span>
              {project.status ? (
                <>
                  <span aria-hidden="true" className="text-ink-3">
                    /
                  </span>
                  <span className="text-ink-3">
                    {work.status[project.status]}
                  </span>
                </>
              ) : null}
            </div>

            <h1 className="display-sm mt-5 max-w-4xl text-ink">{copy.title}</h1>

            <p className="mt-5 text-sm text-ink-3">{copy.context}</p>

            <p className="mt-10 max-w-[42rem] text-lg leading-[1.7] text-ink-2">
              {copy.description}
            </p>
          </div>
        </Container>
      </header>

      <section
        aria-label={work.labels.results}
        className="border-t border-rule-ink bg-paper-tint"
      >
        <Container>
          <p className="label pt-6 text-ink-3">{work.labels.results}</p>
          <dl className="grid gap-px pb-10 sm:grid-cols-2 lg:grid-cols-4">
            {copy.metrics.map((metric) => (
              <div key={metric.caption} className="pt-8">
                <dt className="text-[clamp(1.75rem,4vw,2.5rem)] leading-none font-semibold tracking-[-0.02em] text-ink">
                  {metric.value}
                </dt>
                <dd className="mt-3 max-w-[16rem] pr-6 text-sm leading-relaxed text-ink-2">
                  {metric.caption}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="border-t border-rule-ink">
        <Container>
          <div className="grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-20">
            <div>
              <h2 className="label text-accent">
                {work.labels.responsibilities}
              </h2>
              <ul className="mt-6 border-t border-rule">
                {copy.responsibilities.map((item) => (
                  <li
                    key={item}
                    className="border-b border-rule py-5 text-[0.9375rem] leading-[1.75] text-ink-2"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Bảng công nghệ dính theo khi cuộn trên màn hình rộng, để người
                đọc luôn thấy dự án chạy trên gì trong lúc đọc phần việc. */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <h2 className="label text-accent">{work.labels.stack}</h2>
              <dl className="mt-6 border-t border-rule">
                {project.tech.map((layer) => (
                  <div key={layer.layer} className="border-b border-rule py-4">
                    <dt className="label text-ink-3">
                      {work.layers[layer.layer]}
                    </dt>
                    <dd className="mt-2 text-sm leading-[1.8] text-ink">
                      {layer.items.join(" · ")}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      {project.diagram === "chat" ? (
        <section className="border-t border-rule-ink">
          <Container>
            <div className="py-14">
              <h2 className="label text-accent">
                {work.diagram.chatTitle}
              </h2>
              <ChatArchitecture diagram={work.diagram} />
            </div>
          </Container>
        </section>
      ) : null}

      <section className="border-t border-rule-ink">
        <Container>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 py-8">
            {project.links?.repo ? (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noreferrer"
                className="label border border-ink px-6 py-4 text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
              >
                {work.labels.viewRepo} ↗
              </a>
            ) : null}

            {project.links?.demo ? (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                className="label underline-grow text-ink-2 hover:text-ink"
              >
                {work.labels.viewDemo} ↗
              </a>
            ) : null}

            {!project.links ? (
              <p className="label text-ink-3">
                {work.labels.sourceNotPublic}
              </p>
            ) : null}
          </div>
        </Container>
      </section>

      <Link
        href={`/${locale}/work/${nextProject.slug}`}
        className="row-invert block border-t border-rule-ink"
      >
        <Container>
          <div className="flex flex-wrap items-baseline justify-between gap-6 py-12">
            <div>
              <p className="row-mute label">{work.labels.nextProject}</p>
              <p className="display-sm mt-4">{nextCopy.title}</p>
            </div>
            <span aria-hidden="true" className="row-arrow text-2xl">
              →
            </span>
          </div>
        </Container>
      </Link>
    </article>
  );
}
