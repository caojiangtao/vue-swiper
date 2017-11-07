'use strict'
const path = require('path');
var webpack = require('webpack');
var pkg = require('./package.json');
var banner = `${pkg.name} v${pkg.version}\n${pkg.description}\n@author ${pkg.author}`;

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

module.exports = {
	entry: {
		app: './src/index.js'
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'index.js',

	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': resolve('src')

		}
	},
	plugins: [],
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
				loader: 'url-loader'
			}

		]
	}

};
if(process.env.NODE_ENV === 'dev') {
	module.exports.devtool = '#eval-source-map';
} else {
	module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin());
	module.exports.plugins.push(new webpack.BannerPlugin(banner));
}