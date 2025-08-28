//v2
(function(){
    function ReloadButtonPlugin(){
        this.run = function(){
            const wait = setInterval(() => {
                const header = document.querySelector('.head .head-actions');
                if(header){
                    clearInterval(wait);

                    const btn = document.createElement('div');
                    btn.className = 'head-action';
                    btn.innerHTML = '<i class="icon icon-refresh"></i><span>Обновить</span>';
                    btn.style.cursor = 'pointer';

                    btn.addEventListener('click', () => {
                        window.location.reload();
                    });

                    header.appendChild(btn);
                }
            }, 500);
        };
    }

    Lampa.Plugin.add({
        type: 'system',
        name: 'Reload Button',
        version: '1.0',
        author: 'Даниил',
        description: 'Добавляет кнопку для обновления интерфейса',
        onload: function(){
            new ReloadButtonPlugin().run();
        }
    });
})();
