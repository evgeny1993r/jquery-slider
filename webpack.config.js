const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isMode = process.env.NODE_ENV
console.log(isMode)

if(isMode === 'development') {
    module.exports = {
        entry: './src/index.ts',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'slider.js'
        },

        resolve: {
            extensions: ['.ts', '.js']
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html'
            }),
            new MiniCssExtractPlugin({
                filename: 'slider.css'
            })
        ],

        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
                },
                {
                    test: /\.ts$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-typescript']
                        }
                    }
                }
            ]
        }
    }
} else if(isMode === 'production') {
    module.exports = {
        entry: './src/index.ts',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'slider.js'
        },        
        
        externals: {
            jquery: 'jQuery'
        },

        plugins: [
            new MiniCssExtractPlugin({
                filename: 'slider.css'
            })
        ],

        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
                },
                {
                    test: /\.ts$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-typescript']
                        }
                    }
                }
            ]
        }
    }
}