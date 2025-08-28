//v4
(function(){
    function createButton(){
        const btn = document.createElement('div');
        btn.className = 'head-action tv-refresh-button selector';
        btn.innerHTML = '<i class="icon icon-refresh"></i><span>Обновить</span>';
        btn.style.cursor = 'pointer';

        btn.addEventListener('click', () => {
            console.log('[TV Refresh] Нажали кнопку — обновляем экран');
            try {
                if (typeof Lampa !== 'undefined' && Lampa.Activity) {
                    let current = Lampa.Activity.active();
                    if (current) {
                        Lampa.Activity.replace(current.activity, current.object);
                        return;
                    }
                }
                window.location.reload();
            } catch(e) {
                console.error(e);
                window.location.reload();
            }
        });

        return btn;
    }

    function injectButton(){
        const selectors = ['.head__actions', '.head .head-actions', '.view--header', '.view--navigation'];
        let container = null;

        for (const sel of selectors){
            const el = document.querySelector(sel);
            if (el) { container = el; break; }
        }

        if (!container) return false;
        if (container.querySelector('.tv-refresh-button')) return true;

        container.appendChild(createButton());
        console.log('[TV Refresh] Кнопка вставлена в', container);
        return true;
    }

    // пробуем вставить сразу и потом через интервалы
    const tryInject = setInterval(() => {
        if (injectButton()) {
            clearInterval(tryInject);
        }
    }, 500);

    // на случай, если шапка перерисовалась
    setInterval(() => {
        injectButton();
    }, 5000);
})();
