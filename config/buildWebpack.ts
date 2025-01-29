import { Configuration } from 'webpack';
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { BuildOptions } from './types/types';

export function buildWebpack(options: BuildOptions): Configuration {
    const { mode, paths } = options;
    const isDev = mode === 'development';

    return {
        mode: mode ?? "development",
        entry: paths.entry,
        output: {
            path: paths.output,
            filename: "[name].[contenthash].js",
            clean: true,
            publicPath: '/'
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options)
        },
        resolve: buildResolvers(options),
        devtool: isDev ? 'inline-source-map' : 'source-map',
        devServer: isDev ? buildDevServer(options) : undefined
    }
}