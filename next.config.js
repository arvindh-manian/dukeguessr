/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
          {
            source: '/:path*{/}?',
            headers: [
              {
                key: 'Cache-Control',
                value: 'no-cache, no-store, must-revalidate',
              },
            ],
          },
        ]
    },
}

module.exports = nextConfig
