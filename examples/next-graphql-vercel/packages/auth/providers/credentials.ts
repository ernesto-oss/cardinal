import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { auth, LuciaError } from '../index';

type CredentialsOperations = ['login' | 'logout' | 'signup'];

export const credentialsAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

/**
 * This is the example of a general use email/password credentials
 * authentication handler for Next.js. You can extend it and modify it
 * as you see fit. Refer to Lucia documentation if needed:
 * @see https://lucia-auth.com/
 *
 * Remember, Lucia is not a plug-and-play library like Next-Auth, but it
 * provides you with the building tools to handle users and validate sessions.
 * While this handler was built to be compatible specifically with Next.js
 * on web environments (cookie based session handling), the primitives used
 * here can be used in any other server-side context where you need
 * authentication.
 */
export async function credentialsHandler(
  request: NextRequest,
  { params }: { params: { luciaAuth: CredentialsOperations } },
) {
  const operation = params.luciaAuth;

  /* Signup endpoint handler */
  if (operation.includes('signup'))
    try {
      const requestBody = await request.json();
      const creds = credentialsAuthSchema.safeParse(requestBody);

      if (!creds.success)
        return new Response(null, {
          status: 400,
          statusText: 'BAD_PAYLOAD',
        });

      if (creds.success) {
        const { email, password } = creds.data;

        /**
         * Attempt to create the new user with provided credentials
         * @see https://lucia-auth.com/basics/users#create-users
         */
        const user = await auth.createUser({
          primaryKey: {
            providerId: 'email',
            providerUserId: email,
            password: password,
          },
          attributes: {
            email,
          },
        });

        /**
         * Create the session on the database, and generate a new session that
         * will be stored on a client cookie
         * @see https://lucia-auth.com/basics/sessions#create-new-session
         */
        const session = await auth.createSession(user.userId);
        const authRequest = auth.handleRequest({ request, cookies });
        authRequest.setSession(session);

        return new Response(null, {
          status: 302,
        });
      }
    } catch (error) {
      if (error instanceof LuciaError)
        return NextResponse.json({ error: error.message }, { status: 403 });
      else {
        return NextResponse.json({ error: 'UNKNOWN_ERROR' }, { status: 500 });
      }
    }

  /* Login endpoint handler */
  if (operation.includes('login'))
    try {
      const requestBody = await request.json();
      const creds = credentialsAuthSchema.safeParse(requestBody);

      /** Validate the request payload */
      if (!creds.success)
        return new Response(null, {
          status: 400,
          statusText: 'BAD_PAYLOAD',
        });

      if (creds.success) {
        /**
         * Attempt to login the user with provided credentials
         * @see https://lucia-auth.com/basics/keys#use-keys
         */
        const { email, password } = creds.data;
        const key = await auth.useKey('email', email, password);
        const session = await auth.createSession(key.userId);
        const authRequest = auth.handleRequest({ request, cookies });
        authRequest.setSession(session);

        return new Response(null, {
          status: 302,
        });
      }
    } catch (error) {
      if (error instanceof LuciaError)
        return NextResponse.json({ error: error.message }, { status: 403 });
      else {
        return NextResponse.json({ error: 'UNKNOWN_ERROR' }, { status: 500 });
      }
    }

  /* Logout endpoint handler */
  if (operation.includes('logout'))
    try {
      const authRequest = auth.handleRequest({ request, cookies });
      const session = await authRequest.validate();

      if (!session) return new Response(null, { status: 401 });

      /**
       * If the session is valid, invalidate the session on the server and remove
       * the cookie from the client
       * @see https://lucia-auth.com/basics/sessions#invalidate-sessions
       */
      await auth.invalidateSession(session.sessionId);
      authRequest.setSession(null);
      return new Response(null, {
        status: 302,
        headers: {
          location: '/login',
        },
      });
    } catch (error) {
      if (error instanceof LuciaError)
        return NextResponse.json({ error: error.message }, { status: 403 });
      else
        return NextResponse.json({ error: 'UNKNOWN_ERROR' }, { status: 500 });
    }
}
