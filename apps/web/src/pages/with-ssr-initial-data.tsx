import type { GetServerSideProps } from "next";
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

/* Extract the request function to a referenceable variable */
const userRequest = request(getGraphqlUrl(), myUserQueryDocument);
/* Unwrap type from the variable Promise */
type UserRequest = Awaited<typeof userRequest>;

/* Return the user from the GraphQL request on getServerSideProps */
export const getServerSideProps: GetServerSideProps<{ user: UserRequest }> = async () => {
  const user = await userRequest;
  return { props: { user } };
};

const WithSsr = ({ user }: { user: UserRequest }) => {
  /* Feed the fetched data to the react-query `initialData` option */
  const { data, isLoading, isError } = useQuery({
    queryKey: ["myUser"],
    queryFn: async () => request(getGraphqlUrl(), myUserQueryDocument),
    initialData: user,
  });

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

export default WithSsr;
