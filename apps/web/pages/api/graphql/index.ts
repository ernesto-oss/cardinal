import { NextApiResponse, NextApiRequest, PageConfig } from "next";
import cors, { CorsOptions, CorsOptionsDelegate } from "cors";
import { apolloServer } from '@acme/graphql';

/* Helper method to wait for a middleware to execute before continuing
and to throw an error when an error happens in a middleware */
function initMiddleware(middleware: typeof cors) {
  return (
    req: NextApiRequest,
    res: NextApiResponse,
    options?: CorsOptions | CorsOptionsDelegate
  ) =>
    new Promise((resolve, reject) => {
      middleware(options)(req, res, (result: Error | unknown) => {
        if (result instanceof Error) {
          return reject(result);
        }

        return resolve(result);
      });
    });
}

const corsMiddleware = initMiddleware(cors);

const startServer = apolloServer.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await corsMiddleware(req, res, {
    origin: "*",
  });

  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;

  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};
