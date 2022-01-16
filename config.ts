import type { UserConfig } from "ssr-types";
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const externals = {
  react: "window.React",
  "react-dom": "window.ReactDOM",
  //antd: "window.antd",
  // "antd/lib": "window.antd",
};
export const cdns = [
  "https://unpkg.com/react@17.0.2/umd/react.production.min.js",
  "https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js",
  // "https://unpkg.com/antd@4.18.3/dist/antd.min.js",
  
];
export const links = [
  'https://unpkg.com/antd@4.18.3/dist/antd.min.css'
]
const userConfig: UserConfig = {
  whiteList: ["antd"],
  chainClientConfig(config) {
    config.externals([externals]);
    //config.plugin("webpack-bundle-analyzer").use(BundleAnalyzerPlugin);
  },
};

export { userConfig };
