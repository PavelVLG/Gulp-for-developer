const { src, dest, series, watch, parallel } = require("gulp"); // методы галпа
const scss = require("gulp-sass"); //scss в css
const csso = require("gulp-csso"); // сжимает css
const htmlmin = require("gulp-htmlmin"); // сжимает html
const del = require("del"); // удаление
const concat = require("gulp-concat"); // обьединяет файлы в один
const autoprefixer = require("gulp-autoprefixer"); // префиксы под браузеры
const sync = require("browser-sync").create(); // локальный сервер
const uglify = require("gulp-uglify-es").default; // сжимает js
const plumber = require("gulp-plumber"); // показывает ошибки
const sourcemaps = require("gulp-sourcemaps"); // делает map
const rename = require("gulp-rename"); // переименовывает
const mediagroup = require("gulp-group-css-media-queries"); // собирает медиа запросы и обединяет
const buildFolder = "dist"; // папка сбора и запуска сервера
const developerFolder = "src"; // папка разработки
const server = () => {
    sync.init({
        UI: 3000,
        notify: false,
        server: {
            baseDir: buildFolder,
        },
    });
};

const path = {
    build: {
        css: buildFolder + "/" + "css",
        js: buildFolder + "/" + "js",
        html: buildFolder + "/",
        source: buildFolder + "/" + "source",
    },
    dev: {
        scss: developerFolder + "/" + "scss" + "/*" + ".scss",
        js: developerFolder + "/" + "js" + "/*" + ".js",
        html: developerFolder + "/" + "index.html",
        source: {
            img: developerFolder + "/" + "source" + "/" + "img" + "/*" + ".img",
            svg: developerFolder + "/" + "source" + "/" + "svg" + "/*" + ".svg",
            png: developerFolder + "/" + "source" + "/" + "png" + "/*" + ".png",
            ui: developerFolder + "/" + "source" + "/" + "ui" + "/*" + ".js",
        },
    },
};
/***************************************************************/
const html = () => {
    return src(path.dev.html)
        .pipe(htmlmin({ collapseWhitespace: true })) // Сжимает html.
        .pipe(dest(path.build.html));
};
/*****************************************************************/
const js = () => {
    return src(path.dev.js)
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(concat("index"))

        .pipe(
            rename({
                extname: ".min.js",
            })
        )

        .pipe(uglify())
        .pipe(sourcemaps.write("."))
        .pipe(dest(path.build.js))
        .pipe(sync.stream());
};

const jsLibr = () => {
    return src(path.dev.source.ui)
        .pipe(plumber())
        .pipe(concat("vendor.min.js"))
        .pipe(uglify())
        .pipe(dest(path.build.js));
};

const styles = () => {
    return src(path.dev.scss)
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(scss({ outputStyle: "expanded" }))

        .pipe(concat("styles.scss"))

        .pipe(
            autoprefixer({
                grid: true,
                cascade: false,
                overrideBrowserslist: ["last 5 version"],
            })
        )
        .pipe(mediagroup())
        .pipe(
            rename({
                extname: ".min.css",
            })
        )
        .pipe(csso())
        .pipe(mediagroup())
        .pipe(sourcemaps.write("."))
        .pipe(dest(path.build.css))
        .pipe(sync.stream());
};
const source = () => {
    return src(path.dev.source.png).pipe(dest(path.build.source));
};
const watching = () => {
    watch(path.dev.scss, styles);
    watch(path.dev.js, js);
    watch(path.dev.html).on("change", sync.reload);
    watch(path.dev.source.png, source);
};

const cleanDist = () => {
    return del("dist");
};

exports.html = html;
exports.js = js;
exports.jsLibr = jsLibr;
exports.styles = styles;
exports.watching = watching;
exports.server = server;
exports.source = source;
exports.clean = cleanDist;

exports.default = series(
    html,
    styles,
    // jsLibr,
    js,
    source,
    parallel(server, watching)
);
