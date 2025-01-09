/** @type {import('next').NextConfig} */
import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  skipWaiting: true,
  workboxOptions: {
    runtimeCaching: [
      {
        urlPattern:
          /^https:\/\/gymmi\.s3\.ap-northeast-2\.amazonaws\.com\/.*\.(png|jpg|jpeg|svg|gif|webp|avif)(\?.*)?$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'image-cache',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30일
          },
          cacheableResponse: {
            statuses: [0, 200], // 성공적인 응답만 캐시
          },
          matchOptions: {
            ignoreSearch: true, // URL 파라미터 무시
          },
        },
      },
    ],
    cleanupOutdatedCaches: true, // 오래된 캐시 자동 정리
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
