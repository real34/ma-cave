var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.js');

console.log(pathToReact);
module.exports = {
    entry: {
        app: ['webpack/hot/dev-server', './app/main.js']
    },
    output: {
        path: "./public",
        filename: "app.js"
    },
    resolve: {
        alias: {
            "react": pathToReact
        }
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.jsx$/, exclude: /node_modules/, loader: 'jsx!babel-loader' },
        ],
        noParse: [
            pathToReact,
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