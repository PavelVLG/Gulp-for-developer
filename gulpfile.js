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
const include = require("gulp-file-include");
const imagemin = require("gulp-imagemin"); // сжатие картинки
const ttf = require("gulp-ttf2woff"); // преобразует шрифты
const ttf2 = require("gulp-ttf2woff2"); // преобразует шрифты
const fonter = require("gulp-fonter"); // преобразует шрифты

/**************Основные пути*******************/
const buildFolder = "dist"; // папка сбора и запуска сервера
const developerFolder = "src"; // папка разработки

const server = () => {
    // запускает сервер. ON
    sync.init({
        UI: 3000, // порт по умолчанию
        notify: true, // показывает обновление на станице("черное окошко") ON
        server: {
            baseDir: buildFolder, // папка подключения сервера
        },
    });
};

const path = {
    // описание путей
    build: {
        css: buildFolder + "/" + "css",
        fonts: buildFolder + "/" + "fonts",
        js: buildFolder + "/" + "js",
        html: buildFolder + "/",
        source: buildFolder + "/" + "source",
    },
    dev: {
        scss: developerFolder + "/" + "scss" + "/**/*" + ".scss",
        js: developerFolder + "/" + "js" + "/*" + ".js",
        html: [
            developerFolder + "/*" + ".html",
            "!" + developerFolder + "/_*" + ".html",
        ],
        source: {
            img: developerFolder + "/" + "source" + "/" + "img" + "/*" + ".img",
            svg: developerFolder + "/" + "source" + "/" + "svg" + "/*" + ".svg",
            png: developerFolder + "/" + "source" + "/" + "png" + "/*" + ".png",
        },
        UI: developerFolder + "/" + "source" + "/" + "ui" + "/*" + ".js",
        fonts: developerFolder + "/" + "scss" + "/" + "fonts" + "/*",
    },
};
/*****************************HTML**********************************/
const html = () => {
    //ON
    return src(path.dev.html)
        .pipe(include()) // собирает html файлы
        .pipe(htmlmin({ collapseWhitespace: true })) // Сжимает html.
        .pipe(dest(path.build.html)); // выкладывает в эту папку результат
};
/*****************************JavaScript************************************/
const js = () => {
    // ON
    return src(path.dev.js)
        .pipe(sourcemaps.init()) // делает карту
        .pipe(plumber()) // отслеживает ошибки
        .pipe(include()) // обьединяет файлы импорты
        .pipe(concat("index")) // обьеденяет и переименовывает
        .pipe(
            rename({
                extname: ".min.js",
            })
        )
        .pipe(uglify()) // сжимает
        .pipe(sourcemaps.write(".")) // дает js.min.js.map
        .pipe(dest(path.build.js)) //выкладывает в эту папку результат
        .pipe(sync.stream());
};
/***********************сторонние библиотеки*************************/
const jsLibr = () => {
    // OFF
    return src(path.dev.UI)
        .pipe(plumber())
        .pipe(concat("vendor.min.js")) // файл для подключения сторонних библиотек
        .pipe(uglify())
        .pipe(dest(path.build.js));
};
/************************scss в css**********************************/
const styles = () => {
    // ON
    return src("src/scss/*.scss")
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(scss({ outputStyle: "expanded" })) //scss в css
        .pipe(concat("styles.scss"))

        .pipe(
            autoprefixer({
                grid: true,
                cascade: false,
                overrideBrowserslist: ["last 5 version"],
            })
        ) // ставит префиксы для браузеров
        .pipe(mediagroup())
        .pipe(
            rename({
                extname: ".min.css",
            })
        )
        .pipe(csso()) //сжимает css
        .pipe(mediagroup()) // jобединяет меди запросы
        .pipe(sourcemaps.write("."))
        .pipe(dest(path.build.css))
        .pipe(sync.stream());
};

/****************fonts****************************/

const fonts = () => {
    // выводит в билд шрифты ON
    // ttf in build
    src(path.dev.fonts + ".ttf")
        .pipe(ttf())
        .pipe(dest(path.build.fonts));
    return src(path.dev.fonts + ".ttf2")
        .pipe(ttf2())
        .pipe(dest(path.build.fonts));
};

const otfttf = () => {
    // из otf в ttf, складывает в разработку OFF
    src(path.dev.fonts + ".otf")
        .pipe(
            fonter({
                formats: ["ttf"],
            })
        )
        .pipe(dest(path.dev.fonts));
};

/****************************img***************************/
const source = () => {
    //переносит и сжимает картинки ON
    return src([path.dev.source.png, path.dev.source.svg, path.dev.source.img])
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 3,
            })
        )
        .pipe(dest(path.build.source));
};
const watching = () => {
    watch(path.dev.scss, styles);
    watch(path.dev.js, js);
    watch(path.dev.html[0]).on("change", sync.reload);
    watch(path.dev.html[0], html);
    watch(
        [path.dev.source.png, path.dev.source.svg, path.dev.source.img],
        source
    );
};

const cleanDist = () => {
    // удаляет папку dist
    return del(buildFolder);
};

exports.otfttf = otfttf; // otf в ttf
exports.fonts = fonts;
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
    fonts,
    parallel(server, watching)
);
