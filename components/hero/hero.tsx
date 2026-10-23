import { User } from "lucide-react";
import type { ReactNode } from "react";

import { HeroCtas } from "./hero-ctas";
import { DottedPattern } from "@/components/ui/dotted-pattern";
import { FadeIn, ScaleUnblur } from "@/components/ui/motion-primitives";
import { PortraitMorph } from "./portrait-morph";

const PORTRAIT_SRC: string | null = null;
const PORTRAIT_HOVER_SRC: string | null = null;

export function Hero(): ReactNode {
  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 pt-44 pb-24 sm:px-10 sm:pt-56 sm:pb-32">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-8">
          <FadeIn className="flex flex-col gap-4">
            <p className="text-[20px] leading-tight tracking-tight font-medium text-foreground">
              Hey
              <span aria-hidden="true" className="mx-0.5">
                👋
              </span>
              , I&rsquo;m Shwet
            </p>

            <h1 className="text-[2.75rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[2.5rem] lg:text-[3.65rem]">
              <span className="block whitespace-nowrap">
                Computer Science Student &
              </span>
              <span className="block whitespace-nowrap">Software Developer</span>
            </h1>

            <p className="max-w-[34ch] text-[22px] leading-[1.4] tracking-tight text-foreground/65">
              Passionate about technology, software development, and building useful digital experiences.
            </p>

            <HeroCtas />
          </FadeIn>

          <ScaleUnblur className="flex justify-stretch md:justify-end">
            <div className="relative aspect-square w-full md:max-w-105 overflow-hidden rounded-4xl border border-foreground/8 bg-background p-1.5 shadow-sm">
              <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[1.6rem] bg-foreground/2 dark:bg-foreground/5">
                {PORTRAIT_SRC ? (
                  <PortraitMorph
                    srcA={PORTRAIT_SRC}
                    srcB={PORTRAIT_HOVER_SRC ?? PORTRAIT_SRC}
                    alt="Shwet Kshirsagar portrait"
                  />
                ) : (
                  <div className="relative flex h-full w-full flex-col items-center justify-center p-8 text-center">
                    <DottedPattern className="absolute inset-0 opacity-40" />
                    <div className="relative z-10 flex flex-col items-center gap-4">
                      <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-foreground/10 bg-background shadow-lg transition-transform hover:scale-105">
                        <User className="h-12 w-12 text-foreground/45" strokeWidth={1.5} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[15px] font-medium tracking-tight text-foreground/80">
                          Photo Placeholder
                        </span>
                        <span className="text-[13px] tracking-tight text-foreground/45">
                          Drop your portrait here
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ScaleUnblur>
        </div>
      </div>
    </section>
  );
}
