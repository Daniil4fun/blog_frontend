import { Configuration } from 'webpack';
import { buildWebpack } from "./config/buildWebpack";
import { BuildMode, BuildPaths } from './config/types/types';
import path from 'path';

interface EnvVariables {
    mode: BuildMode;
    port: number;
}

export default (env: EnvVariables) => {
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, "src", "index.tsx"),
        output: path.resolve(__dirname, "build"),
        public: path.resolve(__dirname, "public"),
        html: path.resolve(__dirname, "public", "index.html"),
        src: path.resolve(__dirname, "src")
    }

    const config: Configuration = buildWebpack({
        port: env.port ?? 3000,
        mode: env.mode ?? 'development',
        paths
    })

    return config;
}