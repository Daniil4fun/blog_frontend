import type { Configuration } from 'webpack-dev-server';
import { BuildOptions } from './types/types';

export function buildDevServer(options: BuildOptions): Configuration {
    return {
        port: options.port ?? 3000,
        open: true,
        historyApiFallback: true,
        client: {
            overlay: false
        },
        static: {
            directory: options.paths.public
        },
    }
}