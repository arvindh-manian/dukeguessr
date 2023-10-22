/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
          {
            source: '/:path*{/}?',
            headers: [
              {
                'Cache-Control': 'max-age=1',
                'CDN-Cache-Control': 'max-age=1'
              },
            ],
          },
        ]
    },
}

module.exports = nextConfig
