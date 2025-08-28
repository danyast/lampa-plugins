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
        
        // Method 1: Try to trigger Lampa view refresh
        try {
            if (typeof Lampa !== 'undefined' && Lampa.Listener) {
                console.log('[TV Refresh] Using Lampa API...');
                
                // Force a view refresh by triggering navigation
                Lampa.Listener.follow('view', function(e) {
                    if (e.type === 'complite') {
                        console.log('[TV Refresh] View refreshed via Lampa');
                    }
                });
                
                // Try to refresh current view
                if (Lampa.Listener.emit) {
                    Lampa.Listener.emit('view', { type: 'refresh' });
                }
                
                return true;
            }
        } catch (e) {
            console.log('[TV Refresh] Lampa API failed:', e);
        }
        
        // Method 2: Try Android TV specific methods
        try {
            if (window.Android && window.Android.reload) {
                console.log('[TV Refresh] Using Android.reload()');
                window.Android.reload();
                return true;
            }
        } catch (e) {
            console.log('[TV Refresh] Android.reload failed:', e);
        }
        
        // Method 3: Try to reload via iframe if available
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
        
        // Method 4: Try to refresh via location hash
        try {
            const currentHash = window.location.hash;
            if (currentHash) {
                console.log('[TV Refresh] Refreshing via hash change...');
                window.location.hash = '';
                setTimeout(() => {
                    window.location.hash = currentHash;
                }, 100);
                return true;
            }
        } catch (e) {
            console.log('[TV Refresh] Hash refresh failed:', e);
        }
        
        // Method 5: Try to force DOM refresh
        try {
            console.log('[TV Refresh] Forcing DOM refresh...');
            
            // Remove and re-add body content
            const body = document.body;
            const originalContent = body.innerHTML;
            
            body.innerHTML = '';
            setTimeout(() => {
                body.innerHTML = originalContent;
                console.log('[TV Refresh] DOM refreshed');
            }, 100);
            
            return true;
        } catch (e) {
            console.log('[TV Refresh] DOM refresh failed:', e);
        }
        
        // Method 6: Try to use postMessage for refresh
        try {
            console.log('[TV Refresh] Using postMessage...');
            window.postMessage({ type: 'REFRESH_PAGE' }, '*');
            return true;
        } catch (e) {
            console.log('[TV Refresh] PostMessage failed:', e);
        }
        
        // Method 7: Try to dispatch custom refresh event
        try {
            console.log('[TV Refresh] Dispatching custom event...');
            const refreshEvent = new CustomEvent('tvRefresh', { 
                detail: { timestamp: Date.now() } 
            });
            window.dispatchEvent(refreshEvent);
            return true;
        } catch (e) {
            console.log('[TV Refresh] Custom event failed:', e);
        }
        
        // Method 8: Final fallback - try to restart the app view
        try {
            console.log('[TV Refresh] Trying app restart...');
            
            // Clear all intervals and timeouts
            const highestTimeoutId = setTimeout(";");
            for (let i = 0; i < highestTimeoutId; i++) {
                clearTimeout(i);
                clearInterval(i);
            }
            
            // Force a complete page reload
            document.location.href = document.location.href;
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
