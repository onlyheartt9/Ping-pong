const path = require("path");
const withLess = require("next-with-less");
const {proxyUrl} = require("./proxy");

const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const externals = {
  react: "window.React",
  "react-dom": "window.ReactDOM"
};

module.exports = withLess({
  distDir: "../dist",
  //swcMinify: true,
  javascriptEnabled: true,
  reactStrictMode: true,
  async rewrites() {
    return {
      fallback: [
        {
          source: "/:path*",
          destination: `${proxyUrl}/:path*`,
        },
      ],
    };
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    //设置别名
    config.resolve.alias["@"] = path.resolve(__dirname, "src");

    if (!dev && !isServer) {
      config.externals = config.externals.concat(externals);
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "server",
          analyzerHost: "127.0.0.1",
          analyzerPort: "7777",
          reportFilename: "report.html",
          defaultSizes: "parsed",
          openAnalyzer: true,
          generateStatsFile: false,
          statsFilename: "stats.json",
          statsOptions: null,
          excludeAssets: null,
          //logLevel: info,
        })
      );
      //config.plugin("webpack-bundle-analyzer").use(BundleAnalyzerPlugin);
    }
    return config;
  },
});
