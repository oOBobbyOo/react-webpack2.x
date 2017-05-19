const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports  = {
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist/',
		filename: '[name].bundle.js'
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		historyApiFallback: true,
		hot: true,
    inline: true,
    port: 8000 //默认端口8080
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)?$/,
				include: [
        	path.resolve(__dirname, 'src')
       	],
				use: 'babel-loader'
			},
			{
				test: /\.css$/,
				//use: ['style-loader','css-loader']
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader'],
					publicPath: '/dist/'
				})
			},
			{
				test: /\.scss$/,
				//use: ['style-loader','css-loader','sass-loader']
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader'],
					publicPath: '/dist/'
				})
			},
			{
				test: /\.less$/,
				//use: ['style-loader','css-loader','less-loader']
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'less-loader'],
					publicPath: '/dist/'
				})
			},
			{
				test: /\.(jpe?g|png|gif)$/i,
				use: [
					'url-loader?limit=8192&name=images/[name].[ext]',
					'image-webpack-loader'
				]
			},
			{
		    test: /\.(ttf|eot|woff|woff2|svg)$/,
  			use: [{
  				loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
  			}]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Bobby',
			filename: './index.html',
			minify: {
				removeComments: true,
				collapseWhitespace:true
			},
			template: './src/template/index.html'
		}),
		new ExtractTextPlugin({
			filename: 'styles/[name].css',
			disable: false,
			allChunks: true
		}),
		new webpack.optimize.UglifyJsPlugin({
     	output: {
      	comments: false,
     	},
     	compress: {
      	warnings: false
     	},
    }),
  	new webpack.DefinePlugin({
    	'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
	]
};
