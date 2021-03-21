(function ($) {
    "use strict";

    /***************UI******************/

    $( function() {
        $( "#draggable" ).draggable();
      } );
    /******************menuAdaptive**************/

    // $(".main-content").on("click", function () {
    //     $(".tabs").css({ display: "block" });
    // });

    /****************header********************/
    const head = $("header");

    /***************Drag*******************/
    const drag = $("#drag-1");
    let corX;
    let corY;
    drag.on("dragstart", function (e) {
        corX = e.offsetX;
        corY = e.offsetY;
    });
    drag.on("drag", function (e) {
        let y = e.pageY - corY + "px";
        drag.css({
            transform: `translateY(${y}) `,
        });
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
})(jQuery);
