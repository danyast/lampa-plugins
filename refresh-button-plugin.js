(function () {
    "use strict";
    
    // Функция добавления
    function add() {
        // Кнопка Перезагрузки
        var my_reload = '<div id="RELOAD" class="head__action selector" style="margin-left: 10px;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23 4v6h-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 20v-6h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>';
        // Кнопка Выхода
        var my_exit = '<div id="EXIT" class="head__action selector" style="margin-left: 10px;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="16,17 21,12 16,7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>';
        // Добавляем в верхнее меню
        $('#app > div.head > div > div.head__actions').append(my_reload);
        $('#app > div.head > div > div.head__actions').append(my_exit);
        
        // Обработчик клика
        $('#RELOAD').on('hover:enter hover:click hover:touch', function() {
            // Попробовать Lampa API
            try {
                if (typeof Lampa !== 'undefined' && Lampa.Listener && Lampa.Listener.emit) {
                    Lampa.Listener.emit('view', { type: 'refresh' });
                    return;
                }
            } catch (e) {}
            
            // Fallback: page reload
            location.reload();
        });
        
        // Показываем кнопку
        $('#RELOAD').removeClass('hide');
    }
            $('#EXIT').on('hover:enter hover:click hover:touch', function() {
            // Показываем уведомление
            Lampa.Noty.show('Выход из приложения...');
            
            // Задержка для показа уведомления
            setTimeout(function() {
                // Выход из приложения
                Lampa.Activity.out();
                
                // Платформо-зависимый выход
                if (Lampa.Platform.is('apple_tv')) {
                    window.location.assign('exit://exit');
                }
                if (Lampa.Platform.is('tizen')) {
                    tizen.application.getCurrentApplication().exit();
                }
                if (Lampa.Platform.is('webos')) {
                    window.close();
                }
                if (Lampa.Platform.is('android')) {
                    Lampa.Android.exit();
                }
                if (Lampa.Platform.is('orsay')) {
                    Lampa.Orsay.exit();
                }
                if (Lampa.Platform.is('nw')) {
                    nw.Window.get().close();
                }
            }, 1000);
        });
        
        // Показываем кнопку
        $('#EXIT').removeClass('hide');
    }
    
    // Если всё готово
    if(window.appready) {
        add();
    } else {
        Lampa.Listener.follow('app', function(e) {
            if(e.type == 'ready') {
                add();
            }
        });
    }
    
})();

