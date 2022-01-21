const path = require("path");
const withLess = require("next-with-less");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const externals = {
  react: "window.React",
  "react-dom": "window.ReactDOM",
  //'moment':"window.moment",
  //"antd/lib": "window.antd",
};
export const cdns = [
  "https://unpkg.com/react@17.0.2/umd/react.production.min.js",
  "https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js",
  "https://unpkg.com/moment@2.29.1/moment.js",
  "https://unpkg.com/antd@4.18.3/dist/antd.min.js",
];
module.exports = withLess({
  distDir: "../dist",
  //swcMinify: true,
  javascriptEnabled: true,
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    //设置别名
    config.resolve.alias["@"] = path.resolve(__dirname, "src");

    if (!dev && !isServer) {
      //console.log(config)
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
