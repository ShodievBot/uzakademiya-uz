import path from 'node:path';
import {fileURLToPath} from 'node:url';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname
  },
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {protocol: 'https', hostname: '**'}
    ]
  },
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp|avif|ico|woff2)',
        headers: [
          {key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800'}
        ]
      }
    ];
  }
};

export default withNextIntl(nextConfig);
