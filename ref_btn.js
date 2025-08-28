//v5
function r(){
    console.log('[TV Refresh] Starting refresh...');
    try {
        if (typeof Lampa !== 'undefined') {
            // 1. Мягкое обновление через активити
            if (Lampa.Activity && Lampa.Activity.active) {
                let current = Lampa.Activity.active();
                if (current) {
                    console.log('[TV Refresh] Using Lampa.Activity.replace');
                    Lampa.Activity.replace(current.activity, current.object);
                    return true;
                }
            }
            // 2. Через стандартный эвент (если кто-то его слушает)
            if (Lampa.Listener && Lampa.Listener.emit) {
                console.log('[TV Refresh] Emitting view refresh event');
                Lampa.Listener.emit('view', { type: 'refresh' });
                return true;
            }
        }
    } catch (e) {
        console.warn('[TV Refresh] Lampa API refresh failed:', e);
    }

    // 3. Android API
    try {
        if (window.Android && window.Android.reload) {
            console.log('[TV Refresh] Using Android.reload()');
            window.Android.reload();
            return true;
        }
    } catch (e) {
        console.warn('[TV Refresh] Android.reload failed:', e);
    }

    // 4. Жёсткая перезагрузка
    try {
        console.log('[TV Refresh] Using location.reload()');
        location.reload();
        return true;
    } catch (e) {
        console.error('[TV Refresh] location.reload failed:', e);
    }

    console.error('[TV Refresh] All refresh methods failed');
    return false;
}
