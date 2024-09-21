/** @type {import('next').NextConfig} */
const nextConfig = {
  // Note: svg를 컴포넌트로 사용
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
