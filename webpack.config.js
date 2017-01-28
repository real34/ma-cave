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
        rules: [
            { test: /\.js$/, exclude: /node_modules/, use: "babel-loader" },
            {
              test: /\.css$/,
              use: [
                {
                  loader: "style-loader"
                },
                {
                  loader: "css-loader",
                  options: {
                    modules: true,
                    importLoaders: 1
                  }
                }
              ]
            },
            { test: /\.png$/, use: "url-loader?limit=20000" }
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
