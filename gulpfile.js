const { src, dest, series, watch, parallel } = require("gulp");
const scss = require("gulp-sass");
const csso = require("gulp-csso");
const include = require("gulp-file-include");
const htmlmin = require("gulp-htmlmin");
const del = require("del");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const sync = require("browser-sync").create();
const uglify = require("gulp-uglify-es").default;
const wait = require("gulp-wait");
const plumber = require("gulp-plumber");
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const mediagroup = require("gulp-group-css-media-queries");
const path = {
    build: {
        css: "dist" + "/" + " css",
        js: "dist" + "/" + "js",
        html: "dist" + "/",
    },
    dev: {
        css: "src" + "/" + "scss",
        js: "src" + "/" + "/" + "js",
        html: "src" + "/",
    },
};
const gulpServer = () => {
    sync.init({
        notify: true,
        server: {
            baseDir: "dist",
        },
    });
};
const html = () => {
    return src(["src/*.html"])
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest(path.build.html));
};
const js = () => {
    return src(["src/js/*.js"])
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
        .pipe(dest(path.build.js));
};
const jsAll = () => {
    return src(["node_modules/jquery/dist/jquery.min.js"])
        .pipe(concat("vendor.min.js"))
        .pipe(uglify())
        .pipe(dest(path.build.js));
};
// "src/scss/*.scss",
const styles = () => {
    return src(["src/scss/*.scss", "src/scss/modules/*.scss"])
        .pipe(plumber())
        .pipe(concat("styles"))
        .pipe(scss({ outputStyle: "expanded" }))
        .pipe(
            autoprefixer({
                grid: true,
                cascade: true,
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
        .pipe(
            rename({
                extname: "",
            })
        )
        .pipe(dest(path.build.css));
};
exports.html = html;
exports.js = js;
exports.jsAll = jsAll;
exports.styles = styles;
exports.default = series(html, gulpServer);
