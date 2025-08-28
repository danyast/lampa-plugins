//v9

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
        
        // Method 1: Direct location reload (наиболее эффективный метод)
        try {
            console.log('[TV Refresh] Using direct location.reload()');
            window.location.reload(true); // true = принудительная перезагрузка без кэша
            return true;
        } catch (e) {
            console.log('[TV Refresh] Direct reload failed:', e);
        }
        
        // Method 2: Try to trigger Lampa view refresh
        try {
            if (typeof Lampa !== 'undefined') {
                console.log('[TV Refresh] Using Lampa API...');
                
                // Попытка использовать внутренние методы Lampa
                if (Lampa.Activity && typeof Lampa.Activity.refresh === 'function') {
                    console.log('[TV Refresh] Using Lampa.Activity.refresh()');
                    Lampa.Activity.refresh();
                    return true;
                }
                
                // Попытка использовать Controller
                if (Lampa.Controller && typeof Lampa.Controller.toggle === 'function') {
                    console.log('[TV Refresh] Using Lampa.Controller.toggle()');
                    Lampa.Controller.toggle('refresh');
                    return true;
                }
                
                // Попытка использовать Listener
                if (Lampa.Listener && Lampa.Listener.emit) {
                    console.log('[TV Refresh] Using Lampa.Listener.emit()');
                    Lampa.Listener.emit('refresh');
                    Lampa.Listener.emit('view', { type: 'refresh' });
                    Lampa.Listener.emit('activity', { type: 'refresh' });
                    return true;
                }
            }
        } catch (e) {
            console.log('[TV Refresh] Lampa API failed:', e);
        }
        
        // Method 3: Try Android TV specific methods
        try {
            if (window.Android) {
                if (typeof window.Android.reload === 'function') {
                    console.log('[TV Refresh] Using Android.reload()');
                    window.Android.reload();
                    return true;
                }
                
                if (typeof window.Android.refreshPage === 'function') {
                    console.log('[TV Refresh] Using Android.refreshPage()');
                    window.Android.refreshPage();
                    return true;
                }
            }
        } catch (e) {
            console.log('[TV Refresh] Android methods failed:', e);
        }
        
        // Method 4: Try WebView refresh methods
        try {
            if (window.WebView && typeof window.WebView.reload === 'function') {
                console.log('[TV Refresh] Using WebView.reload()');
                window.WebView.reload();
                return true;
            }
        } catch (e) {
            console.log('[TV Refresh] WebView reload failed:', e);
        }
        
        // Method 5: Try to reload via iframe if available
        try {
            const iframes = document.querySelectorAll('iframe');
            if (iframes.length > 0) {
                console.log('[TV Refresh] Reloading iframes...');
                iframes.forEach(iframe => {
                    if (iframe.src) {
                        iframe.src = iframe.src;
                    }
                });
                return true;
            }
        } catch (e) {
            console.log('[TV Refresh] Iframe reload failed:', e);
        }
        
        // Method 6: Try to refresh via location hash
        try {
            const currentHash = window.location.hash;
            console.log('[TV Refresh] Refreshing via hash change...');
            window.location.hash = currentHash ? '' : '#refresh';
            setTimeout(() => {
                window.location.hash = currentHash || '';
            }, 100);
            return true;
        } catch (e) {
            console.log('[TV Refresh] Hash refresh failed:', e);
        }
        
        // Method 7: Try to force DOM refresh
        try {
            console.log('[TV Refresh] Forcing DOM refresh...');
            
            // Сохраняем текущее состояние скролла
            const scrollX = window.scrollX;
            const scrollY = window.scrollY;
            
            // Remove and re-add body content
            const body = document.body;
            const originalContent = body.innerHTML;
            
            body.innerHTML = '';
            setTimeout(() => {
                body.innerHTML = originalContent;
                
                // Восстанавливаем скролл
                window.scrollTo(scrollX, scrollY);
                
                console.log('[TV Refresh] DOM refreshed');
                
                // Попытка восстановить обработчики событий
                if (typeof Lampa !== 'undefined' && Lampa.Controller) {
                    if (typeof Lampa.Controller.enable === 'function') {
                        Lampa.Controller.enable();
                    }
                }
            }, 100);
            
            return true;
        } catch (e) {
            console.log('[TV Refresh] DOM refresh failed:', e);
        }
        
        // Method 8: Try to use history API
        try {
            console.log('[TV Refresh] Using history API...');
            const currentUrl = window.location.href;
            history.pushState({}, '', currentUrl + '?refresh=' + Date.now());
            history.go(0); // Перезагрузка текущей страницы
            return true;
        } catch (e) {
            console.log('[TV Refresh] History API failed:', e);
        }
        
        // Method 9: Final fallback - try to restart the app view
        try {
            console.log('[TV Refresh] Trying app restart...');
            
            // Clear all intervals and timeouts
            const highestTimeoutId = setTimeout(";");
            for (let i = 0; i < highestTimeoutId; i++) {
                clearTimeout(i);
                clearInterval(i);
            }
            
            // Force a complete page reload with cache bypass
            const currentLocation = window.location.href;
            const separator = currentLocation.indexOf('?') !== -1 ? '&' : '?';
            const newLocation = currentLocation + separator + '_refresh=' + Date.now();
            window.location.href = newLocation;
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
