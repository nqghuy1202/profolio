import Image from "next/image";
import type { Project } from "@/data/projects";
import { toneAt } from "@/lib/palette";

// Ảnh bìa cho mỗi thẻ trong lưới dự án ở trang chủ. Dự án có ảnh chụp thật
// thì dùng ảnh đó; còn lại dùng một khối gradient theo bảng màu xoay vòng,
// đánh số lớn màu trắng — thay cho ô đánh số kẻ chỉ kiểu cũ.
// alt để rỗng vì tiêu đề/tagline hiển thị ngay cạnh trong cùng một Link.
export function ProjectCover({
  project,
  index,
  kindLabel,
}: {
  project: Project;
  index: number;
  kindLabel: string;
}) {
  if (project.image) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl bg-surface-2">
        <Image
          src={project.image.src}
          alt=""
          width={project.image.width}
          height={project.image.height}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  const tone = toneAt(index - 1);

  return (
    <div
      className={`relative flex aspect-[16/10] w-full flex-col justify-between overflow-hidden rounded-t-2xl bg-gradient-to-br p-5 ${tone.gradientFrom} ${tone.gradientTo}`}
    >
      <span aria-hidden="true" className="text-5xl leading-none font-extrabold text-white/90">
        {String(index).padStart(2, "0")}
      </span>
      <span className="inline-flex w-fit items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
        {kindLabel}
      </span>
    </div>
  );
}
