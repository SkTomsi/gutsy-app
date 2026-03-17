"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AccentButton from "@/components/custom/accent-button";
import { HeadlineM, TitleL } from "@/components/typography/font";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
} from "@/components/ui/drawer";
import { useSession } from "@/lib/auth-client";

export function OnboardingPrompt() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isPending } = useSession();

  useEffect(() => {
    if (isPending) return;

    if (!data?.user.isOnboarded) {
      setIsOpen(true);
    }
  }, [data?.user.isOnboarded, isPending]);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="max-w-md mx-auto">
        <div className="p-6 flex flex-col items-center justify-center space-y-3">
          <TitleL className="text-2xl">Gloop doesn't know you yet.</TitleL>
          <HeadlineM className="text-center px-6">
            You skipped the setup — no hard feelings. But without it, Gloop
            can't personalise anything for you. It takes 2 minutes.
          </HeadlineM>

          <div>{JSON.stringify(data)}</div>
        </div>
        <DrawerFooter>
          <DrawerClose className="p-2" asChild>
            <Link href={"/u/onboarding"}>
              <AccentButton className="w-full">
                Take me to onboarding
              </AccentButton>
            </Link>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
