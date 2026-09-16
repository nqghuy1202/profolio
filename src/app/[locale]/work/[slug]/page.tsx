import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProjectBySlug, projects } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { ChatArchitecture } from "@/components/sections/ChatArchitecture";
import { AiAssistantArchitecture } from "@/components/sections/AiAssistantArchitecture";
import { FlowDiagram } from "@/components/sections/FlowDiagram";
import { toneAt } from "@/lib/palette";

type Params = { params: Promise<{ locale: string; slug: string }> };

// Danh sách dự án là cố định, nên slug lạ không có gì để dựng. Chặn ở đây thì
// Next trả 404 đã prerender sẵn thay vì render động — mà 404 render động thì
// shell SSR hỏng và trang lỗi về tay người xem ở dạng trắng trơn.
export const dynamicParams = false;

// 2 ngôn ngữ × 7 dự án = 14 trang tĩnh, sinh sẵn lúc build.
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
  const tone = toneAt(position);

  return (
    <article>
      <Container>
        <Link
          href={`/${locale}#work`}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-text-2 transition-colors hover:text-text"
        >
          <ArrowLeft size={16} />
          {work.labels.allWork}
        </Link>

        <header className="pt-8 pb-10 sm:pt-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tone.chip}`}>
              {work.kinds[project.kind]}
            </span>
            {project.status ? (
              <span className="rounded-full bg-surface-2 px-3 py-1 text-xs font-semibold text-text-2">
                {work.status[project.status]}
              </span>
            ) : null}
          </div>

          <h1 className="mt-5 max-w-4xl text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
            {copy.title}
          </h1>

          <p className="mt-4 text-sm text-text-3">{copy.context}</p>

          <p className="mt-8 text-lg leading-[1.7] text-text-2">
            {copy.description}
          </p>
        </header>

        {/* Ảnh/sơ đồ chính — thứ người đọc muốn thấy đầu tiên khi lướt vào
            một dự án. Dự án có ảnh chụp thật thì hiện ảnh; còn lại hiện sơ đồ
            kiến trúc tương ứng. */}
        {project.image ? (
          <div className="pb-14">
            <div className="overflow-hidden rounded-3xl border border-border bg-surface-2 shadow-sm">
              <Image
                src={project.image.src}
                alt={copy.title}
                width={project.image.width}
                height={project.image.height}
                sizes="(min-width: 1024px) 60rem, 100vw"
                className="h-auto w-full"
                priority
              />
            </div>

            {project.secondaryImage ? (
              <figure className="mt-8 max-w-md">
                <div className="overflow-hidden rounded-2xl border border-border bg-surface-2 shadow-sm">
                  <Image
                    src={project.secondaryImage.src}
                    alt={work.labels.confusionMatrix}
                    width={project.secondaryImage.width}
                    height={project.secondaryImage.height}
                    className="h-auto w-full"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-text-3">
                  {work.labels.confusionMatrix}
                </figcaption>
              </figure>
            ) : null}
          </div>
        ) : project.diagram === "chat" ? (
          <div className="pb-14">
            <h2 className="mb-4 text-sm font-semibold text-primary-deep">
              {work.diagrams.chat.title}
            </h2>
            <ChatArchitecture diagram={work.diagrams.chat} />
          </div>
        ) : project.diagram === "aiAssistant" ? (
          <div className="pb-14">
            <h2 className="mb-4 text-sm font-semibold text-primary-deep">
              {work.diagrams.aiAssistant.title}
            </h2>
            <AiAssistantArchitecture diagram={work.diagrams.aiAssistant} />
          </div>
        ) : project.diagram ? (
          <div className="pb-14">
            <h2 className="mb-4 text-sm font-semibold text-primary-deep">
              {work.diagrams[project.diagram].title}
            </h2>
            <FlowDiagram
              diagram={work.diagrams[project.diagram]}
              titleId={`${project.diagram}-arch`}
            />
          </div>
        ) : null}

        {/* Kết quả */}
        <section aria-label={work.labels.results} className="pb-14">
          <div className="rounded-3xl border border-border bg-gradient-to-br from-sky-50/60 via-surface to-emerald-50/60 p-8">
            <p className="text-sm font-semibold text-primary-deep">
              {work.labels.results}
            </p>
            <dl className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {copy.metrics.map((metric) => (
                <div key={metric.caption}>
                  <dt className="text-[clamp(1.75rem,4vw,2.5rem)] leading-none font-extrabold tracking-tight text-text">
                    {metric.value}
                  </dt>
                  <dd className="mt-3 max-w-[16rem] text-sm leading-relaxed text-text-2">
                    {metric.caption}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Việc đã làm + Công nghệ */}
        <section className="pb-14">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-10">
            <div className="rounded-3xl border border-border bg-surface p-8 shadow-sm">
              <h2 className="text-sm font-semibold text-primary-deep">
                {work.labels.responsibilities}
              </h2>
              <ul className="mt-5 space-y-4">
                {copy.responsibilities.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[0.9375rem] leading-[1.7] text-text-2"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-primary to-primary-2"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Bảng công nghệ dính theo khi cuộn trên màn hình rộng, để người
                đọc luôn thấy dự án chạy trên gì trong lúc đọc phần việc. */}
            <div className="h-fit rounded-3xl border border-border bg-surface p-8 shadow-sm lg:sticky lg:top-24">
              <h2 className="text-sm font-semibold text-primary-deep">
                {work.labels.stack}
              </h2>
              <dl className="mt-5 space-y-5">
                {project.tech.map((layer) => (
                  <div key={layer.layer}>
                    <dt className="font-mono text-[0.6875rem] font-semibold tracking-wide text-text-3 uppercase">
                      {work.layers[layer.layer]}
                    </dt>
                    <dd className="mt-2 flex flex-wrap gap-1.5">
                      {layer.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium text-text-2"
                        >
                          {item}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="pb-16">
          <div className="flex flex-wrap items-center gap-4">
            {project.links?.repo ? (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-2 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-primary/30 transition hover:shadow-md hover:shadow-primary/40"
              >
                {work.labels.viewRepo}
              </a>
            ) : null}

            {project.links?.demo ? (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-text transition hover:border-border-strong hover:bg-surface-2"
              >
                {work.labels.viewDemo}
              </a>
            ) : null}

            {!project.links ? (
              <p className="text-sm text-text-3">{work.labels.sourceNotPublic}</p>
            ) : null}
          </div>
        </section>
      </Container>

      <Link
        href={`/${locale}/work/${nextProject.slug}`}
        className="group block bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white"
      >
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-6 py-12">
            <div>
              <p className="text-xs font-semibold tracking-wide text-emerald-300 uppercase">
                {work.labels.nextProject}
              </p>
              <p className="mt-3 text-2xl font-bold tracking-tight">
                {nextCopy.title}
              </p>
            </div>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight size={18} />
            </span>
          </div>
        </Container>
      </Link>
    </article>
  );
}
