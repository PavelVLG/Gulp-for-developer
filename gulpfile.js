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
        js: "src" + "/" + "js",
        html: "src" + "/",
        pictures: {
            img: "src" + "/" + "source" + "/" + "img" + "/*" + ".img",
            svg: "src" + "/" + "source" + "/" + "svg" + "/*" + ".svg",
            png: "src" + "/" + "source" + "/" + "png" + "/*" + ".png",
        },
    },
};

const html = () => {
    return (
        src(["src/*.html"])
            // .pipe(htmlmin({ collapseWhitespace: true }))//
            .pipe(dest(path.build.html))
            .pipe(sync.stream())
    );
};
const js = () => {
    return src(["src/js/*.js"])
        .pipe(plumber())
        .pipe(concat("scripts"))
        .pipe(
            rename({
                extname: ".min.js.map",
            })
        )
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(
            rename({
                extname: "",
            })
        )
        .pipe(dest(path.build.js))
        .pipe(sync.stream());
};

const jsLibr = () => {
    return src(["node_modules/jquery/dist/jquery.min.js"])
        .pipe(plumber())
        .pipe(concat("vendor.min.js"))
        .pipe(uglify())
        .pipe(dest(path.build.js));
};

const styles = () => {
    return src("src/scss/*.scss")
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
                extname: ".min.css.map",
            })
        )
        .pipe(dest(path.build.css))
        .pipe(csso())
        .pipe(mediagroup())
        .pipe(
            rename({
                extname: "",
            })
        )
        .pipe(dest(path.build.css))
        .pipe(sync.stream());
};
const pictures = () => {
    return src(path.dev.pictures.png)
        .pipe(dest(path.build.source))
        .pipe(sync.stream());
};
const watching = () => {
    watch(path.dev.css, styles);
    watch(path.dev.js, js);
    watch(path.dev.html, html);
    watch(path.dev.pictures.png, pictures);
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
exports.pictures = pictures;
exports.clean = cleanDist;
exports.default = series(
    jsLibr,
    js,
    styles,
    pictures,
    html,
    parallel(server, watching)
);
