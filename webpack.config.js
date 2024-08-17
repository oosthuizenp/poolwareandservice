const path = require('path');
const webpack = require('webpack');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    mode: 'production',
    stats: {
        all: false,
        warnings: true,
        errors: true,
        timings: true,
        modules: true,
        logging: 'verbose',
        loggingTrace: true,
    },
    performance: {
        hints: false,
    },
    optimization: {
        minimizer: [
            new TerserJSPlugin({}),
            new CssMinimizerPlugin(),
        ],
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'bundle.css',
            chunkFilename: '[id].css',
        }),
    ],
    entry: './_assets/bundle.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'assets'),
        assetModuleFilename: 'assets/[name][ext][query]', // Configure asset filenames
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader, // Extracts CSS into separate files
                    'css-loader', // Translates CSS into CommonJS
                    'sass-loader', // Compiles Sass to CSS
                ],
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                type: 'asset/inline', // Inline small font files
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // Limit to 10kb
                    },
                },
            },
            {
                test: /\.(ttf|eot|svg|jpg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                type: 'asset/resource', // Use separate files for larger assets
                generator: {
                    filename: 'assets/[name][ext][query]',
                },
            },
        ],
    },
};
