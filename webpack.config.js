const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
const env = process.env.WEBPACK_ENV

// Simply configure those 4 variables:
const JS_SOURCE_FILES = ['./src/index.js']
const OUTPUT_FILENAME = 'index'
const DEST_FOLDER = 'dist'
const COPYRIGHT = `
Copyright (c) 2019, Neap Pty Ltd.
All rights reserved.

This source code is licensed under the BSD-style license found in the
LICENSE file in the root directory of this source tree.`



const OUTPUT_FILE = `${OUTPUT_FILENAME}.js`
const OUTPUT_FILE_MIN = `${OUTPUT_FILENAME}.min.js`

const { plugins, outputfile } = env == 'build' 
	? { 
		plugins: [
			new UglifyJSPlugin(), 
			new webpack.BannerPlugin(COPYRIGHT)
		], 
		outputfile: OUTPUT_FILE_MIN
	} 
	: { 
		plugins: [
			new webpack.BannerPlugin(COPYRIGHT)
		], 
		outputfile: OUTPUT_FILE
	} 

module.exports = {
	entry: JS_SOURCE_FILES,
	output: {
		path: path.join(__dirname, DEST_FOLDER),
		filename: outputfile,
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	module: {
		loaders: [{
			loader: 'babel-loader',
			exclude: [
				path.resolve(__dirname, 'node_modules')
			],
			// Only run `.js` and `.jsx` files through Babel
			test: /\.jsx?$/,
			// Options to configure babel with
			query: {
				plugins: ['transform-runtime'],
				presets: ['es2015'],
			}
		}, ]
	},
	devtool: 'source-map',
	plugins: plugins
}