const nextConfig = {
  // output: "export",
  reactStrictMode: true,
  swcMinify: true,
  images: { unoptimized: true },
  transpilePackages: [
    "@ionic/react",
    "@ionic/core",
    "@stencil/core",
    "ionicons",
  ],
};

module.exports = nextConfig;
