import { notFound } from "next/navigation";

import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { features } from "@/data/features";

import { Hero } from "@/components/sections/Hero";
import { WorkIndex } from "@/components/sections/WorkIndex";
import { Skills } from "@/components/sections/Skills";
import { About } from "@/components/sections/About";
import { Certifications } from "@/components/sections/Certifications";
import { GitHubStats } from "@/components/sections/GitHubStats";
import { Contact } from "@/components/sections/Contact";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <>
      <Hero hero={dict.hero} locale={locale} />
      <WorkIndex work={dict.work} locale={locale} />
      <Skills skills={dict.skills} />
      <About about={dict.about} />
      {/* Dải không đánh số, để việc bật/tắt nó không làm lệch số thứ tự
          01–04 của các section chính. Xem src/data/features.ts */}
      <Certifications copy={dict.certifications} />
      {features.githubStats ? (
        <GitHubStats copy={dict.github} locale={locale} />
      ) : null}
      <Contact copy={dict.contact} />
    </>
  );
}
