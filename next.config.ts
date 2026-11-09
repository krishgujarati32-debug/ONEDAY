import type { NextConfig } from "next";
import migration from "./src/data/v5-migration-map.json";

const config: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return Object.entries(migration.redirects).map(([source, destination]) => ({
      source,
      destination,
      permanent: false,
    }));
  },
};
export default config;
