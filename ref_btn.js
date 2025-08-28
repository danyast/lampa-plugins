//v10
/**
 * Lampa TV Refresh Button Plugin - TV App Version
 * Specialized for Android TV applications
 */

(function() {
    'use strict';
    
    const PLUGIN_CONFIG = {
        name: 'TV Refresh Button Plugin',
        version: '1.0.0',
        author: 'Plugin Developer',
        description: 'TV app optimized refresh button'
    };
    
    // TV-specific refresh methods
    function performTVRefresh() {
        console.log('[TV Refresh] Attempting TV-specific refresh...');
        
        // Принудительная перезагрузка через iframe
        try {
            console.log('[TV Refresh] Using forced iframe reload method');
            
            // Создаем скрытый iframe для перезагрузки
            const reloadFrame = document.createElement('iframe');
            reloadFrame.style.cssText = 'position:absolute;width:1px;height:1px;opacity:0;pointer-events:none;';
            reloadFrame.onload = function() {
                // После загрузки iframe, перезагружаем основное окно
                console.log('[TV Refresh] Iframe loaded, forcing main window reload');
                
                // Сохраняем текущий URL
                const currentUrl = window.location.href;
                
                // Добавляем случайный параметр для обхода кэша
                const cacheBuster = Date.now();
                const separator = currentUrl.indexOf('?') !== -1 ? '&' : '?';
                const newUrl = currentUrl + separator + '_reload=' + cacheBuster;
                
                // Заменяем текущий URL на новый с параметром перезагрузки
                window.location.replace(newUrl);
                
                // Если replace не сработал, пробуем прямую перезагрузку
                setTimeout(() => {
                    window.location.href = newUrl;
                }, 100);
            };
            
            // Загружаем пустую страницу в iframe
            document.body.appendChild(reloadFrame);
            reloadFrame.src = 'about:blank';
            
            return true;
        } catch (e) {
            console.log('[TV Refresh] Forced iframe reload failed:', e);
        }
        
        // Метод 1: Прямая перезагрузка через location
        try {
            console.log('[TV Refresh] Using direct location.reload()');
            
            // Отключаем все обработчики событий beforeunload
            window.onbeforeunload = null;
            
            // Пытаемся отключить все слушатели событий, которые могут блокировать перезагрузку
            const oldPushState = history.pushState;
            history.pushState = function() {};
            
            // Принудительная перезагрузка
            window.location.reload(true);
            
            // Восстанавливаем pushState
            setTimeout(() => {
                history.pushState = oldPushState;
            }, 100);
            
            return true;
        } catch (e) {
            console.log('[TV Refresh] Direct reload failed:', e);
        }
        
        // Метод 2: Использование Lampa API
        try {
            if (typeof Lampa !== 'undefined') {
                console.log('[TV Refresh] Using Lampa API...');
                
                // Попытка перезагрузить текущую активность
                if (Lampa.Activity) {
                    if (typeof Lampa.Activity.active === 'object' && Lampa.Activity.active) {
                        console.log('[TV Refresh] Reloading current activity');
                        
                        // Сохраняем текущую активность
                        const currentActivity = Lampa.Activity.active;
                        
                        // Пытаемся перезагрузить активность
                        if (typeof currentActivity.refresh === 'function') {
                            currentActivity.refresh();
                            return true;
                        }
                        
                        // Пытаемся перезапустить активность
                        if (typeof currentActivity.start === 'function') {
                            currentActivity.start();
                            return true;
                        }
                        
                        // Пытаемся перезагрузить через destroy и повторный запуск
                        if (typeof currentActivity.destroy === 'function' && 
                            typeof currentActivity.create === 'function') {
                            currentActivity.destroy();
                            setTimeout(() => {
                                currentActivity.create();
                            }, 100);
                            return true;
                        }
                    }
                    
                    // Общий метод обновления активности
                    if (typeof Lampa.Activity.refresh === 'function') {
                        console.log('[TV Refresh] Using Lampa.Activity.refresh()');
                        Lampa.Activity.refresh();
                        return true;
                    }
                }
                
                // Попытка использовать Controller
                if (Lampa.Controller) {
                    if (typeof Lampa.Controller.toggle === 'function') {
                        console.log('[TV Refresh] Using Lampa.Controller.toggle()');
                        Lampa.Controller.toggle('refresh');
                        return true;
                    }
                    
                    // Попытка перезагрузить через сброс и повторную активацию контроллера
                    if (typeof Lampa.Controller.clear === 'function' && 
                        typeof Lampa.Controller.enable === 'function') {
                        console.log('[TV Refresh] Resetting and re-enabling controller');
                        Lampa.Controller.clear();
                        setTimeout(() => {
                            Lampa.Controller.enable();
                        }, 100);
                        return true;
                    }
                }
                
                // Попытка использовать Listener
                if (Lampa.Listener && Lampa.Listener.emit) {
                    console.log('[TV Refresh] Using Lampa.Listener.emit()');
                    
                    // Отправляем все возможные события обновления
                    ['refresh', 'update', 'reload', 'reset'].forEach(event => {
                        Lampa.Listener.emit(event);
                        Lampa.Listener.emit('view', { type: event });
                        Lampa.Listener.emit('activity', { type: event });
                    });
                    
                    return true;
                }
                
                // Попытка использовать Storage для сброса кэша
                if (Lampa.Storage && typeof Lampa.Storage.set === 'function') {
                    console.log('[TV Refresh] Resetting cache via Storage');
                    Lampa.Storage.set('cache_index', {});
                    Lampa.Storage.set('cache_view', {});
                    
                    // Перезагрузка после сброса кэша
                    if (Lampa.Activity && typeof Lampa.Activity.refresh === 'function') {
                        setTimeout(() => {
                            Lampa.Activity.refresh();
                        }, 100);
                        return true;
                    }
                }
            }
        } catch (e) {
            console.log('[TV Refresh] Lampa API failed:', e);
        }
        
        // Метод 3: Android TV и WebView методы
        try {
            // Android методы
            if (window.Android) {
                const androidMethods = ['reload', 'refreshPage', 'refresh', 'restartApp', 'reloadWebView'];
                
                for (const method of androidMethods) {
                    if (typeof window.Android[method] === 'function') {
                        console.log(`[TV Refresh] Using Android.${method}()`);
                        window.Android[method]();
                        return true;
                    }
                }
            }
            
            // WebView методы
            if (window.WebView) {
                const webviewMethods = ['reload', 'refresh', 'restart'];
                
                for (const method of webviewMethods) {
                    if (typeof window.WebView[method] === 'function') {
                        console.log(`[TV Refresh] Using WebView.${method}()`);
                        window.WebView[method]();
                        return true;
                    }
                }
            }
        } catch (e) {
            console.log('[TV Refresh] Android/WebView methods failed:', e);
        }
        
        // Метод 4: Перезагрузка через динамический скрипт
        try {
            console.log('[TV Refresh] Trying dynamic script reload');
            
            // Создаем и выполняем скрипт перезагрузки
            const reloadScript = document.createElement('script');
            reloadScript.textContent = `
                (function() {
                    // Отключаем все обработчики, которые могут блокировать перезагрузку
                    window.onbeforeunload = null;
                    
                    // Пытаемся разными способами перезагрузить страницу
                    try {
                        window.location.reload(true);
                    } catch(e) {
                        try {
                            window.location.href = window.location.href + '?_reload=' + Date.now();
                        } catch(e2) {
                            document.location.href = document.location.href;
                        }
                    }
                })();
            `;
            
            document.head.appendChild(reloadScript);
            document.head.removeChild(reloadScript);
            
            return true;
        } catch (e) {
            console.log('[TV Refresh] Dynamic script reload failed:', e);
        }
        
        // Метод 5: Полная перезагрузка DOM
        try {
            console.log('[TV Refresh] Forcing complete DOM refresh...');
            
            // Сохраняем важные объекты
            const savedLampa = window.Lampa;
            
            // Сохраняем текущее состояние скролла
            const scrollX = window.scrollX;
            const scrollY = window.scrollY;
            
            // Сохраняем все скрипты
            const scripts = Array.from(document.scripts).map(script => {
                return {
                    src: script.src,
                    text: script.text,
                    type: script.type
                };
            });
            
            // Полностью очищаем DOM
            const html = document.documentElement.outerHTML;
            document.open();
            document.write(html);
            document.close();
            
            // Восстанавливаем скролл
            window.scrollTo(scrollX, scrollY);
            
            // Восстанавливаем Lampa если была
            if (savedLampa && !window.Lampa) {
                window.Lampa = savedLampa;
            }
            
            console.log('[TV Refresh] DOM completely refreshed');
            return true;
        } catch (e) {
            console.log('[TV Refresh] Complete DOM refresh failed:', e);
        }
        
        // Метод 6: Экстренная перезагрузка через location.replace
        try {
            console.log('[TV Refresh] Emergency reload via location.replace');
            
            // Добавляем случайный параметр для обхода кэша
            const currentUrl = window.location.href;
            const cacheBuster = Date.now();
            const separator = currentUrl.indexOf('?') !== -1 ? '&' : '?';
            const newUrl = currentUrl + separator + '_emergency_reload=' + cacheBuster;
            
            // Используем replace для замены текущей записи в истории
            window.location.replace(newUrl);
            
            return true;
        } catch (e) {
            console.error('[TV Refresh] All methods failed:', e);
            return false;
        }
    }
    
    // Create TV-optimized button
    function createTVButton() {
        const button = document.createElement('div');
        button.className = 'head__action selector tv-refresh-button';
        button.innerHTML = `
            <svg width="25" height="23" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 4v6h-6" stroke="currentColor" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1 20v-6h6" stroke="currentColor" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" stroke="currentColor" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
        
        // Add TV-specific hover effects
        button.addEventListener('mouseenter', () => {
            button.style.opacity = '0.8';
            button.style.transform = 'scale(1.1)';
            button.style.filter = 'brightness(1.2)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.opacity = '1';
            button.style.transform = 'scale(1)';
            button.style.filter = 'brightness(1)';
        });
        
        // Add click functionality with visual feedback
        button.addEventListener('click', () => {
            console.log('[TV Refresh] Button clicked, starting refresh sequence...');
            
            // Visual feedback
            button.style.transform = 'rotate(360deg) scale(1.2)';
            button.style.transition = 'all 0.8s ease';
            button.style.filter = 'brightness(1.5)';
            
            // Try to refresh
            setTimeout(() => {
                const success = performTVRefresh();
                
                if (success) {
                    // Success feedback
                    button.style.background = 'rgba(0, 255, 0, 0.3)';
                    button.style.filter = 'brightness(1.3)';
                    console.log('[TV Refresh] Refresh initiated successfully');
                } else {
                    // Error feedback
                    button.style.background = 'rgba(255, 0, 0, 0.5)';
                    button.style.filter = 'brightness(0.8)';
                    console.error('[TV Refresh] All refresh methods failed');
                    
                    // Show error message
                    try {
                        if (typeof alert !== 'undefined') {
                            alert('Обновление не удалось. Попробуйте перезапустить приложение.');
                        }
                    } catch (e) {
                        console.error('Cannot show alert:', e);
                    }
                }
                
                // Reset button state after delay
                setTimeout(() => {
                    button.style.background = '';
                    button.style.filter = 'brightness(1)';
                    button.style.transform = 'scale(1)';
                }, 2000);
            }, 800);
        });
        
        return button;
    }
    
    // Inject button into TV interface
    function injectTVButton() {
        try {
            const selectors = [
                '.head__actions',
                '.head__action',
                '.view--header',
                '.view--navigation'
            ];
            
            let target = null;
            let selector = '';
            
            for (const sel of selectors) {
                const element = document.querySelector(sel);
                if (element) {
                    target = element;
                    selector = sel;
                    break;
                }
            }
            
            if (!target) {
                console.log('[TV Refresh] No target found, using fallback');
                return injectFallbackButton();
            }
            
            if (target.querySelector('.tv-refresh-button')) {
                return true;
            }
            
            const button = createTVButton();
            target.appendChild(button);
            
            console.log(`[${PLUGIN_CONFIG.name}] TV button injected into ${selector}`);
            return true;
            
        } catch (error) {
            console.error('[TV Refresh] Injection failed:', error);
            return injectFallbackButton();
        }
    }
    
    // Fallback injection
    function injectFallbackButton() {
        try {
            const existingButton = document.querySelector('.tv-refresh-button');
            if (existingButton) return;
            
            const button = createTVButton();
            button.style.cssText = `
                position: fixed;
                top: 30px;
                right: 30px;
                z-index: 9999;
                background: rgba(0, 0, 0, 0.9);
                border-radius: 10px;
                padding: 15px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
            `;
            
            document.body.appendChild(button);
            console.log('[TV Refresh] Fallback button injected');
            return true;
            
        } catch (error) {
            console.error('[TV Refresh] Fallback failed:', error);
            return false;
        }
    }
    
    // Initialize TV plugin
    function initTVPlugin() {
        console.log(`[${PLUGIN_CONFIG.name}] Initializing TV plugin...`);
        
        // Try immediate injection
        if (!injectTVButton()) {
            setTimeout(injectTVButton, 1000);
        }
        
        // Also try after delays
        setTimeout(injectTVButton, 2000);
        setTimeout(injectTVButton, 5000);
    }
    
    // Listen for TV-specific events
    if (typeof Lampa !== 'undefined' && Lampa.Listener) {
        Lampa.Listener.follow('full', function(e) {
            if (e.type === 'complite') {
                setTimeout(injectTVButton, 200);
            }
        });
        
        Lampa.Listener.follow('view', function(e) {
            if (e.type === 'complite') {
                setTimeout(injectTVButton, 200);
            }
        });
        
        console.log('[TV Refresh] Lampa listeners attached');
        
    } else {
        console.log('[TV Refresh] Lampa not available, using fallback');
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initTVPlugin);
        } else {
            initTVPlugin();
        }
    }
    
    // Periodic injection check
    setInterval(() => {
        if (!document.querySelector('.tv-refresh-button')) {
            injectTVButton();
        }
    }, 10000);
    
    // Listen for postMessage refresh requests
    window.addEventListener('message', function(event) {
        if (event.data && event.data.type === 'REFRESH_PAGE') {
            console.log('[TV Refresh] Received refresh request via postMessage');
            performTVRefresh();
        }
    });
    
    // Listen for custom refresh events
    window.addEventListener('tvRefresh', function(event) {
        console.log('[TV Refresh] Received custom refresh event');
        performTVRefresh();
    });
    
})();
