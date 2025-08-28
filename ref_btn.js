// Working Refresh Button - Рабочая реализация 1
(function () {
    "use strict";
    
    // Функция добавления
    function add() {
        // Кнопка Перезагрузки
        var my_reload = '<div id="RELOAD" class="head__action selector" style="margin-left: 10px;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23 4v6h-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 20v-6h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>';
        
        // Добавляем в верхнее меню
        $('#app > div.head > div > div.head__actions').append(my_reload);
        
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
