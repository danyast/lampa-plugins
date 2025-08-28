// Top Menu Refresh - Exact Copy of Exit Plugin Structure 3.0
(function () {
    "use strict";

    Lampa.Lang.add({
        refresh_top: {
            ru: "Обновить",
            en: "Refresh",
            uk: "Оновити",
            be: "Абнавіць",
            zh: "刷新",
            pt: "Atualizar",
            bg: "Обнови"
        }
    });

    function refresh_top(object) {
        this.create = function () { };
        this.build = function () { };
        this.start = function () { };
        this.pause = function () { };
        this.stop = function () { };
        this.render = function () { };
        this.destroy = function () { };
    }

    function add() {
        var ico = '🔄';
        
        // Создаем кнопку для верхнего меню (точно как в exit плагине)
        var topButton = $(
            '<div class="head__action selector refresh-top-btn" data-action="refresh_top">' +
            ico +
            '</div>'
        );

        // Добавляем в верхнее меню
        var topMenu = $('.head__actions');
        if (topMenu.length > 0) {
            // Проверить, нет ли уже кнопки
            if (topMenu.find('.refresh-top-btn').length === 0) {
                topMenu.append(topButton);
            }
        } else {
            // Если верхнее меню не найдено, добавить как плавающую кнопку
            topButton.css({
                'position': 'fixed',
                'top': '20px',
                'right': '20px',
                'z-index': '999999',
                'background': '#ff6b6b',
                'color': 'white',
                'width': '50px',
                'height': '50px',
                'border-radius': '25px',
                'display': 'flex',
                'align-items': 'center',
                'justify-content': 'center',
                'font-size': '24px',
                'cursor': 'pointer',
                'box-shadow': '0 4px 20px rgba(0,0,0,0.5)'
            });
            $('body').append(topButton);
        }

        // Обработчик клика (точно как в exit плагине)
        topButton.on("click", function () {
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
        });
    }

    function createTopRefreshMenu() {
        window.plugin_refresh_top_ready = true;
        Lampa.Component.add("refresh_top", refresh_top);
        if (window.appready) add();
        else {
            Lampa.Listener.follow("app", function (e) {
                if (e.type == "ready") add();
            });
        }
    }

    if (!window.plugin_refresh_top_ready) createTopRefreshMenu();
})();
