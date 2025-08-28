// Ultra Simple Lampa Refresh - Только функции 4.0
(function () {
    "use strict";
    
    // Проверяем что Lampa доступна
    if (typeof Lampa === 'undefined') {
        console.error('Lampa не найдена');
        return;
    }
    
    // Функция обновления
    function refresh() {
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
    
    // Добавляем функцию глобально
    window.refresh = refresh;
    window.lampaRefresh = refresh;
    
    // Добавляем в Lampa объект
    if (Lampa && typeof Lampa === 'object') {
        Lampa.refresh = refresh;
    }
    
    console.log('✅ Refresh функции добавлены: refresh(), lampaRefresh(), Lampa.refresh()');
})();
