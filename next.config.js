/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
          {
            source: '/about',
            headers: [
              {
                key: 'Cache-Control',
                value: 'no-cache',
              },
            ],
          },
        ]
    },
}

module.exports = nextConfig
