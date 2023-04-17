import type { MarkdownHeading } from "astro";
import { useState, useEffect } from "react";
import { ChevronsUpDown } from "lucide-react";

import TableOfContents from "@/components/docs/tableOfContents";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/docs/collapsible";

export const OnThisPage: React.FC<{ headings: MarkdownHeading[] }> = ({ headings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  if (!mounted)
    return (
      <button className="flex items-center gap-2 xl:hidden">
        <span className="text-default font-semibold text-pink-600 dark:text-pink-500">On this page</span>
        <ChevronsUpDown className="h-5 w-5 text-pink-600 dark:text-pink-500" />
      </button>
    );

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full pb-8 xl:hidden">
      <CollapsibleTrigger asChild>
        <button className="flex items-center gap-2">
          <span className="text-default font-semibold text-pink-600 dark:text-pink-500">On this page</span>
          <ChevronsUpDown className="h-5 w-5 text-pink-600 dark:text-pink-500" />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="pt-8">
          <TableOfContents headings={headings} />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default OnThisPage;
