# Описание Gulp

## запуск "npm i" затем "npm start". Должен запустится локальый сервер и в середине окна браузера должна быть надпись "Hello world"

    - В папке `src/` содержатся исходники:
        - `src/index.html` - страница с тестовым контентом.
        - `src/scss/` - исходники стилей;
        - `src/js/` - исходники скриптов;
        - src/ source / файлы библиотек, картинок и других ресурсов.
    - В папку `dist/` помещаются результаты сборки:
         - локальный сервер запускается командой start, через порт 3000, из этой папки.
         html:
        - `dist/index.html` - сжатый и скопированные из `src/` HTML документы "cloud".
        css:
        - `dist/css/styles.min.css` - сжатый,собранный файл стилей;
        - `dist/css/styles.min.css.map` - sourcemap для собранного файла стилей;
        js:
        - `dist/js/scripts.min.js` - собранный файл скриптов (за исключением сторонних библиотек/плагинов);
         - `dist/js/scripts.min.js.map` - sourcemap для собранного файла скриптов;
        js Плагины, библиотеки.
        - `dist/js/vendor.min.js` - собранный файл со сторонними библиотеками/плагинами
    - Cкрипты.
        - npm start - собирает dist и запускает проект
        - gulp clean - удаляет папку dist.

PS Система сборки, за исключением папки `node_modules`, находится в репозитории вместе с проектом, так же там должены находится файлы editorconfig с прописанием правил кодирования и gitignor.
