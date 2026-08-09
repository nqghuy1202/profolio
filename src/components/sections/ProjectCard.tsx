import type { Project } from "@/data/projects";
import type { Dictionary } from "@/i18n/dictionaries";
import { ChatArchitecture } from "./ChatArchitecture";
import { ArrowIcon, GitHubIcon, LockIcon } from "@/components/ui/icons";

type ProjectsCopy = Dictionary["projects"];
type ItemCopy = ProjectsCopy["items"][keyof ProjectsCopy["items"]];

export function ProjectCard({
  project,
  copy,
  projects,
}: {
  project: Project;
  copy: ItemCopy;
  projects: ProjectsCopy;
}) {
  const isOpenSource = project.kind === "openSource";

  // Lưu ý về `min-w-0` ở thẻ <article> bên dưới: grid item mặc định lấy
  // min-width: auto, nghĩa là nó không chịu co hẹp hơn nội dung rộng nhất bên
  // trong. Sơ đồ SVG có min-w-[560px], nên thiếu dòng đó thì cả thẻ phình lên
  // 643px trên màn hình 375px và kéo cả trang bị cuộn ngang.
  return (
    <article
      className={`flex min-w-0 flex-col rounded-lg border bg-surface p-6 sm:p-7 ${
        project.featured ? "border-line-strong lg:col-span-2" : "border-line"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] ${
            isOpenSource
              ? "bg-accent/15 text-accent"
              : "border border-line-strong text-ink-faint"
          }`}
        >
          {!isOpenSource ? <LockIcon /> : null}
          {projects.kinds[project.kind]}
        </span>

        {project.status ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-ink-muted">
            <span
              aria-hidden="true"
              className={`h-1.5 w-1.5 rounded-full ${
                project.status === "pilot" ? "bg-ink-faint" : "bg-accent"
              }`}
            />
            {projects.status[project.status]}
          </span>
        ) : null}
      </div>

      <h3 className="mt-4 text-xl font-semibold tracking-tight text-ink">
        {copy.title}
      </h3>
      <p className="mt-1.5 text-sm text-ink-faint">{copy.context}</p>

      <p className="mt-4 text-sm leading-relaxed text-ink-muted">
        {copy.description}
      </p>

      {project.diagram === "chat" ? (
        <ChatArchitecture diagram={projects.diagram} />
      ) : null}

      {/* Con số lên trước phần mô tả công việc: người tuyển dụng quét kết quả
          trước, đọc chi tiết sau. */}
      <div className="mt-6">
        <h4 className="font-mono text-xs uppercase tracking-wider text-ink-faint">
          {projects.labels.results}
        </h4>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {copy.metrics.map((metric) => (
            <li
              key={metric}
              className="flex gap-2.5 rounded-md border border-line bg-canvas-subtle px-3 py-2 text-sm text-ink"
            >
              <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              <span className="leading-relaxed">{metric}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* <details> gấp phần dài lại mà không cần một dòng JavaScript nào,
          và vẫn mở được bằng bàn phím. */}
      <details open={project.featured} className="group mt-6">
        <summary className="flex cursor-pointer list-none items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-faint transition-colors hover:text-ink [&::-webkit-details-marker]:hidden">
          <span className="transition-transform group-open:rotate-90">
            <ArrowIcon />
          </span>
          {projects.labels.responsibilities}
        </summary>
        <ul className="mt-3 space-y-2 border-l border-line pl-4">
          {copy.responsibilities.map((item) => (
            <li key={item} className="text-sm leading-relaxed text-ink-muted">
              {item}
            </li>
          ))}
        </ul>
      </details>

      <div className="mt-6">
        <h4 className="font-mono text-xs uppercase tracking-wider text-ink-faint">
          {projects.labels.stack}
        </h4>
        <dl className="mt-3 space-y-2">
          {project.tech.map((layer) => (
            <div key={layer.layer} className="sm:flex sm:gap-3">
              <dt className="w-40 shrink-0 py-1 font-mono text-[11px] uppercase tracking-wider text-accent">
                {projects.layers[layer.layer]}
              </dt>
              <dd className="flex flex-wrap gap-1.5">
                {layer.items.map((item) => (
                  <span
                    key={item}
                    className="rounded border border-line bg-surface-2 px-2 py-1 text-xs text-ink-muted"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Đẩy phần link xuống đáy thẻ để các thẻ cạnh nhau thẳng hàng. */}
      <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-line pt-5">
        {project.links?.repo ? (
          <a
            href={project.links.repo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-line-strong px-3 py-2 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
          >
            <GitHubIcon />
            {projects.labels.viewRepo}
          </a>
        ) : null}

        {project.links?.demo ? (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-line-strong px-3 py-2 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
          >
            {projects.labels.viewDemo}
            <ArrowIcon />
          </a>
        ) : null}

        {!project.links ? (
          <p className="inline-flex items-center gap-2 text-xs text-ink-faint">
            <LockIcon />
            {projects.labels.sourceNotPublic}
          </p>
        ) : null}
      </div>
    </article>
  );
}
