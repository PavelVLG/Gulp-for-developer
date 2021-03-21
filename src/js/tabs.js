(function ($) {
    "use strict";
    console.log("5");
    /***************Drag*******************/
    const drag = $("#drag-item");
    drag.on("dragstart", function (e) {
        // e.dataTransfer.setData("text/html", "dragstart");
        console.log("начали тащить: x = " + e.pageX + " ; y = " + e.pageY);
    });
    // drag.on("drag", function (e) {
    //     drag.css("background-color", "yellow");
    //     console.log("Бросили: x = " + e.pageX + " ; y = " + e.pageY);
    // });
    drag.on("dragend", function (e) {
        drag.css({
            position: "absolute",
            top: e.pageY + "px",
            left: e.pageX + "px",
        });
        console.log("Бросили: x = " + e.pageX);
    });

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
