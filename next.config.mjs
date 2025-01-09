/** @type {import('next').NextConfig} */
import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  workboxOptions: {
    runtimeCaching: [
      {
        urlPattern:
          /^https:\/\/gymmi\.s3\.ap-northeast-2\.amazonaws\.com\/.*\.(png|jpg|jpeg|svg|gif|webp|avif)(\?.*)?$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'image-cache',
          expiration: {
            maxEntries: 50, // 최대 50개 이미지 캐시
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30일
          },
        },
      },
    ],
  },
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
