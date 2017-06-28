const path = require('path');


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
			}
		]
	}
}