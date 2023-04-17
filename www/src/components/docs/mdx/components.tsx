import { LinkHeading } from "@/components/docs/mdx/link-heading";
import "@/components/docs/mdx/mdx.css";

/**
 * Overrides for the HTML elements on Markdown pages
 * See: https://docs.astro.build/en/guides/markdown-content/#assigning-custom-components-to-html-elements
 */
const components = {
  a: (props: any) => (
    <a
      {...props}
      className="underline decoration-pink-600 decoration-2 hover:decoration-4 dark:decoration-pink-500"
    ></a>
  ),
  h2: ({ children, id, ...props }: { children: any; id: string }) => (
    <LinkHeading id={id} className="link-heading border-t mt-7 mb-2 border-slate-200 pt-4 dark:border-slate-50/10">
      <h2 {...props} className="text-2xl font-bold" id={id} data-heading>
        {children}
      </h2>
    </LinkHeading>
  ),
  h3: ({ children, id, ...props }: { children: any; id: string }) => (
    <LinkHeading id={id} className="link-heading mt-7 mb-2">
      <h3 {...props} className="text-xl font-bold" id={id} data-heading>
        {children}
      </h3>
    </LinkHeading>
  ),
};

export default components;
