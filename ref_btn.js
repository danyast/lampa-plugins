// v11
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
        
        // Метод 0: Прямое обращение к нативному коду через eval
        try {
            console.log('[TV Refresh] Trying direct native code access');
            
            // Попытка найти нативные методы перезагрузки
            const nativeCode = `
                try {
                    if (typeof nw !== 'undefined' && nw.App) {
                        nw.App.quit();
                        return true;
                    }
                    
                    if (typeof window.external !== 'undefined') {
                        if (typeof window.external.Refresh === 'function') {
                            window.external.Refresh();
                            return true;
                        }
                        if (typeof window.external.refresh === 'function') {
                            window.external.refresh();
                            return true;
                        }
                    }
                    
                    if (typeof AndroidFunction !== 'undefined') {
                        if (typeof AndroidFunction.restartApp === 'function') {
                            AndroidFunction.restartApp();
                            return true;
                        }
                    }
                    
                    if (typeof app !== 'undefined') {
                        if (typeof app.reload === 'function') {
                            app.reload();
                            return true;
                        }
                        if (typeof app.restart === 'function') {
                            app.restart();
                            return true;
                        }
                    }
                    
                    return false;
                } catch(e) {
                    console.error('[TV Refresh] Native code error:', e);
                    return false;
                }
            `;
            
            const nativeResult = eval(nativeCode);
            if (nativeResult === true) {
                return true;
            }
        } catch (e) {
            console.log('[TV Refresh] Native code access failed:', e);
        }
        
        // Метод 1: Принудительная перезагрузка через Lampa API
        try {
            if (typeof Lampa !== 'undefined') {
                console.log('[TV Refresh] Using direct Lampa API access');
                
                // Полная перезагрузка приложения
                if (typeof Lampa.Application !== 'undefined') {
                    // Попытка перезапустить приложение
                    if (typeof Lampa.Application.restart === 'function') {
                        console.log('[TV Refresh] Using Lampa.Application.restart()');
                        Lampa.Application.restart();
                        return true;
                    }
                    
                    // Попытка перезагрузить приложение
                    if (typeof Lampa.Application.reload === 'function') {
                        console.log('[TV Refresh] Using Lampa.Application.reload()');
                        Lampa.Application.reload();
                        return true;
                    }
                }
                
                // Перезагрузка через сброс всех компонентов
                console.log('[TV Refresh] Trying complete Lampa reset');
                
                // Сохраняем текущее состояние
                const currentActivity = Lampa.Activity && Lampa.Activity.active ? Lampa.Activity.active : null;
                const currentPage = Lampa.Activity && Lampa.Activity.active ? Lampa.Activity.active.currentPage : null;
                
                // Сбрасываем все кэши
                if (Lampa.Storage && typeof Lampa.Storage.set === 'function') {
                    console.log('[TV Refresh] Clearing all caches');
                    
                    // Очищаем все возможные кэши
                    const cachesToClear = [
                        'cache_index', 'cache_view', 'torrents', 'file_view', 
                        'search_history', 'card_view', 'card_cache'
                    ];
                    
                    cachesToClear.forEach(cache => {
                        try {
                            Lampa.Storage.set(cache, {});
                        } catch (e) {
                            console.log(`[TV Refresh] Failed to clear cache: ${cache}`);
                        }
                    });
                }
                
                // Перезапускаем все компоненты
                if (Lampa.Controller) {
                    if (typeof Lampa.Controller.destroy === 'function') {
                        console.log('[TV Refresh] Destroying controller');
                        Lampa.Controller.destroy();
                    }
                    
                    if (typeof Lampa.Controller.enable === 'function') {
                        setTimeout(() => {
                            console.log('[TV Refresh] Re-enabling controller');
                            Lampa.Controller.enable();
                        }, 100);
                    }
                }
                
                // Перезапускаем текущую активность
                if (currentActivity) {
                    console.log('[TV Refresh] Restarting current activity');
                    
                    if (typeof currentActivity.destroy === 'function') {
                        currentActivity.destroy();
                    }
                    
                    setTimeout(() => {
                        if (typeof currentActivity.create === 'function') {
                            currentActivity.create();
                        }
                        
                        if (currentPage && typeof currentActivity.showPage === 'function') {
                            currentActivity.showPage(currentPage);
                        }
                    }, 200);
                    
                    return true;
                }
                
                // Отправляем все возможные события обновления
                if (Lampa.Listener && Lampa.Listener.emit) {
                    console.log('[TV Refresh] Broadcasting all refresh events');
                    
                    ['refresh', 'update', 'reload', 'reset', 'restart'].forEach(event => {
                        Lampa.Listener.emit(event);
                        Lampa.Listener.emit('view', { type: event });
                        Lampa.Listener.emit('activity', { type: event });
                        Lampa.Listener.emit('app', { type: event });
                        Lampa.Listener.emit('interface', { type: event });
                    });
                    
                    return true;
                }
            }
        } catch (e) {
            console.log('[TV Refresh] Lampa API reset failed:', e);
        }
        
        // Метод 2: Прямая перезагрузка через location с обходом всех блокировок
        try {
            console.log('[TV Refresh] Using aggressive location.reload()');
            
            // Отключаем все возможные блокировки перезагрузки
            window.onbeforeunload = null;
            window.onunload = null;
            
            // Отключаем все обработчики событий, которые могут блокировать перезагрузку
            const events = ['beforeunload', 'unload', 'pagehide', 'visibilitychange'];
            events.forEach(event => {
                window.removeEventListener(event, null, true);
                window.removeEventListener(event, null, false);
            });
            
            // Сохраняем оригинальные методы
            const originalReload = window.location.reload;
            const originalReplace = window.location.replace;
            const originalAssign = window.location.assign;
            const originalHref = Object.getOwnPropertyDescriptor(window.location, 'href');
            
            // Принудительная перезагрузка через все возможные методы
            try {
                // Метод 1: Прямая перезагрузка
                window.location.reload(true);
            } catch (e) {
                console.log('[TV Refresh] Direct reload failed, trying alternatives');
                
                try {
                    // Метод 2: Через assign
                    const url = window.location.href;
                    const cacheBuster = Date.now();
                    const separator = url.indexOf('?') !== -1 ? '&' : '?';
                    const newUrl = url + separator + '_reload=' + cacheBuster;
                    window.location.assign(newUrl);
                } catch (e2) {
                    console.log('[TV Refresh] Assign failed, trying replace');
                    
                    try {
                        // Метод 3: Через replace
                        window.location.replace(newUrl);
                    } catch (e3) {
                        console.log('[TV Refresh] Replace failed, trying href');
                        
                        try {
                            // Метод 4: Прямая установка href
                            window.location.href = newUrl;
                        } catch (e4) {
                            console.log('[TV Refresh] All location methods failed');
                        }
                    }
                }
            }
            
            return true;
        } catch (e) {
            console.log('[TV Refresh] Aggressive reload failed:', e);
        }
        
        // Метод 3: Полная перезагрузка через Android/WebView
        try {
            console.log('[TV Refresh] Trying all Android/WebView methods');
            
            // Android методы
            const androidObjects = ['Android', 'android', 'AndroidApp', 'AndroidTV', 'AndroidFunction', 'WebApp'];
            const androidMethods = ['reload', 'refreshPage', 'refresh', 'restartApp', 'reloadWebView', 'restart', 'reloadApp'];
            
            for (const obj of androidObjects) {
                if (window[obj]) {
                    for (const method of androidMethods) {
                        if (typeof window[obj][method] === 'function') {
                            console.log(`[TV Refresh] Using ${obj}.${method}()`);
                            window[obj][method]();
                            return true;
                        }
                    }
                }
            }
            
            // WebView методы
            const webviewObjects = ['WebView', 'webview', 'WebApp', 'WebViewApp', 'TVWebView'];
            const webviewMethods = ['reload', 'refresh', 'restart', 'reloadPage', 'refreshPage'];
            
            for (const obj of webviewObjects) {
                if (window[obj]) {
                    for (const method of webviewMethods) {
                        if (typeof window[obj][method] === 'function') {
                            console.log(`[TV Refresh] Using ${obj}.${method}()`);
                            window[obj][method]();
                            return true;
                        }
                    }
                }
            }
        } catch (e) {
            console.log('[TV Refresh] Android/WebView methods failed:', e);
        }
        
        // Метод 4: Экстремальная перезагрузка DOM
        try {
            console.log('[TV Refresh] Forcing extreme DOM refresh...');
            
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
            
            // Полностью очищаем DOM и перезагружаем все скрипты
            document.open();
            document.write('<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body></body></html>');
            document.close();
            
            // Восстанавливаем скрипты
            scripts.forEach(script => {
                if (script.src) {
                    const newScript = document.createElement('script');
                    newScript.src = script.src;
                    newScript.type = script.type || 'text/javascript';
                    document.head.appendChild(newScript);
                } else if (script.text) {
                    const newScript = document.createElement('script');
                    newScript.text = script.text;
                    newScript.type = script.type || 'text/javascript';
                    document.head.appendChild(newScript);
                }
            });
            
            // Восстанавливаем Lampa если была
            if (savedLampa) {
                window.Lampa = savedLampa;
                
                // Пытаемся перезапустить Lampa
                if (typeof window.Lampa.init === 'function') {
                    setTimeout(() => {
                        window.Lampa.init();
                    }, 500);
                }
            }
            
            console.log('[TV Refresh] DOM extremely refreshed');
            return true;
        } catch (e) {
            console.log('[TV Refresh] Extreme DOM refresh failed:', e);
        }
        
        // Метод 5: Последняя надежда - перезагрузка через iframe
        try {
            console.log('[TV Refresh] Last resort: iframe reload');
            
            // Создаем скрытый iframe для перезагрузки
            const reloadFrame = document.createElement('iframe');
            reloadFrame.style.cssText = 'position:absolute;width:100%;height:100%;top:0;left:0;z-index:9999;border:none;';
            reloadFrame.onload = function() {
                console.log('[TV Refresh] Iframe loaded, replacing current window');
                
                // Заменяем текущее окно содержимым iframe
                try {
                    const iframeDoc = reloadFrame.contentDocument || reloadFrame.contentWindow.document;
                    const iframeContent = iframeDoc.documentElement.outerHTML;
                    
                    document.open();
                    document.write(iframeContent);
                    document.close();
                    
                    console.log('[TV Refresh] Window replaced with iframe content');
                } catch (e) {
                    console.log('[TV Refresh] Failed to replace window:', e);
                }
            };
            
            // Загружаем текущую страницу в iframe с параметром для обхода кэша
            const currentUrl = window.location.href;
            const cacheBuster = Date.now();
            const separator = currentUrl.indexOf('?') !== -1 ? '&' : '?';
            const newUrl = currentUrl + separator + '_iframe_reload=' + cacheBuster;
            
            document.body.appendChild(reloadFrame);
            reloadFrame.src = newUrl;
            
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
