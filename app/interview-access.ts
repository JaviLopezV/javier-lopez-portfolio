import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const cookieName = "portfolio_interview";
const duration = 60 * 60 * 24;

function accessCode() {
  const code = process.env.INTERVIEW_ACCESS_CODE;
  return code && /^[0-9]{10,32}$/.test(code) ? code : undefined;
}

function matches(left: string, right: string) {
  const leftBytes = Buffer.from(left);
  const rightBytes = Buffer.from(right);
  return (
    leftBytes.length === rightBytes.length &&
    timingSafeEqual(leftBytes, rightBytes)
  );
}

function sign(code: string, expires: string) {
  return createHmac("sha256", code)
    .update(`portfolio-interview-v1:${expires}`)
    .digest("base64url");
}

export async function hasInterviewAccess() {
  const code = accessCode();
  const token = (await cookies()).get(cookieName)?.value;
  if (!code || !token) return false;

  const [expires, signature, extra] = token.split(".");
  if (!expires || !signature || extra !== undefined || !/^\d+$/.test(expires))
    return false;

  const now = Math.floor(Date.now() / 1000);
  const expiry = Number(expires);
  return (
    expiry > now &&
    expiry <= now + duration &&
    matches(signature, sign(code, expires))
  );
}

export async function grantInterviewAccess(code: FormDataEntryValue | null) {
  const expected = accessCode();
  if (!expected) return "unavailable";
  if (typeof code !== "string" || !matches(code, expected)) return "invalid";

  const expires = String(Math.floor(Date.now() / 1000) + duration);
  (await cookies()).set(cookieName, `${expires}.${sign(expected, expires)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: duration,
  });

  return "granted";
}
