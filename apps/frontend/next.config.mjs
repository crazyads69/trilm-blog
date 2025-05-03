/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node$/,
      use: "file-loader",
    });

    // Optimize images
    config.module.rules.push({
      test: /\.(gif|png|jpe?g|webp)$/i,
      use: [
        {
          loader: "image-webpack-loader",
          options: {
            mozjpeg: {
              progressive: true,
            },
            optipng: {
              enabled: false,
            },
            pngquant: {
              quality: [0.65, 0.9],
              speed: 4,
            },
            gifsicle: {
              interlaced: false,
            },
            webp: {
              quality: 75,
            },
          },
        },
      ],
    });

    return config;
  },

  // Enhanced image configuration with Strapi support
  images: {
    remotePatterns: [
      // Original patterns
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
      // Strapi development images
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "nextjs.org",
        pathname: "/**",
      },

      // For production Strapi (uncomment and adjust when deploying)
      // {
      //   protocol: "https",
      //   hostname: "your-strapi-domain.com",
      //   pathname: "/uploads/**",
      // }
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Build configuration
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  output: "standalone",

  // Fixed experimental features for Turbopack compatibility
  experimental: {
    turbo: {
      resolveExtensions: [
        ".mdx",
        ".tsx",
        ".ts",
        ".jsx",
        ".js",
        ".mjs",
        ".json",
      ],
    },
    optimizeCss: true,
    scrollRestoration: true,
  },

  // Enhanced security headers with Strapi allowances
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-XSS-Protection",
          value: "1; mode=block",
        },
        {
          key: "X-Frame-Options",
          value: "SAMEORIGIN",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()",
        },
        {
          key: "Content-Security-Policy",
          value:
            "default-src 'self'; connect-src 'self' http://localhost:1337 http://localhost:8000; img-src 'self' data: http://localhost:1337 https:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
        },
      ],
    },
  ],

  // Performance optimization
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
    styledComponents: true,
  },

  // Environment configuration for Strapi
  env: {
    NEXT_PUBLIC_STRAPI_API_TOKEN:
      process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || "",
    NEXT_PUBLIC_STRAPI_API_URL:
      process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337",
  },

  // // Add API routing to securely handle Strapi requests
  // rewrites: async () => {
  //   return [
  //     // Proxy Strapi API requests to hide token in frontend
  //     {
  //       source: "/api/strapi/:path*",
  //       destination: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/:path*`,
  //     },
  //   ];
  // },

  // Build optimization
  poweredByHeader: false,
  generateEtags: true,
  compress: true,
};

export default nextConfig;
