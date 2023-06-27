import { LinkHeading } from "@/components/docs/mdx/link-heading";

import "@/components/docs/mdx/mdx.css";

/**
 * Overrides for the HTML elements on Markdown pages. Should be imported in every docs MDX page.
 * See: https://docs.astro.build/en/guides/markdown-content/#assigning-custom-components-to-html-elements
 */
const components = {
  a: ({ children, ...props }: { children: any }) => (
    <a
      {...props}
      className="text-pink-600 underline decoration-pink-600 decoration-2 hover:decoration-4 dark:text-pink-500 dark:decoration-pink-500"
    >
      {children}
    </a>
  ),
  li: ({ children, ...props }: { children: any }) => (
    <li
      className="ml-4 list-outside list-disc pb-4 text-base leading-relaxed text-slate-900 dark:text-slate-100 "
      {...props}
    >
      {children}
    </li>
  ),
  h2: ({ children, id, ...props }: { children: any; id: string }) => (
    <LinkHeading
      id={id}
      className="link-heading mb-2 mt-7 border-t border-slate-200 pt-4 dark:border-slate-50/10"
    >
      <h2 {...props} className="text-2xl font-bold" id={id} data-heading>
        {children}
      </h2>
    </LinkHeading>
  ),
  h3: ({ children, id, ...props }: { children: any; id: string }) => (
    <LinkHeading id={id} className="link-heading mb-2 mt-7">
      <h3 {...props} className="text-xl font-bold" id={id} data-heading>
        {children}
      </h3>
    </LinkHeading>
  ),
};

export default components;
