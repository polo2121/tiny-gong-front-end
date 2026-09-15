"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import errorIllustration from "@/public/route-level-error-boundary-illustration.webp";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl bg-card-surface">
      <div className="flex flex-col items-center justify-center gap-4 bg-white p-6 rounded-md ">
        <Image
          width={100}
          src={errorIllustration}
          alt="error-icon"
          className="h-auto"
        />
        <div className="flex flex-col items-center gap-1 text-center">
          <h2 className="text-3xl font-margarine">Oops!</h2>
          <p className="text-lg font-semibold">Something Went Wrong.</p>
          <p className="text-base font-medium">
            We couldn&apos;t load the new purchase. <br />
            Please try again or contact support if problem persists.
          </p>
        </div>

        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  );
}
