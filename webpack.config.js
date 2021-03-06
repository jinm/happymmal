/*
* @Author: Administrator
* @Date:   2020-09-16 17:15:29
* @Last Modified by:   chang__ccge
* @Last Modified time: 2020-09-19 17:35:50
*/
const path = require('path')
const HtmlWebpackPlugin  = require('html-webpack-plugin')
const ExtractTextPlugin =require('extract-text-webpack-plugin')
const { CleanWebpackPlugin }= require('clean-webpack-plugin')
const webpack = require('webpack')
module.exports={
	entry:'./src/app.jsx',
	devtool:'cheap-module-eval-source-map',
	devServer:{
		open:true,
		historyApiFallback:{
			index:'/dist/index.html'
		},
		proxy:{
			'/manage':{
				target:'http://admintest.happymmall.com',
				changeOrigin:true
			},
			'/user/logout.do':{
				target:'http://admintest.happymmall.com',
				changeOrigin:true
			}
		}
	},
	resolve:{
		alias:{
			page:path.resolve(__dirname,'src/page'),
			component:path.resolve(__dirname,'src/component'),
			util:path.resolve(__dirname,'src/util'),
			service:path.resolve(__dirname,'src/service')
		}
	},
	module:{
		rules:[
			{
				test:/\.jsx$/,
				exclude:/node_modules/,
				use:{
					loader:'babel-loader',
					options:{
						presets:['env','react']
					}
				}
			},
			{
				test:/\.css$/,
				use:ExtractTextPlugin.extract({
					fallback:'style-loader',
					use:'css-loader'
				})

			},
			//sass文件处理 用extract-text-plugin 创建
			{
				test:/\.scss$/,
				use:ExtractTextPlugin.extract({
					fallback:'style-loader',
					use:['css-loader','sass-loader']
				})
			},
			//图片配置
			{
				test:/\.(png|jpg|gif)$/,
				use:[
					{
						loader:'url-loader',
						options:{
							limit:8192,
							name:'resource/[name].[ext]'
						}
					}
				]
			},
			//字体图标配置
			{
				test:/\.(eot|svg|ttf|woff|woff2|otf)$/,
				use:[
					{
						loader:'file-loader',
						options:{
							limit:8192,
							name:'resource/[name].[ext]'
						}
					}
				]
			}
	]
},
	plugins:[new HtmlWebpackPlugin({
		template:'./src/index.html',
		favicon:'./favicon.ico'
	}),new ExtractTextPlugin('css/[name].css'),
	new webpack.optimize.CommonsChunkPlugin({
		name:'common',
		filename:'js/base.js'
	}),new CleanWebpackPlugin({
		cleanAfterEveryBuildPatterns:['dist']
	})],
	output:{
		path:path.resolve(__dirname,'dist'),
		publicPath:'/dist/',
		filename:'js/app.js'
	}

}