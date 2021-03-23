const { src, dest, series, watch, parallel } = require("gulp");
const scss = require("gulp-sass");
const csso = require("gulp-csso");
const htmlmin = require("gulp-htmlmin");
const del = require("del");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const sync = require("browser-sync").create();
const uglify = require("gulp-uglify-es").default;
const plumber = require("gulp-plumber");
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const mediagroup = require("gulp-group-css-media-queries");

const server = () => {
    sync.init({
        UI: 3000,
        notify: true,
        server: {
            baseDir: "dist",
        },
    });
};
const path = {
    build: {
        css: "dist" + "/" + "css",
        js: "dist" + "/" + "js",
        html: "dist" + "/",
        source: "dist" + "/" + "source",
    },
    dev: {
        css: "src" + "/" + "scss" + "/**" + "/*" + ".scss",
        js: "src" + "/" + "js" + "/*" + ".js",
        html: "src" + "/" + "index.html",
        source: {
            img: "src" + "/" + "source" + "/" + "img" + "/*" + ".img",
            svg: "src" + "/" + "source" + "/" + "svg" + "/*" + ".svg",
            png: "src" + "/" + "source" + "/" + "png" + "/*" + ".png",
            ui: "src" + "/" + "source" + "/" + "ui" + "/*" + ".js",
        },
    },
};
/***************************************************************/
const html = () => {
    return (
        src(path.dev.html)
            // .pipe(htmlmin({ collapseWhitespace: true })) // Сжимает html.
            .pipe(dest(path.build.html))
    );
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
    return src([""])
        .pipe(plumber())
        .pipe(concat("vendor.min.js"))
        .pipe(uglify())
        .pipe(dest(path.build.js));
};

const styles = () => {
    return src("src/scss/*.scss")
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
    watch(path.dev.css, styles);
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
