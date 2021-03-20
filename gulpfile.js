const { src, dest, series, watch, parallel } = require("gulp");
const scss = require("gulp-sass");
const csso = require("gulp-csso");
const include = require("gulp-file-include");
const htmlmin = require("gulp-htmlmin");
const del = require("del");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const sync = require("browser-sync").create();
const uglify = require("gulp-uglify-es");
const wait = require("gulp-wait");
const plumber = require("gulp-plumber");
const sourcemaps = require("gulp-sourcemaps");

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
const server = () => {
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
const styles = () => {
    return src(["src/scss/*.scss", "src/scss/modules/*.scss"])
        .pipe(concat("min.css"))
        .pipe(autoprefixer({}))
        .pipe(dest(path.build.css));
};
exports.html = html;
exports.styles = styles;
exports.default = series(html, server);
