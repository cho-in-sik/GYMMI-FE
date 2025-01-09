/** @type {import('next').NextConfig} */
import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
  workboxOptions: {},
  dest: 'public',
  disable: process.env.NEXT_PUBLIC_MODE === 'development',
});

const nextConfig = {
  // api: {
  //   bodyParser: false,
  // },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/home',
      },
    ];
  },
};

export default withPWA(nextConfig);
