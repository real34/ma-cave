var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');

module.exports = {
    entry: {
        app: ['./app/main.js']
    },
    output: {
        path: "./public",
        filename: "app.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.css$/, loader: "style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]" },
            { test: /\.png$/, loader: "url-loader?limit=20000" }
        ],
        noParse: [
            // See https://github.com/pouchdb/pouchdb/issues/3647#issuecomment-83112389
            /lie\.js$|\/leveldown\/|\/levelup\//
        ]
    },
    node: {
        // see https://github.com/josephsavona/valuable/issues/9
        fs: "empty"
    },
    devServer: {
        contentBase: "./public"
    }
};