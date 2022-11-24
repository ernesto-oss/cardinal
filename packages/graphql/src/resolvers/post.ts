import { extendType, objectType } from "nexus";

export const postType = objectType({
  name: "Post",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("title");
    t.nonNull.string("content");
  },
});

export const postQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("posts", {
      type: postType,
      resolve: async (_source, _args, ctx) => {
        const posts = await ctx.prisma.post.findMany();
        return posts;
      },
    });
  },
});
