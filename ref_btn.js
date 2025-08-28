// Basic Refresh Button 17 - Максимально простая версия
// Просто кнопка, которая перезагружает страницу

(function() {
    'use strict';
    
    console.log('🔄 Basic Refresh Button Starting...');
    
    // Создать простую кнопку
    function createBasicButton() {
        const button = document.createElement('button');
        button.innerHTML = '🔄';
        button.title = 'Refresh';
        button.style.cssText = `
            position: fixed;
            top: 50px;
            right: 50px;
            z-index: 999999;
            background: #ff0000;
            color: white;
            width: 80px;
            height: 80px;
            border: none;
            border-radius: 40px;
            font-size: 40px;
            cursor: pointer;
            box-shadow: 0 8px 30px rgba(0,0,0,0.5);
            transition: all 0.3s ease;
        `;
        
        // Клик - просто перезагрузить страницу
        button.addEventListener('click', function() {
            console.log('🔄 Button clicked - reloading page...');
            
            // Анимация
            button.style.transform = 'rotate(360deg) scale(1.5)';
            button.style.background = '#00ff00';
            
            // Перезагрузить через 500ms
            setTimeout(function() {
                try {
                    // Способ 1: reload()
                    window.location.reload();
                } catch (e) {
                    try {
                        // Способ 2: href
                        window.location.href = window.location.href;
                    } catch (e2) {
                        try {
                            // Способ 3: replace
                            window.location.replace(window.location.href);
                        } catch (e3) {
                            // Способ 4: history
                            if (window.history && window.history.go) {
                                window.history.go(0);
                            }
                        }
                    }
                }
            }, 500);
        });
        
        // Hover эффекты
        button.addEventListener('mouseenter', function() {
            button.style.transform = 'scale(1.2)';
            button.style.background = '#cc0000';
        });
        
        button.addEventListener('mouseleave', function() {
            button.style.transform = 'scale(1)';
            button.style.background = '#ff0000';
        });
        
        return button;
    }
    
    // Добавить кнопку на страницу
    function addBasicButton() {
        // Удалить существующую если есть
        const existing = document.querySelector('.basic-refresh-btn');
        if (existing) {
            existing.remove();
        }
        
        const button = createBasicButton();
        button.className = 'basic-refresh-btn';
        document.body.appendChild(button);
        
        console.log('✅ Basic refresh button added');
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
                    console.log('Found menu:', selector);
                    
                    // Проверить, нет ли уже кнопки
                    if (menu.querySelector('.basic-refresh-btn')) {
                        return;
                    }
                    
                    // Создать кнопку для меню
                    const menuButton = createBasicButton();
                    menuButton.style.cssText = `
                        background: #ff0000;
                        color: white;
                        width: 60px;
                        height: 60px;
                        border: none;
                        border-radius: 30px;
                        font-size: 30px;
                        cursor: pointer;
                        margin-left: 15px;
                        transition: all 0.3s ease;
                        box-shadow: 0 6px 20px rgba(0,0,0,0.4);
                    `;
                    
                    menu.appendChild(menuButton);
                    console.log('✅ Button added to menu:', selector);
                    return;
                }
            }
            
            // Если меню не найдено, добавить плавающую кнопку
            console.log('No menu found, adding floating button');
            addBasicButton();
            
        } catch (e) {
            console.error('Failed to add to menu:', e);
            addBasicButton();
        }
    }
    
    // Инициализация
    function init() {
        console.log('Initializing basic refresh plugin...');
        
        // Попробовать сразу
        tryAddToMenu();
        
        // Попробовать через задержки
        setTimeout(tryAddToMenu, 1000);
        setTimeout(tryAddToMenu, 3000);
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
        console.log('Lampa detected, adding listeners...');
        
        Lampa.Listener.follow('full', function(e) {
            if (e.type === 'complite') {
                setTimeout(tryAddToMenu, 300);
            }
        });
        
        Lampa.Listener.follow('view', function(e) {
            if (e.type === 'complite') {
                setTimeout(tryAddToMenu, 300);
            }
        });
        
    } else {
        console.log('Lampa not detected, using standalone mode');
    }
    
    // Периодическая проверка
    setInterval(function() {
        if (!document.querySelector('.basic-refresh-btn')) {
            tryAddToMenu();
        }
    }, 15000);
    
    console.log('🔄 Basic Refresh Button Ready!');
    
})();
