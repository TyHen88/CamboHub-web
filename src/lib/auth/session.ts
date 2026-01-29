import { NextResponse } from "next/server";

const maxAgeSeconds = 60 * 60 * 4;

const baseOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

export function setSessionCookies(
  response: NextResponse,
  payload: { uid: string; role: string },
) {
  response.cookies.set("cnx_uid", payload.uid, {
    ...baseOptions,
    maxAge: maxAgeSeconds,
  });
  response.cookies.set("cnx_role", payload.role, {
    ...baseOptions,
    maxAge: maxAgeSeconds,
  });
}

export function clearSessionCookies(response: NextResponse) {
  response.cookies.set("cnx_uid", "", {
    ...baseOptions,
    maxAge: 0,
  });
  response.cookies.set("cnx_role", "", {
    ...baseOptions,
    maxAge: 0,
  });
}
