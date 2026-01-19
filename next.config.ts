import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config, { isServer }) => {
      if (!isServer && process.env.ANALYZE === 'true') {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
        if (config.plugins) {
          config.plugins.push(
            new BundleAnalyzerPlugin({
              analyzerMode: 'static',
              openAnalyzer: false,
              reportFilename: './analyze/client.html',
            })
          );
        }
      }
      return config;
    },
  }),
};

export default nextConfig;
