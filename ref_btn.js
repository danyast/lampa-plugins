// Top Menu Only Refresh - ТОЛЬКО в верхнем меню 6
(function () {
    "use strict";
    
    // Функция добавления в верхнее меню
    function addToTopMenu() {
        // Ищем верхнее меню
        var topMenu = document.querySelector('.head__actions');
        
        if (!topMenu) {
            console.log('❌ Верхнее меню не найдено');
            return false;
        }
        
        // Проверяем, нет ли уже кнопки
        if (topMenu.querySelector('.refresh-top-btn')) {
            console.log('✅ Кнопка уже добавлена');
            return true;
        }
        
        // Создаем кнопку для верхнего меню
        var button = document.createElement('div');
        button.className = 'head__action selector refresh-top-btn';
        button.innerHTML = '🔄';
        button.title = 'Обновить';
        
        // Добавляем в верхнее меню
        topMenu.appendChild(button);
        
        // Обработчик клика
        button.onclick = function() {
            // Анимация
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
        
        console.log('✅ Кнопка добавлена в верхнее меню');
        return true;
    }
    
    // Функция обновления
    function performRefresh() {
        // Метод 1: Lampa view refresh
        try {
            if (typeof Lampa !== 'undefined' && Lampa.Listener && Lampa.Listener.emit) {
                Lampa.Listener.emit('view', { type: 'refresh' });
                return;
            }
        } catch (e) {}
        
        // Метод 2: Lampa navigation refresh
        try {
            if (typeof Lampa !== 'undefined' && Lampa.Listener && Lampa.Listener.emit) {
                Lampa.Listener.emit('navigate', { type: 'refresh' });
                return;
            }
        } catch (e) {}
        
        // Метод 3: Lampa full refresh
        try {
            if (typeof Lampa !== 'undefined' && Lampa.Listener && Lampa.Listener.emit) {
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
    
    // Функция инициализации
    function init() {
        // Ждем загрузки DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                setTimeout(addToTopMenu, 1000);
            });
        } else {
            setTimeout(addToTopMenu, 1000);
        }
        
        // Дополнительные попытки
        setTimeout(addToTopMenu, 3000);
        setTimeout(addToTopMenu, 5000);
        
        // Периодическая проверка каждые 15 секунд
        setInterval(function() {
            if (!document.querySelector('.refresh-top-btn')) {
                addToTopMenu();
            }
        }, 15000);
    }
    
    // Запускаем
    init();
    
})();
