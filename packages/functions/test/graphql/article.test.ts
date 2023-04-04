import { Api } from "sst/constructs";
import { expect, it } from "vitest";
import { createClient } from "@cardinal-react-sst-trpc/graphql/genql";
import { Article } from "@cardinal-react-sst-trpc/core/article";

it("create an article", async () => {
  const client = createClient({
    url: Api.api.url + "/graphql",
  });

  const article = await client.mutation({
    createArticle: [
      { title: "Hello world", url: "https://example.com" },
      {
        id: true,
      },
    ],
  });
  const list = await Article.list();
  expect(
    list.find((a) => a.articleID === article.createArticle.id)
  ).not.toBeNull();
});
