// webpack.config.js
var webpack = require("webpack");
const glob = require('glob');
const WebpackBrowserLog = require('webpack-browser-log');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Ex = require('extract-text-webpack-plugin');
const compiler_public_path = 'http://localhost:3001/';
var config = {
    entry: {
        main: ['./src/main.js'].concat(`webpack-hot-middleware/client?path=${compiler_public_path}__webpack_hmr`),
        reactPlugins: ['react-router-dom', 'react-redux', 'redux', 'history', 'n-zepto'],
    },
    output: {
        path: __dirname + '/dist/',
        filename: '[name].js',
        chunkFilename: "[name].js", //  非入口文件的命名规则
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.jsx$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ["react", "es2015", "stage-0"],
                }
            }, {
                loader: 'diy-loader?methods=ejs',
            }]
        }, { //生成入口文件
            test: /\.entry$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ["react", "es2015", "stage-0"],
                }
            }, {
                loader: 'diy-loader?methods=makeEntry',
            }]
        }, {
            test: /\.js$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ["react", "es2015", "stage-0"],
                }
            }]
        }, {
            test: /\.less$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    modules: true,
                }
            }, {
                loader: 'less-loader'
            }]
        }, {
            test: /\.css$/,
            use: Ex.extract({
                fallback: 'style-loader',
                use: 'css-loader!less-loader?options=modules'
            })
        }]
    },

    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
    },

    plugins: [

        // new webpack.HotModuleReplacementPlugin(),
        // 开启全局的模块热替换（HMR）
        //提供全局的变量，在模块中使用无需用require引入
        // //将公共代码抽离出来合并为一个文件
        // new webpack.optimize.CommonsChunkPlugin('webpack.common'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'webpack.common', // 注意不要.js后缀
        }),
        new Ex('style.css'),
        // css抽取
        //new webpack.extractTextPlugin("[name].css"),

        // new webpack.ProvidePlugin({
        //     ReactDom: 'react-dom',
        //     React: 'react',
        // }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html',
            hash: false,
            // favicon: paths.client('static/favicon.ico'),
            filename: 'index.html',
            inject: 'body',
            minify: {
                collapseWhitespace: false
            }
        })
        // new webpack.NoErrorsPlugin()
        //new webpack.NamedModulesPlugin(),
        // 当模块热替换（HMR）时在浏览器控制台输出对用户更友好的模块名字信息
    ]
};
/**
 * find entries
 */
// var files = glob.sync(__dirname + '/src/modules/**/*.jsx.js');
// var newEntries = files.reduce(function(memo, file) {
//     var replaceStr1 = __dirname + '/src/';
//     var replaceStr2 = '.jsx.js';
//     var name = file.replace(new RegExp(replaceStr1, 'gm'), '');
//     name = name.replace(new RegExp(replaceStr2, 'gm'), '');
//     memo[name] = file;
//     // filesKey++;
//     return memo;
// }, {});


//config.entry = Object.assign({}, config.entry, newEntries);

/**
 * [entry description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
// function entry(name) {
//   return './src/modules/' + name + '/index.js';
// }

module.exports = config;