/**
 * Simple Lampa TV Refresh Button 14
 * Минималистичная версия для максимальной совместимости
 */

(function() {
    'use strict';
    
    console.log('=== Simple Refresh Plugin Starting ===');
    
    // Простая функция обновления
    function simpleRefresh() {
        console.log('🔄 Simple refresh triggered');
        
        // Метод 1: Попробовать перейти на ту же страницу
        try {
            const currentUrl = window.location.href;
            console.log('Current URL:', currentUrl);
            
            // Если есть хеш, попробовать его обновить
            if (window.location.hash) {
                const hash = window.location.hash;
                console.log('Refreshing hash:', hash);
                window.location.hash = '';
                setTimeout(() => {
                    window.location.hash = hash;
                }, 100);
                return;
            }
            
            // Иначе попробовать перезагрузить страницу
            console.log('Reloading page...');
            window.location.reload();
            
        } catch (e) {
            console.error('Refresh failed:', e);
        }
    }
    
    // Создать простую кнопку
    function createButton() {
        const button = document.createElement('div');
        button.innerHTML = '🔄';
        button.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 99999;
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
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
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
            console.log('Button clicked!');
            button.style.transform = 'rotate(360deg) scale(1.2)';
            button.style.background = '#4caf50';
            
            setTimeout(() => {
                simpleRefresh();
            }, 500);
        });
        
        return button;
    }
    
    // Добавить кнопку на страницу
    function addButton() {
        // Удалить существующую кнопку если есть
        const existing = document.querySelector('.simple-refresh-btn');
        if (existing) {
            existing.remove();
        }
        
        const button = createButton();
        button.className = 'simple-refresh-btn';
        document.body.appendChild(button);
        
        console.log('✅ Simple refresh button added');
    }
    
    // Попробовать добавить кнопку в меню Lampa
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
                    console.log('Found menu:', selector);
                    
                    // Проверить, нет ли уже кнопки
                    if (menu.querySelector('.simple-refresh-btn')) {
                        return;
                    }
                    
                    // Создать кнопку для меню
                    const menuButton = createButton();
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
                    `;
                    
                    menu.appendChild(menuButton);
                    console.log('✅ Button added to menu:', selector);
                    return;
                }
            }
            
            // Если меню не найдено, добавить плавающую кнопку
            console.log('No menu found, adding floating button');
            addButton();
            
        } catch (e) {
            console.error('Failed to add to menu:', e);
            addButton();
        }
    }
    
    // Инициализация
    function init() {
        console.log('Initializing simple refresh plugin...');
        
        // Попробовать сразу
        tryAddToMenu();
        
        // Попробовать через задержки
        setTimeout(tryAddToMenu, 1000);
        setTimeout(tryAddToMenu, 3000);
        setTimeout(tryAddToMenu, 5000);
    }
    
    // Запустить
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Также попробовать через Lampa события
    if (typeof Lampa !== 'undefined' && Lampa.Listener) {
        console.log('Lampa detected, adding listeners...');
        
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
        
    } else {
        console.log('Lampa not detected, using fallback mode');
    }
    
    // Периодическая проверка
    setInterval(() => {
        if (!document.querySelector('.simple-refresh-btn')) {
            tryAddToMenu();
        }
    }, 10000);
    
})();
