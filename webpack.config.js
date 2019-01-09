const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const CopyWebpackPlugin = require('copy-webpack-plugin')


module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, 'public/js', 'main.js')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: "MyLibrary",
        devtoolNamespace: 'digi-source',
        libraryExport: "MyModule",
        pathinfo: false
    },

    module: {
        noParse: (content) => {
            console.log(content);
            debugger;
            return false;
        },
        rules: [
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader",
                    options: {
                        // attrs: [':data-src']
                    }
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            //name: '[path][name].[ext]',
                            name: '[name]2.[ext]', //最后生成的文件名是 output.path+ outputPaht+ name，[name],[ext],[path]表示原来的文件名字，扩展名，路径
                            //useRelativePath:true,
                            outputPath: 'img/' // 后面的/不能少
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                // use: 'less-loader',
                // enforce: "post"
                loaders:  [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            {
                test: /\.css$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }]
            },
        ]
    },

    resolve: {
        extensions: ['.js', '.css'],
        modules: [path.resolve(__dirname, 'search'), 'node_modules']
    },
    externals: {
        bbb: 'aaa'
    },


    plugins: [
        new HtmlWebpackPlugin({
            title:'rd平台',
            template: path.resolve(__dirname, 'public/index.html'), // 源模板文件
            // filename: './index.html', // 输出文件【注意：这里的根路径是module.exports.output.path】
            showErrors: true,
            inject: 'body',
            chunks: ["main"]
        }),
        new webpack.DefinePlugin({BJ: JSON.stringify('北京'),}),
        new webpack.HotModuleReplacementPlugin({
            // Options...
        }),

        // new webpack.BannerPlugin({
        //     /*! hash:efba96a113a1385e9ce1, chunkhash:1dfa3ed2525e31a6d587, name:main, filebase:main.js, query:, file:main.js */
        //     banner: 'hash:[hash], chunkhash:[chunkhash], name:[name], filebase:[filebase], query:[query], file:[file]'
        // }),

        // new UglifyJsPlugin(),

        // new CopyWebpackPlugin([
        //     {from: path.resolve(__dirname, 'public/css'), to: path.resolve(__dirname, 'dist/testCopy') }
        // ])
    ],


    // watch: false,

    devtool: "source-map",
    // devtool: "eval",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        hot: true,
        open: true,
        port: 8000
    }
}