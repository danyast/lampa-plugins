/**
 * Lampa TV Native Refresh Plugin 19
 * Работает напрямую через Lampa API без DOM манипуляций
 * Специально для TV приложений
 */

(function() {
    'use strict';
    
    console.log('🔄 Lampa Native Refresh Plugin Starting...');
    
    // Проверяем доступность Lampa
    if (typeof Lampa === 'undefined') {
        console.error('❌ Lampa не доступна');
        return;
    }
    
    console.log('✅ Lampa доступна:', Lampa);
    
    // Функция обновления через Lampa API
    function refreshViaLampa() {
        console.log('🔄 Attempting refresh via Lampa API...');
        
        try {
            // Метод 1: Попробовать обновить текущий view
            if (Lampa.Listener && Lampa.Listener.emit) {
                console.log('🔄 Emitting view refresh event...');
                Lampa.Listener.emit('view', { type: 'refresh' });
                return true;
            }
        } catch (e) {
            console.log('❌ View refresh failed:', e);
        }
        
        try {
            // Метод 2: Попробовать обновить через navigation
            if (Lampa.Listener && Lampa.Listener.emit) {
                console.log('🔄 Emitting navigation refresh event...');
                Lampa.Listener.emit('navigate', { type: 'refresh' });
                return true;
            }
        } catch (e) {
            console.log('❌ Navigation refresh failed:', e);
        }
        
        try {
            // Метод 3: Попробовать обновить через full event
            if (Lampa.Listener && Lampa.Listener.emit) {
                console.log('🔄 Emitting full refresh event...');
                Lampa.Listener.emit('full', { type: 'refresh' });
                return true;
            }
        } catch (e) {
            console.log('❌ Full refresh failed:', e);
        }
        
        try {
            // Метод 4: Попробовать обновить через activity
            if (Lampa.Activity && Lampa.Activity.current) {
                console.log('🔄 Refreshing current activity...');
                const currentActivity = Lampa.Activity.current();
                if (currentActivity && currentActivity.render) {
                    currentActivity.render();
                    return true;
                }
            }
        } catch (e) {
            console.log('❌ Activity refresh failed:', e);
        }
        
        try {
            // Метод 5: Попробовать обновить через router
            if (Lampa.Router && Lampa.Router.refresh) {
                console.log('🔄 Using Lampa Router refresh...');
                Lampa.Router.refresh();
                return true;
            }
        } catch (e) {
            console.log('❌ Router refresh failed:', e);
        }
        
        try {
            // Метод 6: Попробовать обновить через storage
            if (Lampa.Storage && Lampa.Storage.clear) {
                console.log('🔄 Clearing Lampa storage...');
                Lampa.Storage.clear();
                return true;
            }
        } catch (e) {
            console.log('❌ Storage clear failed:', e);
        }
        
        console.log('❌ All Lampa API methods failed');
        return false;
    }
    
    // Функция принудительного обновления
    function forceRefresh() {
        console.log('🔄 Force refresh triggered...');
        
        try {
            // Попробовать Lampa API
            if (refreshViaLampa()) {
                console.log('✅ Refresh via Lampa API successful');
                return;
            }
        } catch (e) {
            console.log('❌ Lampa API refresh failed:', e);
        }
        
        try {
            // Fallback: попробовать обновить страницу
            console.log('🔄 Trying page reload fallback...');
            
            // Попробовать разные методы обновления
            if (window.location && window.location.reload) {
                window.location.reload();
            } else if (window.location && window.location.href) {
                window.location.href = window.location.href;
            } else if (window.history && window.history.go) {
                window.history.go(0);
            } else {
                console.log('❌ No refresh methods available');
            }
        } catch (e) {
            console.error('❌ All refresh methods failed:', e);
        }
    }
    
    // Слушаем события Lampa для автоматического обновления
    if (Lampa.Listener && Lampa.Listener.follow) {
        console.log('✅ Setting up Lampa event listeners...');
        
        // Слушаем завершение загрузки
        Lampa.Listener.follow('full', function(e) {
            if (e.type === 'complite') {
                console.log('🔄 Full load completed, refresh plugin ready');
            }
        });
        
        // Слушаем изменения view
        Lampa.Listener.follow('view', function(e) {
            if (e.type === 'complite') {
                console.log('🔄 View loaded, refresh plugin active');
            }
        });
        
        // Слушаем навигацию
        Lampa.Listener.follow('navigate', function(e) {
            console.log('🔄 Navigation event:', e);
        });
        
    } else {
        console.log('❌ Lampa.Listener not available');
    }
    
    // Добавляем глобальную функцию для обновления
    if (typeof window !== 'undefined') {
        window.lampaRefresh = function() {
            console.log('🔄 Global refresh function called');
            forceRefresh();
        };
        
        console.log('✅ Global refresh function added: window.lampaRefresh()');
    }
    
    // Добавляем в Lampa объект если возможно
    if (Lampa && typeof Lampa === 'object') {
        Lampa.refresh = function() {
            console.log('🔄 Lampa.refresh() called');
            forceRefresh();
        };
        
        console.log('✅ Lampa.refresh() function added');
    }
    
    console.log('🔄 Lampa Native Refresh Plugin Ready!');
    console.log('🔄 Use: window.lampaRefresh() or Lampa.refresh()');
    
})();
