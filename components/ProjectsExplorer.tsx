"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import type { Project, Locale } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { cn } from "@/lib/utils";

/** Bölgeye göre filtrelenebilir proje listesi. */
export function ProjectsExplorer({
  projects,
  locale,
}: {
  projects: Project[];
  locale: Locale;
}) {
  const t = useTranslations("projectsPage");
  const regions = useMemo(
    () => Array.from(new Set(projects.map((p) => p.region))),
    [projects],
  );
  const [region, setRegion] = useState<string>("all");

  const filtered =
    region === "all" ? projects : projects.filter((p) => p.region === region);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <FilterChip active={region === "all"} onClick={() => setRegion("all")}>
          {t("all")}
        </FilterChip>
        {regions.map((r) => (
          <FilterChip key={r} active={region === r} onClick={() => setRegion(r)}>
            {r}
          </FilterChip>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-ink-soft">{t("empty")}</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProjectCard key={p.slug} project={p} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-forest-800 text-cream"
          : "bg-cream text-forest-800 ring-1 ring-forest-900/15 hover:ring-forest-800",
      )}
    >
      {children}
    </button>
  );
}
