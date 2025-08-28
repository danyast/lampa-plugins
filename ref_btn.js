(function(){
    function ReloadButtonPlugin(){
        this.run = function(){
            // Ждём, пока загрузится интерфейс
            const waitForHeader = setInterval(() => {
                const header = document.querySelector('.head');
                if(header){
                    clearInterval(waitForHeader);

                    // Создаём кнопку
                    const btn = document.createElement('div');
                    btn.classList.add('head-action');
                    btn.innerHTML = '<i class="icon icon-refresh"></i><span>Обновить</span>';
                    btn.style.cursor = 'pointer';

                    // Обработчик нажатия
                    btn.addEventListener('click', () => {
                        location.reload();
                    });

                    // Добавляем в шапку
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
