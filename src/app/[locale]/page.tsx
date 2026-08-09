import { notFound } from "next/navigation";

import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { features } from "@/data/features";

import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
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
      <Hero hero={dict.hero} contact={dict.contact} locale={locale} />
      <Skills skills={dict.skills} />
      <Projects copy={dict.projects} />
      <About about={dict.about} />
      {/* Tắt cho tới khi dọn xong các repo cũ — xem src/data/features.ts */}
      {features.githubStats ? (
        <GitHubStats copy={dict.github} locale={locale} />
      ) : null}
      <Contact copy={dict.contact} />
    </>
  );
}
