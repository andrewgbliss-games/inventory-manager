"use client";

import { ArrowUpIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed right-6 bottom-6 z-50">
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="outline"
              size="icon-lg"
              aria-label="Back to top"
              className="shadow-lg"
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
            />
          }
        >
          <ArrowUpIcon />
        </TooltipTrigger>
        <TooltipContent>Back to top</TooltipContent>
      </Tooltip>
    </div>
  );
}
