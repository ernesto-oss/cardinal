import { sidebar, type SidebarItem } from "@/utils/sidebar";

export function paginate(path: string) {
  const routes = Object.values(sidebar).flat() as SidebarItem[];
  const flattenedRoutes = [] as SidebarItem[];

  /** Flatten nested routes into a single array containing all the routes.
   * This is not very portable until we manage to limit the depth of childItems
   * in the `sidebar` variable
   */
  routes.forEach((headerItem) => {
    const childItems = headerItem.items;
    const childItemContainsLink = childItems?.filter((item) =>
      item.link.includes("docs"),
    );
    const childItemContainsItems = childItems?.filter((item) => item.items);

    if (childItemContainsLink) {
      childItemContainsLink.forEach((item) => {
        flattenedRoutes.push(item);
      });
    }

    if (childItemContainsItems) {
      childItemContainsItems.forEach((item) => {
        item.items?.forEach((item) => flattenedRoutes.push(item));
      });
    }
  });

  const index = flattenedRoutes.map((item) => item.link).indexOf(path);
  if (index === -1) return { prev: undefined, next: undefined };
  const prev = index > 0 ? flattenedRoutes[index - 1] : undefined;
  const next =
    index < flattenedRoutes.length - 1 ? flattenedRoutes[index + 1] : undefined;
  return { prev, next };
}
