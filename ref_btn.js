/**
 * Lampa TV Auto Refresh Button 20
 * Автоматически добавляет кнопку обновления в интерфейс
 * Работает в TV приложениях без консоли
 */

(function() {
    'use strict';
    
    // Функция обновления
    function refreshLampa() {
        try {
            // Метод 1: Lampa API
            if (Lampa && Lampa.Listener && Lampa.Listener.emit) {
                Lampa.Listener.emit('view', { type: 'refresh' });
                return true;
            }
        } catch (e) {}
        
        try {
            // Метод 2: Page reload
            if (window.location && window.location.reload) {
                window.location.reload();
                return true;
            }
        } catch (e) {}
        
        return false;
    }
    
    // Создать кнопку обновления
    function createRefreshButton() {
        const button = document.createElement('div');
        button.innerHTML = '🔄';
        button.className = 'lampa-refresh-btn';
        button.title = 'Обновить';
        
        // Стили кнопки
        button.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 999999;
            background: #ff6b6b;
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(0,0,0,0.5);
            transition: all 0.3s ease;
            border: 2px solid #ff5252;
        `;
        
        // Hover эффекты
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.1)';
            button.style.background = '#ff5252';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
            button.style.background = '#ff6b6b';
        });
        
        // Клик
        button.addEventListener('click', () => {
            // Анимация
            button.style.transform = 'rotate(360deg) scale(1.2)';
            button.style.background = '#4caf50';
            
            // Обновление
            setTimeout(() => {
                refreshLampa();
            }, 300);
        });
        
        return button;
    }
    
    // Добавить кнопку в интерфейс
    function addButtonToInterface() {
        try {
            // Удалить существующую кнопку
            const existing = document.querySelector('.lampa-refresh-btn');
            if (existing) {
                existing.remove();
            }
            
            // Создать и добавить новую кнопку
            const button = createRefreshButton();
            document.body.appendChild(button);
            
            return true;
        } catch (e) {
            return false;
        }
    }
    
    // Попробовать добавить в меню Lampa
    function tryAddToMenu() {
        try {
            const selectors = [
                '.head__actions',
                '.head__action',
                '.view--header',
                '.view--navigation'
            ];
            
            for (const selector of selectors) {
                const menu = document.querySelector(selector);
                if (menu) {
                    // Проверить, нет ли уже кнопки
                    if (menu.querySelector('.lampa-refresh-btn')) {
                        return true;
                    }
                    
                    // Создать кнопку для меню
                    const menuButton = createRefreshButton();
                    menuButton.style.cssText = `
                        background: #ff6b6b;
                        color: white;
                        width: 40px;
                        height: 40px;
                        border-radius: 20px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 20px;
                        cursor: pointer;
                        margin-left: 10px;
                        transition: all 0.3s ease;
                        border: 2px solid #ff5252;
                    `;
                    
                    menu.appendChild(menuButton);
                    return true;
                }
            }
            
            // Если меню не найдено, добавить плавающую кнопку
            return addButtonToInterface();
            
        } catch (e) {
            return addButtonToInterface();
        }
    }
    
    // Инициализация
    function init() {
        // Попробовать сразу
        if (!tryAddToMenu()) {
            setTimeout(tryAddToMenu, 1000);
        }
        
        // Попробовать через задержки
        setTimeout(tryAddToMenu, 2000);
        setTimeout(tryAddToMenu, 5000);
        setTimeout(tryAddToMenu, 10000);
    }
    
    // Запустить
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Lampa события
    if (typeof Lampa !== 'undefined' && Lampa.Listener) {
        Lampa.Listener.follow('full', function(e) {
            if (e.type === 'complite') {
                setTimeout(tryAddToMenu, 200);
            }
        });
        
        Lampa.Listener.follow('view', function(e) {
            if (e.type === 'complite') {
                setTimeout(tryAddToMenu, 200);
            }
        });
    }
    
    // Периодическая проверка
    setInterval(() => {
        if (!document.querySelector('.lampa-refresh-btn')) {
            tryAddToMenu();
        }
    }, 15000);
    
})();
