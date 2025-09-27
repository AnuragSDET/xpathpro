/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'via.placeholder.com',
      'cdn.sanity.io',
      process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('https://', '').replace('/rest/v1', '') + '.supabase.co'
    ].filter(Boolean),
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

module.exports = nextConfig