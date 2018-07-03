//относительный путь, нужен только в output
const path = require("path");

const conf = {
    //файл который надо считывать, без точки спереди не работает.
    entry: "./src/index.js",
    output: {
        //путь до папки в которой нужно сделать сборку.
        path: path.resolve(__dirname, "dist"),
        //имя файля которое ждешь после сборки
        filename: 'main.js',
        //эта настройка для dev сервера, после добавления относительного путя сервер начинает работать.
        publicPath: "dist"
    },
    devServer: {
        //во время ошибки выведет черный экран, что бы не смотреть в console.log
        overlay: true
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: '/node-modules'
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
                exclude: '/node-modules'
            }
        ]
    }
}

//сюда попадает 2 параметра, env и options.
module.exports = (env, options ) => {
    //в options есть mode.
    let production = options.mode === "production";
    //source-map - это отдельный файл, который подтянется юзеру только если он зайдет в консоль разработчика.
    //eval-sourcemap подтягивается налету. Вшит в код.
    conf.devtool = production ? false : "eval-sourcemap"
    return conf;
}