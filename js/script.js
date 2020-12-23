// Видео youtube для страницы
// В html выглядит так
// <div class="video__wrapper js_youtube" id="Y2uDpiHRz2Q">
// 	<img src="img/путь_к_фоновому изображению" alt="" class="video__prev">
// </div>


console.log('script is run');
$(function () {

    // Проверяем наличие элемента с классом js_youtube
    if ($(".js_youtube")) {
    	// Перебираем все элементы js_youtube
        $(".js_youtube").each(function () {
            // Зная идентификатор видео на YouTube, легко можно найти его миниатюру и вывести фоном
            // $(this).css('background-image', 'url(http://i.ytimg.com/vi/' + this.id + '/sddefault.jpg)');
            // $(this).css('background-image', 'img/prev_video.jpg');

            // Добавляем иконку Play поверх миниатюры, чтобы было похоже на видеоплеер
            $(this).append($('<img src="img/play.svg" alt="Play" class="video__play">'));

        });

        // При клике на картинку-превьюшку или кнопку play
        $('.video__play, .video__prev').on('click', function () {
        	// Получаем ID youtube видео
            var videoId = $(this).closest('.js_youtube').attr('id');
            // создаем iframe со включенной опцией autoplay
            var iframe_url = "https://www.youtube.com/embed/" + videoId + "?autoplay=1&autohide=1";
            // Можно завести data-атрибуты для доп параметров. не обязательно.
            if ($(this).data('params')) iframe_url += '&' + $(this).data('params');

            // Высота и ширина iframe должны быть такими же, как и у родительского блока
            var iframe = $('<iframe/>', {
                'frameborder': '0',
                'src': iframe_url,
                'allow': 'autoplay'
            });

            // Выводим HTML5 плеер с YouTube поверх превьюшек
            $(this).closest('.video__wrapper').append(iframe);

        });
    }

});

// отправка и проверка формы + модальное окно
function send(event, php){
    //тут мы получаем id элемента по вызванному событию, а потом кормим Jquery, чтобы получить нужный элемент
// let idForm = '#'+event.target.id;
// console.log(idForm);
//
// // console.log($(cName));
// showLoader($(idForm), true);
    showLoader($('.eightSection'));
        // подготавливаем модальное окно с сообщением
        let modal = $('#info'),
            message = modal.find('.form__message');

        modal.on('hidden.bs.modal', function (e) {
            message.html('');
        });
        console.log(modal);
        // event.preventDefault ? event.preventDefault() : event.returnValue = false;
        if (event.preventDefault) {
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
        var req = new XMLHttpRequest();
        req.open('POST', php, true);
        req.onload = function() {
        	if (req.status >= 200 && req.status < 400) {
        	json = JSON.parse(this.response); // Ебанный internet explorer 11
            	console.log(json);

            	// ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
            	if (json.result == "success") {
            		// Если сообщение отправлено
            		// alert("Сообщение отправлено");
                    // Пример с открытием окна
                    // hideLoader($(idForm),true);
                    hideLoader($('.eightSection'));
                    modal.modal('show');
                    message.html('Your message has been submitted successfully. <br> I will contact you soon.');
            	} else {
            		// Если произошла ошибка
            		// alert("Ошибка. Сообщение не отправлено");
                    // Пример с открытием окна
                    // hideLoader($(idForm),true);
                    hideLoader($('.eightSection'));
                    modal.modal('show');
                    message.html('Error. Your message has not been submitted ');
            	}
            // Если не удалось связаться с php файлом
            // } else {alert("Ошибка сервера. Номер: "+req.status);}};
            } else {

                // hideLoader($(idForm),true);
                hideLoader($('.eightSection'));

                 modal.modal('show'); message.html('Error on server. Number: '+req.status);}};

        // Если не удалось отправить запрос. Стоит блок на хостинге
        // req.onerror = function() {alert("Ошибка отправки запроса");};
        req.onerror = function() {
            // hideLoader($(idForm),true);
            hideLoader($('.eightSection'));

             modal.modal('show'); message.html('Request sending error');};
        console.log(event.target);
        // console.log($('#form').submit());
        req.send(new FormData(event.target));
        // req.send(new FormData($('#form')));
    // }

}

// Scroll to ID // Плавный скролл к элементу при нажатии на ссылку. В ссылке указываем ID элемента
$('a[href^="#"]').click( function(e){
    e.preventDefault();
    console.log("work");
	var scroll_el = $(this).attr('href');
	if ($(scroll_el).length != 0) {
	$('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);
	}
	return false;
});

replaceElement($('.firstScreen__left').children('img'),$('.firstScreen__left'),$('.firstScreen__title'),768);
// Показать лоадер при загрузке товаров
function showLoader(el) {
    // el.addClass('loaded');
    // el.append('<div class="loader" />');
    // console.log('show is run');
    el.addClass('loadingio-spinner-blocks-a76og8p27y7');
    el.append(`<div class="ldio-pef4zo238oc">
        <div style='left:38px;top:38px;animation-delay:0s'></div>
        <div style='left:80px;top:38px;animation-delay:0.125s'></div>
        <div style='left:122px;top:38px;animation-delay:0.25s'></div>
        <div style='left:38px;top:80px;animation-delay:0.875s'></div>
        <div style='left:122px;top:80px;animation-delay:0.375s'></div>
        <div style='left:38px;top:122px;animation-delay:0.75s'></div>
        <div style='left:80px;top:122px;animation-delay:0.625s'></div>
        <div style='left:122px;top:122px;animation-delay:0.5s'></div>
    </div>`);
}

// Скрыть лоадер при загрузке товаров
function hideLoader(el, time = 10) {
    console.log('hide is run');
    setTimeout(function () {
        el.removeClass('loadingio-spinner-blocks-a76og8p27y7');
        $('.ldio-pef4zo238oc').remove();
    }, time);
}

function replaceElement(element, placeForDesctop, placeForMobile, width){

      let resized = false;

      let el = element, pd= placeForDesctop, pm = placeForMobile;
      $(window).resize(function(event) {
          let currentWidth = $(window).width()+scrollbarWidth();

          // Запрещаем выполнение скриптов при смене только высоты вьюпорта (фикс для скролла в IOS и Android >=v.5)
          if (resized == currentWidth) { return; }
          resized = currentWidth;
          // console.log();

          if (currentWidth < width) {
              console.log("isMobile");
              pm.after(el);
          } else {
              console.log('isDesctop');
              pd.append(el);
          }

      });

}
function scrollbarWidth() {
    var block = $('<div>').css({'height':'50px','width':'50px'}),
        indicator = $('<div>').css({'height':'200px'});

    $('body').append(block.append(indicator));
    var w1 = $('div', block).innerWidth();
    block.css('overflow-y', 'scroll');
    var w2 = $('div', block).innerWidth();
    $(block).remove();
    return (w1 - w2);
}
