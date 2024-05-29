const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = (configOptions) => {
  const {
    isLocal,
    isHMREnabled,
    context,
    assetNormalizedBasePath,
    localBasePath,
    imageCDNNormalizedBasePath,
    buildPath,
    localImageBasePath,
    localFontsBasePath,
  } = configOptions;
  return {
    entry: {
      themeBundle: [path.resolve(context, "theme/index.jsx")],
    },
    resolve: {
      extensions: ["", ".js", ".jsx", ".ts", ".tsx"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  [
                    "@babel/preset-env",
                    {
                      targets: "defaults",
                    },
                  ],
                  "@babel/preset-react",
                  "@babel/preset-typescript",
                ],
                plugins: [
                  ...(isLocal && isHMREnabled
                    ? [require.resolve("react-refresh/babel")]
                    : []),
                ],
              },
            },
          ],
        },
        {
          test: /\.(jsx|js)$/,
          include: path.resolve(context, "theme"),
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  [
                    "@babel/preset-env",
                    {
                      targets: "defaults",
                    },
                  ],
                  "@babel/preset-react",
                ],
                plugins: [
                  ...(isLocal && isHMREnabled
                    ? [require.resolve("react-refresh/babel")]
                    : []),
                ],
              },
            },
          ],
        },
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: isLocal
                    ? "[path][name]__[local]--[hash:base64:5]"
                    : "[hash:base64:5]",
                },
              },
            },
            "postcss-loader",
          ],
          exclude: /\.global\.css$/,
        },
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: false,
              },
            },
            "postcss-loader",
          ],
          include: /\.global\.css$/,
        },
        {
          test: /\.less$/i,
          use: [
            // compiles Less to CSS
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: false,
              },
            },
            "less-loader",
          ],
          include: /\.global\.less$/,
        },
        {
          test: /\.less$/i,
          use: [
            // compiles Less to CSS
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: isLocal
                    ? "[path][name]__[local]--[hash:base64:5]"
                    : "[hash:base64:5]",
                },
              },
            },
            "less-loader",
          ],
          exclude: /\.global\.less$/,
        },
        {
          test: /\.(png|jpg|jpeg)$/i,
          type: "asset/resource",
          generator: {
            publicPath: isLocal
              ? localImageBasePath
              : imageCDNNormalizedBasePath,
            outputPath: "assets/images/",
          },
        },
        {
          test: /\.(ttf|otf|woff|woff2)$/i,
          type: "asset/resource",
          generator: {
            publicPath: isLocal ? localFontsBasePath : assetNormalizedBasePath,
            outputPath: "assets/fonts/",
          },
        },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: isLocal ? "[name].css" : "[name].[contenthash].css",
      }),
    ],
  };
};
