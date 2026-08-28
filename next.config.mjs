/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export — deploys to Vercel, Netlify, GitHub Pages, or any static host.
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
