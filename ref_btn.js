// Exit Button Plugin - Кнопка выхода из приложения
(function () {
    "use strict";
    
    // Функция добавления
    function add() {
        // Кнопка Выхода
        var my_exit = '<div id="EXIT" class="head__action selector" style="margin-left: 10px;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="16,17 21,12 16,7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>';
        
        // Добавляем в верхнее меню
        $('#app > div.head > div > div.head__actions').append(my_exit);
        
        // Обработчик клика
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
        setTimeout(add, 2000); // Задержка 2 секунды
    } else {
        Lampa.Listener.follow('app', function(e) {
            if(e.type == 'ready') {
                setTimeout(add, 100); // Задержка 2 секунды
            }
        });
    }
    
})();
