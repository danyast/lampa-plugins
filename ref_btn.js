// Top Menu Refresh Button 2.0
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

    function addToTopMenu() {
        // Иконка обновления
        var ico = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23 4v6h-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 20v-6h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        
        // Создаем кнопку для верхнего меню
        var topButton = $(
            '<div class="head__action selector refresh-top-btn" data-action="refresh_top">' +
            ico +
            '</div>'
        );

        // Стили для кнопки
        topButton.css({
            'display': 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            'width': '40px',
            'height': '40px',
            'margin-left': '10px',
            'cursor': 'pointer',
            'transition': 'all 0.3s ease'
        });

        // Hover эффекты
        topButton.on("mouseenter", function () {
            $(this).css({
                'transform': 'scale(1.1)',
                'opacity': '0.8'
            });
        });

        topButton.on("mouseleave", function () {
            $(this).css({
                'transform': 'scale(1)',
                'opacity': '1'
            });
        });

        // Клик
        topButton.on("click", function () {
            // Анимация клика
            $(this).css({
                'transform': 'rotate(360deg) scale(1.2)',
                'opacity': '0.6'
            });

            // Обновление через 300ms
            setTimeout(function() {
                refreshLampa();
            }, 300);

            // Сброс анимации через 1 секунду
            setTimeout(function() {
                $(this).css({
                    'transform': 'scale(1)',
                    'opacity': '1'
                });
            }.bind(this), 1000);
        });

        // Функция обновления
        function refreshLampa() {
            // Метод 1: Lampa view refresh
            try {
                if (Lampa.Listener && Lampa.Listener.emit) {
                    Lampa.Listener.emit('view', { type: 'refresh' });
                    return;
                }
            } catch (e) {}
            
            // Метод 2: Lampa navigation refresh
            try {
                if (Lampa.Listener && Lampa.Listener.emit) {
                    Lampa.Listener.emit('navigate', { type: 'refresh' });
                    return;
                }
            } catch (e) {}
            
            // Метод 3: Lampa full refresh
            try {
                if (Lampa.Listener && Lampa.Listener.emit) {
                    Lampa.Listener.emit('full', { type: 'refresh' });
                    return;
                }
            } catch (e) {}
            
            // Fallback: page reload
            try {
                if (window.location && window.location.reload) {
                    window.location.reload();
                }
            } catch (e) {}
        }

        // Попробовать добавить в разные верхние меню
        var topMenuSelectors = [
            '.head__actions',
            '.head__action',
            '.view--header',
            '.view--navigation',
            '.header .menu',
            '.top-menu',
            '.upper-menu'
        ];

        var added = false;
        for (var i = 0; i < topMenuSelectors.length; i++) {
            var topMenu = $(topMenuSelectors[i]);
            if (topMenu.length > 0) {
                // Проверить, нет ли уже кнопки
                if (topMenu.find('.refresh-top-btn').length === 0) {
                    topMenu.append(topButton);
                    added = true;
                    break;
                }
            }
        }

        // Если не удалось добавить в верхнее меню, добавить как плавающую кнопку
        if (!added) {
            topButton.css({
                'position': 'fixed',
                'top': '20px',
                'right': '20px',
                'z-index': '999999',
                'background': '#ff6b6b',
                'color': 'white',
                'border-radius': '20px',
                'box-shadow': '0 4px 20px rgba(0,0,0,0.5)'
            });
            $('body').append(topButton);
        }
    }

    function createTopRefreshMenu() {
        window.plugin_refresh_top_ready = true;
        Lampa.Component.add("refresh_top", refresh_top);
        
        if (window.appready) {
            addToTopMenu();
        } else {
            Lampa.Listener.follow("app", function (e) {
                if (e.type == "ready") addToTopMenu();
            });
        }
    }

    if (!window.plugin_refresh_top_ready) createTopRefreshMenu();
})();
