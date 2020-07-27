var path = require('path');

module.exports = {
    entry: './src/Mammi.js',
    devtool: 'sourcemaps',
    cache: true,
    mode: 'development',
    output: {
        path: __dirname,
        filename: './dist/bundle.js'
    },
    module: {
        rules: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }]
                
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
              test: /\.(png|svg|jpeg|jpg|gif)$/,
              use: [
                'file-loader'
              ]
            }
        ]
    },
    devServer: {
      contentBase: path.join(__dirname, ''),
      compress: true,
      port: 9000,
      historyApiFallback: true
    }
};