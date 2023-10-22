/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
          {
            source: '/:path*{/}?',
            headers: [
              {
                key:'Cache-Control',
                value: 'max-age=1',
              },
              /**{
                key: 'CDN-Cache-Control',
                value: 'max-age=1',
              },**/
            ],
          },
        ]
    },
}

module.exports = nextConfig
