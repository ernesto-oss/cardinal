import { prisma } from "@acme/database";
import { builder } from "../builder";

const ArticleType = builder.prismaObject("Article", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    url: t.exposeString("url"),
  }),
});

builder.queryFields((t) => ({
  article: t.prismaField({
    type: ArticleType,
    args: {
      articleID: t.arg.string({ required: true }),
    },
    nullable: true,
    resolve: async (query, _root, args) => {
      const article = await prisma.article.findUnique({
        ...query,
        where: { id: args.articleID },
      });

      return article;
    },
  }),
  articles: t.prismaField({
    type: [ArticleType],
    resolve: async () => {
      const articles = await prisma.article.findMany();
      return articles;
    },
  }),
}));

builder.mutationFields((t) => ({
  createArticle: t.prismaField({
    type: ArticleType,
    args: {
      url: t.arg.string({ required: true }),
      title: t.arg.string({ required: true }),
    },
    resolve: async (_query, _root, args) => {
      const createdArticle = await prisma.article.create({
        data: {
          title: args.title,
          url: args.url,
        },
      });

      return createdArticle;
    },
  }),
}));
