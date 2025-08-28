// Main Menu Refresh 1
(function () {
    "use strict";

    Lampa.Lang.add({
        refresh_menu: {
            ru: "Обновить",
            en: "Refresh",
            uk: "Оновити",
            be: "Абнавіць",
            zh: "刷新",
            pt: "Atualizar",
            bg: "Обнови"
        }
    });

    function refresh_m(object) {
        this.create = function () { };
        this.build = function () { };
        this.start = function () { };
        this.pause = function () { };
        this.stop = function () { };
        this.render = function () { };
        this.destroy = function () { };
    }

    function add() {
        var ico = '<svg version="1.1" id="refresh" color="#fff" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><path fill="currentColor" d="M256,5.1c138.6,0,250.9,112.3,250.9,250.9S394.6,506.9,256,506.9S5.1,394.6,5.1,256S117.4,5.1,256,5.1z M256,40.1C136.7,40.1,40.1,136.7,40.1,256S136.7,471.9,256,471.9S471.9,375.3,471.9,256S375.3,40.1,256,40.1z M256,128c-70.7,0-128,57.3-128,128s57.3,128,128,128s128-57.3,128-128S326.7,128,256,128z M256,384c-70.7,0-128-57.3-128-128s57.3-128,128-128s128,57.3,128,128S326.7,384,256,384z"/><path fill="currentColor" d="M256,160c-53,0-96,43-96,96s43,96,96,96s96-43,96-96S309,160,256,160z M256,320c-35.3,0-64-28.7-64-64s28.7-64,64-64s64,28.7,64,64S291.3,320,256,320z"/><path fill="currentColor" d="M256,192c-35.3,0-64,28.7-64,64s28.7,64,64,64s64-28.7,64-64S291.3,192,256,192z M256,288c-17.7,0-32-14.3-32-32s14.3-32,32-32s32,14.3,32,32S273.7,288,256,288z"/></g></svg>';
        
        var menu_items = $(
            '<li class="menu__item selector" data-action="refresh_r"><div class="menu__ico">' +
            ico +
            '</div><div class="menu__text">' +
            Lampa.Lang.translate("refresh_menu") +
            "</div></li>"
        );

        menu_items.on("hover:enter", function () {
            // Анимация кнопки
            $(this).addClass('active');
            
            // Попробовать обновить через Lampa API
            try {
                if (Lampa.Listener && Lampa.Listener.emit) {
                    Lampa.Listener.emit('view', { type: 'refresh' });
                }
            } catch (e) {}
            
            // Попробовать обновить через navigation
            try {
                if (Lampa.Listener && Lampa.Listener.emit) {
                    Lampa.Listener.emit('navigate', { type: 'refresh' });
                }
            } catch (e) {}
            
            // Попробовать обновить через full event
            try {
                if (Lampa.Listener && Lampa.Listener.emit) {
                    Lampa.Listener.emit('full', { type: 'refresh' });
                }
            } catch (e) {}
            
            // Fallback: попробовать обновить страницу
            try {
                if (window.location && window.location.reload) {
                    window.location.reload();
                }
            } catch (e) {}
            
            // Убрать активное состояние через 1 секунду
            setTimeout(function() {
                $(this).removeClass('active');
            }.bind(this), 1000);
        });

        // Добавить в боковое меню
        $(".menu .menu__list").eq(1).append(menu_items);
    }

    function createRefreshMenu() {
        window.plugin_refresh_m_ready = true;
        Lampa.Component.add("refresh_m", refresh_m);
        
        if (window.appready) {
            add();
        } else {
            Lampa.Listener.follow("app", function (e) {
                if (e.type == "ready") add();
            });
        }
    }

    if (!window.plugin_refresh_m_ready) createRefreshMenu();
})();
