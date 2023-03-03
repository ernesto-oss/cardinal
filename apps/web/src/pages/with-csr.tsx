import { NextPage } from "next";
import { request } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import { graphql } from "@/generated/graphql";
import { getGraphqlUrl } from "@/utils/getBaseUrl";

const myUserQueryDocument = graphql(`
  query GetMyUser {
    myUser {
      __typename
      id
      name
      email
    }
  }
`);

const WithCsr: NextPage = () => {
  const { data, isLoading, isError } = useQuery(
    ["myUser"],
    async () => request(getGraphqlUrl(), myUserQueryDocument),
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
      <p>{data.myUser?.__typename}</p>
      <p>{data.myUser?.id}</p>
      <p>{data.myUser?.email}</p>
      <p>{data.myUser?.name}</p>
    </>
  );
};

export default WithCsr;
