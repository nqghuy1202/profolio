import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { features } from "@/data/features";
import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

// Khối mở đầu: hai khối gradient mờ phía sau tạo chiều sâu (kiểu "aurora"
// quen thuộc của các trang SaaS), avatar viền gradient, và bốn thẻ số liệu
// nổi trên nền thay vì một hàng kẻ chỉ phẳng.
export function Hero({
  hero,
  locale,
}: {
  hero: Dictionary["hero"];
  locale: Locale;
}) {
  const name = locale === "vi" ? profile.fullNameVi : profile.fullName;

  return (
    <section className="relative overflow-hidden">
      {/* Khối gradient mờ trang trí — pointer-events-none để không cản click,
          aria-hidden vì thuần thẩm mỹ. Định vị tuyệt đối ra ngoài lề để không
          làm rộng thanh cuộn ngang. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-gradient-to-br from-sky-400 to-blue-400 opacity-30 blur-3xl" />
        <div className="absolute top-10 -right-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-emerald-300 to-teal-200 opacity-30 blur-3xl" />
      </div>

      <Container>
        <div className="pt-20 pb-16 sm:pt-28 sm:pb-20">
          <div className="flex items-center gap-6 sm:gap-8">
            {features.portrait ? (
              <div className="shrink-0 rounded-full bg-gradient-to-br from-primary to-primary-2 p-1 shadow-lg shadow-primary/30">
                <Image
                  src="/portrait.jpg"
                  alt={hero.portraitAlt}
                  width={576}
                  height={576}
                  sizes="(min-width: 640px) 12rem, 9rem"
                  priority
                  className="size-32 rounded-full border-4 border-surface object-cover sm:size-44"
                />
              </div>
            ) : null}

            <div className="min-w-0">
              <p className="inline-flex items-center rounded-full bg-surface-2 px-3.5 py-1.5 font-mono text-xs font-semibold tracking-wide text-primary-deep">
                {hero.role}
              </p>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-text sm:text-5xl">
                {name}
              </h1>
            </div>
          </div>

          <div className="mt-10">
            <p className="text-lg leading-[1.65] text-text-2">{hero.intro}</p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-2 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40"
              >
                {hero.ctaWork}
                <ArrowRight size={16} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-text transition hover:border-border-strong hover:bg-surface-2"
              >
                {hero.ctaContact}
              </a>
            </div>
          </div>
        </div>
      </Container>

      {/* Dải số liệu — bốn thẻ nổi trên canvas, mỗi thẻ một sắc thái nhẹ */}
      <Container>
        <div className="grid gap-4 pb-20 sm:grid-cols-2 sm:pb-24 lg:grid-cols-4">
          {hero.meta.map((item, index) => (
            <HeroStat key={item.label} label={item.label} value={item.value} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}

const STAT_TONES = [
  "border-sky-100 bg-sky-50/60",
  "border-emerald-100 bg-emerald-50/60",
  "border-teal-100 bg-teal-50/60",
  "border-blue-100 bg-blue-50/60",
];

function HeroStat({
  label,
  value,
  index,
}: {
  label: string;
  value: string;
  index: number;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 shadow-sm ${STAT_TONES[index % STAT_TONES.length]}`}
    >
      <dt className="font-mono text-[0.6875rem] font-semibold tracking-wide text-text-3 uppercase">
        {label}
      </dt>
      <dd className="mt-2 text-sm font-medium text-text">{value}</dd>
    </div>
  );
}
