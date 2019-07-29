'use strict';

const NODE_ENV = process.env.NODE_ENV || "development";

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // выносим css в отдельный файл

module.exports = {
    devtool: NODE_ENV === "development" ? 'inline-source-map' : false,
    entry: "./src/index.jsx",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js"
    },
    watch: NODE_ENV === "development",
    watchOptions: {
        aggregateTimeout: 100
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        }),
    ],

    module: {
        rules: [
            {
                test: /\.jsx$/,
                loaders: "babel-loader",
                options: {
                    presets: [
                        '@babel/react',
                        {
                            'plugins': ['@babel/plugin-proposal-class-properties']
                        }
                    ]
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                loaders: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.svg$/,
                use: [
                    "babel-loader",
                    {
                        loader: "react-svg-loader",
                        options: {
                            svgo: {
                                plugins: [
                                    { removeTitle: false }
                                ],
                                floatPrecision: 2
                            }
                        }
                    }
                ]
            }
        ]
    }
};