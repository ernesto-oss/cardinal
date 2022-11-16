import { extendType, objectType } from "nexus";

export const postType = objectType({
  name: "Post",
  definition(t) {
    t.id("id");
    t.string("title");
    t.string("content");
  },
});

export const postQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("posts", {
      type: postType,
      /* @ts-ignore */
      resolve: async (_source, _args, ctx) => {
        return [{ id: 1, title: "Something", content: "Something else" }];
      },
    });
  },
});
