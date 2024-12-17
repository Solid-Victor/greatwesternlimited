import { withSentryConfig } from "@sentry/nextjs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sentryEnabled = process.env.ENABLE_SENTRY === "true";

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname);
    return config;
  },
};

const sentryOptions = {
  silent: true,
  org: "victorsolid-ltd",
  project: "construction-company",
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
};

export default sentryEnabled
  ? withSentryConfig(nextConfig, sentryOptions)
  : nextConfig;
