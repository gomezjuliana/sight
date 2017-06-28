const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
	entry: './src/js/app.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public/js')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						"presets": [['env', {
							"targets": {
								"browsers": ["last 2 versions", "safari >= 7"]
							}
						}
						]]
					}
				}
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					use: ['css-loader', 'sass-loader']
				})
			},
			{
				test: /\.(jpg|png|svg|gif)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: '../assets/'
					}
				}
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('../css/main.css')
	]
}