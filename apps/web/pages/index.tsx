import request from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import { graphql } from "@/utils/gql";
import { getBaseUrl } from "@/utils/getBaseUrl";

const allPostsQueryDocument = graphql(`
  query allPosts {
    posts {
      id
      title
      content
    }
  }
`);

export default function Web() {
  const { data } = useQuery(["posts"], async () =>
    request(`${getBaseUrl()}/api/graphql`, allPostsQueryDocument)
  );

  console.log(data);

  return <div>Something</div>;
}
