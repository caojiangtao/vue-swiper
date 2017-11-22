'use strict'
const path = require('path');
var webpack = require('webpack');
var pkg = require('./package.json');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var banner = `${pkg.name} v${pkg.version}\n${pkg.description}\n@author ${pkg.author}`;

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

module.exports = {
	entry: {
		app: './src/popbox.js'
	},
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: '/',
		library: 'popbox',
		libraryTarget: 'umd',
		filename: "[name].js"
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': resolve('src')

		}
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({ // 提取公用
			name: 'common', // Move dependencies to our main file
			filename: 'static/common/common.js',
			children: true, // Look for common dependencies in all children,
			minChunks: 2 // How many times a dependency must come up before being extracted
		}),
		new uglifyJsPlugin({  //丑化
		    compress: {
		        warnings: false
		    }
		})
		// new ExtractTextPlugin(`${name}_${version}.min.css`)// 分离css
	],
	module: {
		rules: [{
				test: /\.vue$/,
				exclude: /node_modules/,
				loader: 'vue-loader'
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},

			{
				test: /\.scss$/,
				exclude: /node_modules/,
				loaders: ['style-loader', 'css-loader', 'sass-loader']
			},

			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: '[name].[hash:7].[ext]'
				}
			}
			

		]
	}

};
//if(process.env.NODE_ENV === 'dev') {
//	module.exports.devtool = '#eval-source-map';
//} else {
//module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin());
module.exports.plugins.push(new webpack.BannerPlugin(banner));
//}