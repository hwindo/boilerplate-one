import path from 'path';
import webpack from 'webpack'

let config = {
    entry: {
        main: [
            './src/script.js',
            'webpack/hot/dev-server',
            'webpack-hot-middleware/client'
        ]
    },
    output: {
        filename: './script.js',
        path: path.resolve(__dirname, './public')
    },
    context: path.resolve(__dirname, './public'),
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}

function scripts() {
    return new Promise(resolve => webpack(config, (err, stats) => {
        if (err) console.log('Webpack', err)
        console.log(stats.toString({
            /* stats options */
        }));
        resolve()
    }));
}

module.exports = {config, scripts}