import { NextPage } from "next";
import { request } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import { graphql } from "@/utils/gql";
import { getGraphqlUrl } from "@/utils/getBaseUrl";

const allPostsQueryDocument = graphql(`
  query allPosts {
    posts {
      id
      title
      content
    }
  }
`);

const ApiTest: NextPage = () => {
  const {
    data: postsQuery,
    isLoading,
    isError,
  } = useQuery(
    ["posts"],
    async () => request(getGraphqlUrl(), allPostsQueryDocument),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error!</span>;
  }

  return (
    <>
      {postsQuery?.posts && (
        <>
          {postsQuery.posts.map((postItem) => (
            <div key={postItem?.id}>
              <p className="text-base text-slate-400">{postItem?.title}</p>
              <p className="text-base text-slate-900">{postItem?.content}</p>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default ApiTest;
