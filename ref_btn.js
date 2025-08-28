//v3
(function(){
    function ReloadButtonPlugin(){
        this.run = function(){
            const wait = setInterval(() => {
                const header = document.querySelector('.head .head-actions, .head__actions');
                if(header){
                    clearInterval(wait);

                    if(header.querySelector('.tv-refresh-button')) return;

                    const btn = document.createElement('div');
                    btn.className = 'head-action tv-refresh-button selector';
                    btn.innerHTML = '<i class="icon icon-refresh"></i><span>Обновить</span>';
                    btn.style.cursor = 'pointer';

                    btn.addEventListener('click', () => {
                        console.log('[TV Refresh] Кнопка нажата, обновляем экран...');
                        if (typeof Lampa !== 'undefined' && Lampa.Activity) {
                            let current = Lampa.Activity.active();
                            if (current) {
                                // мягкое обновление текущего экрана
                                Lampa.Activity.replace(current.activity, current.object);
                                return;
                            }
                        }
                        // запасной вариант для веб-версии
                        window.location.reload();
                    });

                    header.appendChild(btn);
                }
            }, 500);
        };
    }

    // ожидание готовности Lampa перед регистрацией
    const waitLampa = setInterval(() => {
        if (typeof Lampa !== 'undefined' && Lampa.Plugin) {
            clearInterval(waitLampa);
            Lampa.Plugin.add({
                type: 'system',
                name: 'Reload Button',
                version: '1.0',
                author: 'Даниил',
                description: 'Добавляет кнопку для обновления текущего экрана Lampa',
                onload: function(){
                    new ReloadButtonPlugin().run();
                }
            });
        }
    }, 300);
})();
