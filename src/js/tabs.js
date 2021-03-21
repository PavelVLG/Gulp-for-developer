(function ($) {
    "use strict";
    console.log("2");
    /***************Drag*******************/
    $(function () {
        $("#draggable").draggable();
    });
    const aim = $("aim");
    $(aim).on('click', function(e) {

        console.log('Нажата кнопка: ' + e.target); //1 - левая кнопка, 2 - средняя кнопка, 3 - правая
        console.log('Координаты курсора: x = ' + e.pageX + ' ; y = ' + e.pageY);
      });
    console.log('aim');
    /***************Drag*******************/
    $.fn.tabs = function () {
        var $self = $(this);
        var $tabHeaders = $self
            .find(".js-tab-header")
            .filter(function (index, el) {
                return $(el).parentsUntil($self).length === 1;
            });
        var $tabContent = $self
            .find(".js-tab-content")
            .filter(function (index, el) {
                return $(el).parentsUntil($self).length === 1;
            });

        /**
         * Активация таба по его индексу
         * @param {Number} index - индекс таба, который нужно активировать
         */

        var selectTab = function (index) {
            $tabHeaders.removeClass("active").eq(index).addClass("active");
            $tabContent.removeClass("active").eq(index).addClass("active");
        };

        /**
         * Инициализаиця
         */
        var init = function () {
            selectTab(0);

            // Обработка событий
            $tabHeaders.on("click", function () {
                selectTab($(this).index());
            });
        };

        init();

        this.selectTab = selectTab;

        return this;
    };

    // Инициализируем табы на всех блоках с классом 'js-tabs'
    $(".js-tabs").each(function () {
        $(this).data("tabs", $(this).tabs());
    });
    console.log("pos");
})(jQuery);
