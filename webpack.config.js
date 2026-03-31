const path = require("node:path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");


module.exports = {
  mode: "development",  
  entry: {
    app: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "main.js",
  }, 
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          // Disables attributes processing
          minimize: true,
        },
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        exclude: /bootstrap\.min\.css$/i,
        use: [
        {
          loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
        }, 
        "css-loader",
        "sass-loader",
        ],
      },
      {
        test: /bootstrap\.min\.css$/i,
        use: [
        {
          loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
        },
        "rtlcss-loader"
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: "./images/[name][ext]"
        }
      },
      {
        test: /\.(eot|woff2|woff|ttf)$/i,
        type: 'asset/resource',
        generator: {
          filename: "./fonts/[name][ext]"
        }
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    hot: false,
    open: true,
    port: 9001,
    devMiddleware: {
      writeToDisk: true,
    }
  }, 
  plugins: [
    new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./src/index.html"
    }),
    new HtmlWebpackPlugin({
        filename: "product.html",
        template: "./src/product.html"
    }),
    new HtmlWebpackPlugin({
        filename: "checkout.html",
        template: "./src/checkout.html"
    }),
    new HtmlWebpackPlugin({
        filename: "payment.html",
        template: "./src/payment.html"
    }),
    new HtmlWebpackPlugin({
        filename: "search.html",
        template: "./src/search.html"
    }),
    new HtmlWebpackPlugin({
        filename: "contact.html",
        template: "./src/contact.html"
    }),
    new MiniCssExtractPlugin({
      filename: "css/style.css",
    }),
    new CssMinimizerPlugin(),
  ],
};
