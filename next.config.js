/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
          {
            source: '/',
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
