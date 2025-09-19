// webpack.config.js
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: 'development',
	entry: './public/js/imports.js',
	devtool: 'eval-source-map',
	output: {
		path: path.resolve(__dirname, 'public/dist'),
		filename: 'bundle.js',
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'styles.css',
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
		}),
	],
	module: {
		rules: [
			{
				test: /\.(?:js|mjs|cjs)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						targets: 'defaults',
						presets: [['@babel/preset-env']],
					},
				},
			},
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.scss$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
		],
	},
};
