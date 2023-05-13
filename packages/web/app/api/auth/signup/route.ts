import { type NextRequest, NextResponse } from "next/server";
import { auth, signJwtToken, LuciaError } from "@acme/auth";
import { Prisma } from "@acme/database";
import { z } from "zod";

export const signupSchema = z.object({
  email: z.string(),
  password: z.string().min(8),
});

export async function POST(req: NextRequest) {
  const requestBody = await req.json();

  try {
    const creds = signupSchema.safeParse(requestBody);

    if (!creds.success) {
      return new Response(null, {
        status: 400,
        statusText: "Bad payload",
      });
    }

    if (creds.success) {
      const { email, password } = creds.data;

      const user = await auth.createUser({
        primaryKey: {
          providerId: "email",
          providerUserId: email,
          password: password,
        },
        attributes: {
          email,
        },
      });

      const session = await auth.createSession(user.userId);
      const sessionCookie = auth.createSessionCookie(session);
      const { expires } = sessionCookie.attributes;
      const signedToken = signJwtToken(session);

      return new Response(null, {
        status: 302,
        headers: {
          "Set-Cookie": `auth_session=${signedToken}; Expires=${expires?.toUTCString()}; Path=/`,
        },
      });
    }
  } catch (error) {
    if (error instanceof LuciaError || error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
