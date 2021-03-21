# Тестовое задание

Наши повседневные задачи чаще всего заключаются в доработках уже существующих проектов, поэтому тестовое задание мы сделали похожим на такую задачу.

Представьте, что вам нужно в одном из проектов внести несколько правок, но есть один неприятный момент - в наличии только исходники, из которых собирался проект, и полностью отсутствует система сборки.

## Суть задания

-   Вам нужно настроить систему сборки в соответствии со схемой размещения ресурсов в проекте (указана ниже);
-   Сборка должна запускаться командой `npm start`;
-   Проект должен корректно работать во всех современных браузерах, а также в IE 11;
-   Результатом выполнения тестового задания должна быть ссылка на ваш репозиторий, с настроенной системой сборки и всеми изменениями в соответствии с заданием.

## Этапы выполнения тестового задания

1. **Создать форк этого репозитория в своем аккаунте на GitLab**;
2. **Настроить систему сборки** (любую, например [Gulp](https://gulpjs.com/) или [Webpack](https://webpack.js.org/)) **в соответствии со следующей схемой**:
    - В папке `src/` содержатся исходники:
        - `src/index.html` - страница с тестовым контентом.
        - `src/scss/` - исходники стилей;
        - `src/js/` - исходники скриптов;
    - В папку `dist/` помещаются результаты сборки:
        - `dist/index.html` - скопированная из `src/` страница.
        - `dist/css/styles.min.css` - собранный файл стилей;
          \*\*\* `dist/css/styles.min.css.map` - sourcemap для собранного файла стилей;
        - `dist/js/scripts.min.js` - собранный файл скриптов (за исключением сторонних библиотек/плагинов);
          \*\*\* `dist/js/scripts.min.js.map` - sourcemap для собранного файла скриптов;
        - `dist/js/vendor.min.js` - собранный файл со сторонними библиотеками/плагинами
    - Система сборки, за исключением папки `node_modules`, должна находиться в репозитории вместе с проектом.
3. **Внести следующие изменения**:
    - Футер должен быть прибит к низу окна, если контента мало;
    - Сайдбар должен быть всегда дотянут до футера;
    - При прокрутке, шапка страницы должна фиксироваться вверху окна, при этом высота шапки должна плавно уменьшиться до 70 пикселей;
    - При любой ширине экрана, шапка должна адекватно отображаться (перестраиваться, если необходимо);
    - При ширине экрана менее 768 пикселей, табы должны превращаться в выпадающий список;
        - Заголовок активного таба должен отображаться в качестве выбранного пункта списка;
        - Желательно реализовать анимацию открытия/закрытия списка;
    - Добавить таб с блоком, внутри которого должно находиться изображение (любое, на ваше усмотрение), превышающее этот блок по размерам;
        - У блока должен быть установлен `overflow: hidden`;
        - Нужен механизм перетаскивания изображения в пределах блока, чтобы увидеть скрытые части картинки;
          `эту задачу мне не удлось решить, либо вне блока картинка перетаскивалась, или так как сейчас`
    - Добавить ещё один таб с блоком, внутри которого должно находиться изображение (любое, на ваше усмотрение), превышающее этот блок по размерам;
        - У блока должен быть установлен `overflow: hidden`;
        - Нужен механизм плавного перемещения изображения по наведению мышкой в пределах блока, чтобы увидеть скрытые части картинки (Навели в правую часть контейнера - увидели правую часть изображения).

## Проверка задания

Проверка задания проходит следующим образом:

-   Клонируется репозиторий с выполненным заданием
-   В папке проекта выполняются команды `npm install`, `npm start`
-   Собранный проект оценивается на соответствие нашему списку критериев, а также на оптимальность реализации задания (с точки зрения проверяющего)
