import Link from "next/link";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { ClerkLoading, ClerkLoaded, UserButton, SignedIn } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { SidebarItem } from "./sidebar-item";
import RepoStar from "./repo-star";

type Props = {
  className?: string;
};

export const Sidebar = async ({ className }: Props) => {
  const user = await currentUser();
  return (
    <div
      className={cn(
        "left-0 top-0 flex flex-col h-full border-r-2 px-4 md:fixed md:w-[225px] lg:w-[256px]",
        className
      )}
    >
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/mascot.svg" height={40} width={40} alt="Mascot" />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
            Lingo
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem label="Learn" href="/learn" iconSrc="/learn.svg" />
        <SidebarItem
          label="Leaderboard"
          href="/leaderboard"
          iconSrc="/leaderboard.svg"
        />
        <SidebarItem label="quests" href="/quests" iconSrc="/quests.svg" />
        <SidebarItem label="shop" href="/shop" iconSrc="/shop.svg" />
      </div>

      <Separator className="h-0.5" />

      <div className="flex flex-col gap-y-4 mt-4">
        <div className="flex items-center justify-center gap-x-2">
          <RepoStar />

          <span className="text-sm font-bold uppercase w-full p-2">
            Star on GitHub
          </span>
        </div>

        <div className="flex items-center justify-center gap-x-2 mb-4">
          <ClerkLoading>
            <SignedIn>
              <Button
                disabled
                size="rounded"
                className="h-[40px] w-[40px] animate-pulse bg-gray-200 ring ring-border"
              />

              <div className="flex flex-col h-[52px] w-[158px] gap-y-1 p-2">
                <div className="h-16 bg-gray-200 animate-pulse rounded-xl" />
                <div className="h-12 bg-gray-200 animate-pulse rounded-xl" />
              </div>
            </SignedIn>
          </ClerkLoading>

          <ClerkLoaded>
            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonPopoverCard: {
                      pointerEvents: "initial",
                      width: "300px",
                    },
                    userButtonAvatarBox: {
                      height: "40px",
                      width: "40px",
                    },
                  },
                }}
              />

              <div className="flex w-full">
                <span className="text-sm font-bold">
                  {user?.firstName || "Anon"}
                </span>
              </div>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
};
