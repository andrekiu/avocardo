import { withIronSession } from "next-iron-session";

export function withAdminSession(handler) {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: "x-admin-session",
    cookieOptions: {
      secure: process.env.PROD,
    },
  });
}
