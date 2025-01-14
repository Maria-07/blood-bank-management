/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Proxy requests starting with /api
        destination: "http://mehrabmahi-001-site1.qtempurl.com/api/:path*", // Your backend URL
      },
    ];
  },
};

export default nextConfig;
