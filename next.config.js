const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  runtimeCaching,
  buildExcludes: [/middleware-manifest\.json$/],
  scope: '/',
  sw: 'service-worker.js',
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});
module.exports = {};

module.exports = withPWA({
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },

  images: {
    domains: [
      'images.unsplash.com',
      'img.icons8.com',
      'i.ibb.co',
      'i.postimg.cc',
      'fakestoreapi.com',
      'res.cloudinary.com',
      'lh3.googleusercontent.com',
      '',
    ],
  },

  experimental: {
    images: {unoptimized: true},
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.js$/,
  //       use: [
  //         "babel-loader",
  //         {
  //           loader: "webpack-preprocessor-loader",
  //           options: {
  //             params: {
  //               isWeb: process.env.IS_WEB,
  //             },
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },
  trailingSlash: true,
});

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

// module.exports = withBundleAnalyzer({});
