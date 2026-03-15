"use client";
import Link from "next/link";
import { sileo } from "sileo";
import AccentButton from "@/components/custom/accent-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FEATURE_CARDS } from "@/features/marketing/constants";
// import { signIn } from "@/lib/auth-client";

export default function MarketingHomepage() {
  return (
    <div className="flex flex-col max-w-2xl mx-auto min-h-dvh justify-start w-full gap-16 py-12 px-4">
      <div className="gap-4 items-center w-full flex flex-col ">
        <h1 className="text-4xl tracking-tight font-black text-primary text-center text-pretty">
          Your gut is trying to tell you something. 🦠
        </h1>
        <p className="text-base text-center opacity-70 text-primary max-w-sm">
          Log your meals. Track your symptoms. Let AI find the patterns your
          doctor never had time to look for.
        </p>
      </div>
      <div className="flex flex-col gap-2 w-full">
        {FEATURE_CARDS.map((f) => (
          <Card
            key={f.title}
            className="flex flex-row gap-5 h-fit p-3 items-center bg-card  border-px"
          >
            <div className="aspect-square size-18 bg-primary/5 border-px  rounded-lg flex flex-col items-center justify-center text-4xl">
              {f.emoji}
            </div>
            <div className="gap-1 items-start flex flex-col">
              <h2 className="text-base font-extrabold text-primary">
                {f.title}
              </h2>
              <p className="text-sm font-medium text-primary opacity-40 text-pretty">
                {f.description}
              </p>
            </div>
          </Card>
        ))}

        <Link href={"/login"}>
          <AccentButton className="h-16 w-full mt-12">
            START YOU GUT HEALTH JOURNEY
          </AccentButton>
        </Link>
      </div>
    </div>
  );
}
