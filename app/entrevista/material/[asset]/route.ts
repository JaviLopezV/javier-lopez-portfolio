import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { hasInterviewAccess } from "../../../interview-access";

const assets = {
  "javier-lopez-cv.pdf": "application/pdf",
  "javier-lopez-cv-en.pdf": "application/pdf",
  "javier-lopez-cv-preview.png": "image/png",
  "javier-lopez-cv-en-preview.png": "image/png",
};

const headers = {
  "Cache-Control": "private, no-store",
  "X-Robots-Tag": "noindex",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ asset: string }> },
) {
  if (!(await hasInterviewAccess()))
    return new Response(null, { status: 404, headers });

  const { asset } = await params;
  if (!Object.hasOwn(assets, asset))
    return new Response(null, { status: 404, headers });

  const file = await readFile(
    join(process.cwd(), "private", "interview", asset),
  );
  return new Response(new Uint8Array(file), {
    headers: {
      ...headers,
      "Content-Type": assets[asset as keyof typeof assets],
    },
  });
}
