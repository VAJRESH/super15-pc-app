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
  env: {
    RAZOR_PAY_KEY_ID: "rzp_test_8SCsJGRxwB9Dnp",
    RAZOR_PAY_SECRET_KEY: "CUozIQLhrGz8f7a7f2u6kF8q",
  },
};

module.exports = nextConfig;
