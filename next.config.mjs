/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
  // Compress responses is for server, but doesn't hurt here
  compress: true,
};

export default nextConfig;
