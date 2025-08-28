// Basic Test Script - Проверяем работает ли JavaScript вообще 18
// Простой тест для диагностики проблем

(function() {
    'use strict';
    
    console.log('🧪 Basic Test Script Starting...');
    
    // Тест 1: Простой alert
    try {
        alert('JavaScript работает! Если видишь это сообщение - JS включен.');
        console.log('✅ Alert работает');
    } catch (e) {
        console.error('❌ Alert не работает:', e);
    }
    
    // Тест 2: Создать простой элемент
    try {
        const testDiv = document.createElement('div');
        testDiv.innerHTML = 'TEST DIV';
        testDiv.style.cssText = `
            position: fixed;
            top: 200px;
            left: 200px;
            background: red;
            color: white;
            padding: 20px;
            font-size: 24px;
            z-index: 999999;
        `;
        
        document.body.appendChild(testDiv);
        console.log('✅ Test div создан и добавлен');
        
        // Удалить через 5 секунд
        setTimeout(() => {
            if (testDiv.parentNode) {
                testDiv.parentNode.removeChild(testDiv);
                console.log('✅ Test div удален');
            }
        }, 5000);
        
    } catch (e) {
        console.error('❌ Не удалось создать test div:', e);
    }
    
    // Тест 3: Проверить Lampa
    try {
        if (typeof Lampa !== 'undefined') {
            console.log('✅ Lampa доступна:', Lampa);
            if (Lampa.Listener) {
                console.log('✅ Lampa.Listener доступен');
            } else {
                console.log('❌ Lampa.Listener недоступен');
            }
        } else {
            console.log('❌ Lampa недоступна');
        }
    } catch (e) {
        console.error('❌ Ошибка при проверке Lampa:', e);
    }
    
    // Тест 4: Проверить DOM элементы
    try {
        const selectors = [
            '.head__actions',
            '.head__action',
            '.view--header',
            '.view--navigation',
            'body',
            'html'
        ];
        
        console.log('🔍 Проверяем DOM элементы:');
        selectors.forEach(selector => {
            try {
                const element = document.querySelector(selector);
                if (element) {
                    console.log(`✅ Найден: ${selector}`);
                    console.log('  - Tag:', element.tagName);
                    console.log('  - Classes:', element.className);
                    console.log('  - Children:', element.children.length);
                } else {
                    console.log(`❌ Не найден: ${selector}`);
                }
            } catch (e) {
                console.error(`❌ Ошибка при поиске ${selector}:`, e);
            }
        });
        
    } catch (e) {
        console.error('❌ Ошибка при проверке DOM:', e);
    }
    
    // Тест 5: Простая кнопка без сложной логики
    try {
        const simpleButton = document.createElement('button');
        simpleButton.textContent = 'TEST BUTTON';
        simpleButton.style.cssText = `
            position: fixed;
            top: 300px;
            left: 200px;
            background: blue;
            color: white;
            padding: 15px;
            font-size: 18px;
            border: none;
            border-radius: 5px;
            z-index: 999999;
        `;
        
        // Простой обработчик
        simpleButton.onclick = function() {
            console.log('🎯 Test button clicked!');
            this.style.background = 'green';
            alert('Кнопка работает!');
        };
        
        document.body.appendChild(simpleButton);
        console.log('✅ Test button создан и добавлен');
        
        // Удалить через 10 секунд
        setTimeout(() => {
            if (simpleButton.parentNode) {
                simpleButton.parentNode.removeChild(simpleButton);
                console.log('✅ Test button удален');
            }
        }, 10000);
        
    } catch (e) {
        console.error('❌ Не удалось создать test button:', e);
    }
    
    console.log('🧪 Basic Test Script завершен. Проверь консоль для результатов.');
    
})();
