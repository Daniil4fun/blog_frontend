import HtmlWebpackPlugin from "html-webpack-plugin"
import { Configuration, ProgressPlugin } from "webpack"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { BuildOptions } from "./types/types"
import path from "path";

export function buildPlugins({ mode, paths }: BuildOptions): Configuration['plugins'] {
    const isDev = mode === "development";
    const isProd = mode === "production";

    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({ template: paths.html, favicon: path.resolve(paths.public, "favicon.ico") }),
    ];

    if (isDev) {
        plugins.push(new ProgressPlugin());
        plugins.push(new ForkTsCheckerWebpackPlugin());
    }

    if (isProd) {
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        }));
    }

    return plugins;
}