
import {
  ArrowRight,
  Bot,
  Compass,
  LineChart,
  Sparkles,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { DottedPattern } from "@/components/ui/dotted-pattern";
import { FadeIn } from "@/components/ui/motion-primitives";

type Project = {
  id: string;
  icon: ComponentType<{ className?: string }>;
  iconLabel: string;
  title: string;
  description: string;
  meta: string;
  imageRatio: number;
  image?: string;
  imageAlt?: string;
};

const PROJECTS: Project[] = [
  {
    id: "ar-nutrition-analyzer",
    icon: Sparkles,
    iconLabel: "Project 01",
    title: "AR Nutrition Analyzer",
    description:
      "An augmented-reality nutrition analyzer concept focused on food information and nutrition analysis.",
    meta: "Project 01",
    imageRatio: 16 / 10,
    image: "/picture/ar.jpg",
    imageAlt: "AR Nutrition Analyzer project preview",
  },
  {
    id: "krishidhan",
    icon: Compass,
    iconLabel: "Project 02",
    title: "KrishiDhan",
    description:
      "An agriculture-focused platform combining crop recommendations, soil sensing, and data-driven agricultural decision support.",
    meta: "Project 02",
    imageRatio: 16 / 10,
    image: "/picture/krishidhan.jpg",
    imageAlt: "KrishiDhan agricultural technology platform",
  },
  {
    id: "screensense",
    icon: LineChart,
    iconLabel: "Project 03",
    title: "ScreenSense",
    description:
      "A desktop-oriented project exploring AI-assisted screen context and contextual workflows.",
    meta: "Project 03",
    imageRatio: 16 / 10,
    image: "/picture/screen.jpg",
    imageAlt: "ScreenSense project preview",
  },
  {
    id: "remoteok-self-healing-scraper",
    icon: Bot,
    iconLabel: "Project 04",
    title: "RemoteOK Self-Healing Scraper",
    description:
      "A job-listing scraper designed to automate data collection and handle scraping failures through recovery mechanisms.",
    meta: "Project 04",
    imageRatio: 16 / 10,
    image: "/picture/self%20heal.jpg",
    imageAlt: "RemoteOK Self-Healing Scraper project preview",
  },
];

export type ProjectsProps = {
  withHeadline?: boolean;
  viewMoreVisible?: boolean;
};

export function Projects({
  withHeadline = false,
  viewMoreVisible = false,
}: ProjectsProps): ReactNode {
  const items = viewMoreVisible ? PROJECTS.slice(0, 4) : PROJECTS;

  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        {withHeadline ? (
          <FadeIn className="flex flex-col items-center gap-5 pt-12 pb-10 text-center sm:pt-20 sm:pb-14">
            <h2 className="font-serif text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[3rem] lg:text-[3.5rem]">
              My projects
            </h2>
            <p className="max-w-[33ch] text-[18px] leading-[1.45] tracking-tight text-foreground/65 sm:text-[20px]">
              Selected works, open-source projects, and digital experiments.
            </p>
          </FadeIn>
        ) : null}

        <div className="columns-1 gap-6 md:columns-2 md:gap-7">
          {items.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {viewMoreVisible ? (
          <div className="mt-12 flex justify-center sm:mt-16">
            <Link
              href="/projects"
              className="border border-foreground/8 focus-ring group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
            >
              View all projects
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}): ReactNode {
  const Icon = project.icon;

  return (
    <FadeIn
      delay={Math.min(index * 0.06, 0.3)}
      className="mb-6 break-inside-avoid md:mb-7"
    >
      <article className="project-card flex cursor-pointer flex-col gap-4 rounded-3xl border border-foreground/8 bg-background p-3 sm:p-3.5">
        <header className="flex items-center gap-2.5 px-1 pt-2">
          <span className="border-foreground/10 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-background">
            <Icon className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
          </span>
          <span className="text-sm font-medium tracking-tight text-foreground">
            {project.iconLabel}
          </span>
        </header>

        <div
          className="project-card__image ring-foreground/5 relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-foreground/2 ring-1 dark:bg-foreground/4"
          style={{ aspectRatio: project.imageRatio }}
        >
          {project.image ? (
            <div className="project-card__image-inner absolute inset-0">
              <Image
                src={project.image}
                alt={project.imageAlt ?? project.title}
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ) : (
            <div className="relative flex h-full w-full flex-col items-center justify-center gap-2.5 p-6 text-center">
              <DottedPattern className="absolute inset-0 opacity-30" />
              <div className="border-foreground/10 relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl border bg-background shadow-sm">
                <Icon
                  className="h-5 w-5 text-foreground/50"
                  aria-hidden="true"
                />
              </div>
              <span className="relative z-10 text-[13px] font-medium tracking-tight text-foreground/40">
                Visual preview placeholder
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2.5 px-1 pb-1">
          <h3 className="text-[20px] font-medium leading-[1.2] tracking-tight text-foreground sm:text-[22px]">
            {project.title}
          </h3>
          <p className="text-[14px] leading-normal tracking-tight text-foreground/65 sm:text-[15px]">
            {project.description}
          </p>
        </div>

        <p className="px-1 pb-2 text-[12px] tracking-tight text-foreground/50">
          {project.meta}
        </p>
      </article>
    </FadeIn>
  );
}
