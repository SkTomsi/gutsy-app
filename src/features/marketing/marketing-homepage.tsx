"use client";
import Link from "next/link";
import AccentButton from "@/components/custom/accent-button";
import { Card } from "@/components/ui/card";
import { FEATURE_CARDS } from "@/features/marketing/constants";
// import { signIn } from "@/lib/auth-client";

export default function MarketingHomepage() {
  return (
    <div className="flex flex-col max-w-2xl mx-auto min-h-dvh justify-end w-full gap-16 py-12 px-4">
      <div className="gap-4 items-center w-full flex flex-col ">
        <h1 className="text-4xl tracking-tight font-black text-center text-pretty">
          Welcome to <span className="text-primary">Gloop 👋🏻</span>
        </h1>
      </div>
      <div className="flex flex-col gap-2 w-full">
        {FEATURE_CARDS.map((f) => (
          <Card
            key={f.title}
            className="flex flex-row gap-5 p-3 items-center dark:ring-0 ring-0"
          >
            <div className="aspect-square shrink-0 h-full size-18 bg-foreground/5  rounded-lg flex items-center justify-center text-4xl">
              {f.emoji}
            </div>
            <div className="gap-1 items-start flex flex-col ">
              <h2 className="text-base font-extrabold">{f.title}</h2>
              <p className="text-sm font-medium opacity-40 text-pretty">
                {f.description}
              </p>
            </div>
          </Card>
        ))}

        <Link href={"/login"} className="mt-12">
          <AccentButton className="h-16 w-full">
            START YOU GUT HEALTH JOURNEY
          </AccentButton>
        </Link>
      </div>
    </div>
  );
}
