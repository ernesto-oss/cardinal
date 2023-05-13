import { NextRequest } from "next/server";
import { createYoga } from "graphql-yoga";
import { decodeJwtToken, type JwtPayload } from "@acme/auth";
import { schema } from "./schema";

export async function graphqlHandler(req: NextRequest) {
  const yoga = createYoga({
    schema: schema,
    graphqlEndpoint: "/api/graphql",
    context: async () => {
      const signedToken = req.cookies.get("auth_session")?.value;
      if (signedToken) {
        const session = decodeJwtToken(signedToken) as JwtPayload;
        return { session };
      }
    },
  });

  const response = await yoga.handleRequest(req, {});
  const responseHeaders = Object.fromEntries(response.headers.entries());

  const handlerResponse = new Response(await response.text(), {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });

  return handlerResponse;
}
