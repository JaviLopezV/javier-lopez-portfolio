import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  experimental: {
    rootParams: true,
  },
};
const withNextIntl = createNextIntlPlugin();

export default (phase: string) =>
  withNextIntl({
    ...nextConfig,
    // Keep production builds from overwriting a running dev server's chunks.
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
  });
