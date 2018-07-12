const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: [
    './src/index.js'
  ],
  module: {
  rules: [
    	{
     		test: /\.(js|jsx)$/,
    		exclude: /node_modules/,
    		use: ['babel-loader']
    	},
      {
        test : /\.css$/,
        use : [{ loader : 'style-loader'  }, { loader : 'css-loader' }]
      },
      {
        test: /\.less$/,
        use : [
            {
              loader : 'style-loader'
            },
            {
             loader : 'css-loader'
            },
            {
            loader : 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    modules: [path.resolve(__dirname, './src'), 'node_modules']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
	new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
	hot: true
  }
}
