/**
 * Lampa TV Auto Refresh Button 5.0
 * Автоматически добавляет кнопку обновления в интерфейс
 * Работает в TV приложениях без консоли
 */

// Auto Refresh Button - Автоматически создает кнопку
(function () {
    "use strict";
    
    console.log('🚀 Auto Refresh Button Starting...');
    
    // Функция создания кнопки
    function createRefreshButton() {
        // Создаем кнопку
        var button = document.createElement('div');
        button.innerHTML = '🔄';
        button.style.cssText = 'position:fixed;top:20px;right:20px;width:50px;height:50px;background:#ff6b6b;color:white;border-radius:25px;display:flex;align-items:center;justify-content:center;font-size:24px;cursor:pointer;box-shadow:0 4px 20px rgba(0,0,0,0.5);z-index:999999;transition:all 0.3s ease;';
        
        // Добавляем на страницу
        document.body.appendChild(button);
        
        // Обработчик клика
        button.onclick = function() {
            // Анимация клика
            button.style.transform = 'scale(1.2) rotate(360deg)';
            button.style.opacity = '0.7';
            
            // Обновление через 300ms
            setTimeout(function() {
                performRefresh();
            }, 300);
            
            // Сброс анимации через 1 секунду
            setTimeout(function() {
                button.style.transform = 'scale(1)';
                button.style.opacity = '1';
            }, 1000);
        };
        
        // Hover эффекты
        button.onmouseenter = function() {
            button.style.transform = 'scale(1.1)';
            button.style.opacity = '0.8';
        };
        
        button.onmouseleave = function() {
            button.style.transform = 'scale(1)';
            button.style.opacity = '1';
        };
        
        console.log('✅ Кнопка обновления создана');
        return button;
    }
    
    // Функция обновления
    function performRefresh() {
        console.log('🔄 Выполняем обновление...');
        
        // Метод 1: Lampa view refresh
        try {
            if (typeof Lampa !== 'undefined' && Lampa.Listener && Lampa.Listener.emit) {
                Lampa.Listener.emit('view', { type: 'refresh' });
                console.log('✅ Lampa view refresh отправлен');
                return;
            }
        } catch (e) {
            console.log('❌ Lampa view refresh ошибка:', e);
        }
        
        // Метод 2: Lampa navigation refresh
        try {
            if (typeof Lampa !== 'undefined' && Lampa.Listener && Lampa.Listener.emit) {
                Lampa.Listener.emit('navigate', { type: 'refresh' });
                console.log('✅ Lampa navigation refresh отправлен');
                return;
            }
        } catch (e) {
            console.log('❌ Lampa navigation refresh ошибка:', e);
        }
        
        // Метод 3: Lampa full refresh
        try {
            if (typeof Lampa !== 'undefined' && Lampa.Listener && Lampa.Listener.emit) {
                Lampa.Listener.emit('full', { type: 'refresh' });
                console.log('✅ Lampa full refresh отправлен');
                return;
            }
        } catch (e) {
            console.log('❌ Lampa full refresh ошибка:', e);
        }
        
        // Fallback: page reload
        try {
            if (window.location && window.location.reload) {
                console.log('🔄 Выполняем page reload...');
                window.location.reload();
            }
        } catch (e) {
            console.log('❌ Page reload ошибка:', e);
        }
    }
    
    // Функция инициализации
    function init() {
        // Ждем загрузки DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                setTimeout(createRefreshButton, 2000); // Ждем 2 секунды
            });
        } else {
            setTimeout(createRefreshButton, 2000); // Ждем 2 секунды
        }
        
        // Дополнительная проверка через 5 секунд
        setTimeout(function() {
            if (!document.querySelector('.refresh-button')) {
                createRefreshButton();
            }
        }, 5000);
        
        // Периодическая проверка каждые 10 секунд
        setInterval(function() {
            if (!document.querySelector('.refresh-button')) {
                createRefreshButton();
            }
        }, 10000);
    }
    
    // Запускаем инициализацию
    init();
    
    console.log('🚀 Auto Refresh Button Ready!');
    
})();
