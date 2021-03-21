(function ($) {
    "use strict";
    /******************menuAdaptive**************/
    // const menu = $(".main-content");
    // const tabs = $(".tabs");
    // tabs.css({ display: "none" });
    // menu.on("click", function () {
    //     tabs.css({ display: "block" });
    // });
    /****************heade********************/
    const head = $("header");

    /****************heade********************/
    /***************Drag*******************/
    const drag = $("#drag-1");
    let corX;
    let corY;
    drag.on("dragstart", function (e) {
        // e.dataTransfer.setData("text/html", "dragstart");
        corX = e.offsetX;
        corY = e.offsetY;
        console.log("начали : x = " + e.pageX + " ; y = " + e.pageY);
    });
    drag.on("dragend", function (e) {
        let x = e.pageX - corX + "px";
        let y = e.pageY - corY + "px";
        drag.css({
            transform: translate(x, y),
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
    console.log("sos");
})(jQuery);
